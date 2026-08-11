import React, { useState, useRef, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LocationPage from "./pages/LocationPage";
import MasterPlanPage from "./pages/MasterPlanPage";
import ProductsPage from "./pages/ProductsPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  // ---------- Audio Synthesizer State ----------
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const droneOsc1Ref = useRef<OscillatorNode | null>(null);
  const droneOsc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const chimeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startSoundscape = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 3.0);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(136.10, ctx.currentTime);
      const filter1 = ctx.createBiquadFilter();
      filter1.type = "lowpass";
      filter1.frequency.setValueAtTime(180, ctx.currentTime);
      osc1.connect(filter1);
      filter1.connect(masterGain);
      osc1.start();
      droneOsc1Ref.current = osc1;

      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(204.15, ctx.currentTime);
      const filter2 = ctx.createBiquadFilter();
      filter2.type = "lowpass";
      filter2.frequency.setValueAtTime(220, ctx.currentTime);
      osc2.connect(filter2);
      filter2.connect(masterGain);
      osc2.start();
      droneOsc2Ref.current = osc2;

      const playChime = () => {
        if (!audioContextRef.current || !isAudioPlaying) return;
        const cCtx = audioContextRef.current;
        const frequencies = [440, 528, 597, 659, 783, 880];
        const selectedFreq = frequencies[Math.floor(Math.random() * frequencies.length)];
        const chimeOsc = cCtx.createOscillator();
        const chimeGain = cCtx.createGain();
        chimeOsc.type = "sine";
        chimeOsc.frequency.setValueAtTime(selectedFreq, cCtx.currentTime);
        chimeGain.gain.setValueAtTime(0, cCtx.currentTime);
        chimeGain.gain.linearRampToValueAtTime(0.015, cCtx.currentTime + 0.1);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, cCtx.currentTime + 4.5);
        chimeOsc.connect(chimeGain);
        chimeGain.connect(masterGain);
        chimeOsc.start();
        chimeOsc.stop(cCtx.currentTime + 4.6);
      };

      chimeIntervalRef.current = setInterval(() => {
        if (Math.random() > 0.3) playChime();
      }, 5000);

      setIsAudioPlaying(true);
    } catch (err) {
      console.warn("Web Audio API is not supported in this browser environment.", err);
    }
  };

  const stopSoundscape = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current;
      gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5);
      setTimeout(() => {
        try {
          droneOsc1Ref.current?.stop();
          droneOsc2Ref.current?.stop();
          if (chimeIntervalRef.current) clearInterval(chimeIntervalRef.current);
          setIsAudioPlaying(false);
        } catch {
          /* ignore */
        }
      }, 1600);
    } else {
      if (chimeIntervalRef.current) clearInterval(chimeIntervalRef.current);
      setIsAudioPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isAudioPlaying) stopSoundscape();
    else startSoundscape();
  };

  useEffect(() => {
    return () => {
      if (chimeIntervalRef.current) clearInterval(chimeIntervalRef.current);
      try {
        droneOsc1Ref.current?.stop();
        droneOsc2Ref.current?.stop();
      } catch {
        /* ignore */
      }
    };
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout isAudioPlaying={isAudioPlaying} toggleAudio={toggleAudio} />}>
          <Route index element={<HomePage />} />
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/vi-tri" element={<LocationPage />} />
          <Route path="/quy-hoach" element={<MasterPlanPage />} />
          <Route path="/san-pham" element={<ProductsPage />} />
          <Route path="/dich-vu" element={<ServicesPage />} />
          <Route path="/lien-he" element={<ContactPage />} />
          {/* 404 fallback */}
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
