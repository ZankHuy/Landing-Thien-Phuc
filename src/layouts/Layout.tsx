import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { FloatingContact } from "../components/FloatingContact";

interface LayoutProps {
  isAudioPlaying: boolean;
  toggleAudio: () => void;
}

export function Layout({ isAudioPlaying, toggleAudio }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2c2a29] font-sans antialiased selection:bg-[#c5a880]/30 selection:text-[#1c1a19]">
      <Header isAudioPlaying={isAudioPlaying} toggleAudio={toggleAudio} />
      <main>
        <Outlet />
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}
