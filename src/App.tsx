import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Compass, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Info, 
  Sparkles, 
  Phone, 
  Shield, 
  Volume2, 
  VolumeX, 
  User, 
  Mail, 
  Check, 
  CheckCircle, 
  Clock, 
  ArrowRight, 
  Search, 
  MessageSquare, 
  X, 
  ExternalLink,
  ChevronDown,
  Layers,
  Trees,
  Gem,
  Award,
  ArrowDown,
  CornerDownRight,
  Map,
  FileText,
  Sliders,
  HelpCircle
} from "lucide-react";
import { 
  ENLIGHTENMENT_STEPS, 
  SHOWCASE_ITEMS, 
  FAQ_ITEMS, 
  EnlightenmentStep, 
  ShowcaseItem 
} from "./data";

export default function App() {
  // Navigation & Interactive States
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedShowcase, setSelectedShowcase] = useState<ShowcaseItem | null>(null);
  const [activeTab, setActiveTab] = useState<"architecture" | "landscape" | "heritage">("architecture");
  const [faqCategory, setFaqCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [activeProductFilter, setActiveProductFilter] = useState<"all" | "single" | "family" | "bespoke">("all");

  // Web Audio Synthesizer State
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const droneOsc1Ref = useRef<OscillatorNode | null>(null);
  const droneOsc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const chimeIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Form State
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    date: "",
    slot: "morning",
    productType: "family",
    vipService: [] as string[],
    note: ""
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Concierge Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: "user" | "concierge"; text: string }>>([
    { 
      sender: "concierge", 
      text: "Kính chào Quý khách ghé thăm Thiên Phúc Vĩnh Hằng Viên. Tôi là Quản gia Tĩnh Tâm, người đồng hành cùng gia tộc trong việc bảo tồn và dựng xây cõi an viên vĩnh hằng. Quý khách có tâm nguyện tìm hiểu về phong thủy linh thiêng, quyền sở hữu vĩnh viễn hay dịch vụ chăm sóc chuẩn 5-sao?" 
    }
  ]);
  const [userInput, setUserInput] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  const currentStep: EnlightenmentStep = ENLIGHTENMENT_STEPS[currentStepIndex];

  // Filter FAQ items based on category and search query
  const filteredFaqs = FAQ_ITEMS.filter(faq => {
    const matchesCategory = faqCategory === "all" || faq.category === faqCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  // Audio Synthesizer Logic using Web Audio API
  const startSoundscape = () => {
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Master Volume - quiet, non-obtrusive
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0, ctx.currentTime);
      masterGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 3.0); // Ultra-gentle volume fade-in
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // Primary deep drone (Ohm Solfeggio frequency 136.1 Hz - grounding, cosmic)
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(136.10, ctx.currentTime);
      
      const filter1 = ctx.createBiquadFilter();
      filter1.type = "lowpass";
      filter1.frequency.setValueAtTime(180, ctx.currentTime); // very warm low frequency

      osc1.connect(filter1);
      filter1.connect(masterGain);
      osc1.start();
      droneOsc1Ref.current = osc1;

      // Harmonic companion oscillator (204.15 Hz - pure fifth)
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

      // Delicately sound periodic high-frequency Tibetan wind chimes (Pentatonic Scale)
      const playChime = () => {
        if (!audioContextRef.current || isAudioPlaying === false) return;
        const cCtx = audioContextRef.current;
        const frequencies = [440, 528, 597, 659, 783, 880]; // Solfeggio & Pentatonic
        const selectedFreq = frequencies[Math.floor(Math.random() * frequencies.length)];

        const chimeOsc = cCtx.createOscillator();
        const chimeGain = cCtx.createGain();
        
        chimeOsc.type = "sine";
        chimeOsc.frequency.setValueAtTime(selectedFreq, cCtx.currentTime);
        
        // Instant soft attack and very long natural ringing decay
        chimeGain.gain.setValueAtTime(0, cCtx.currentTime);
        chimeGain.gain.linearRampToValueAtTime(0.015, cCtx.currentTime + 0.1);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, cCtx.currentTime + 4.5);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(masterGain);
        
        chimeOsc.start();
        chimeOsc.stop(cCtx.currentTime + 4.6);
      };

      // Periodic trigger for peaceful wind chimes
      chimeIntervalRef.current = setInterval(() => {
        if (Math.random() > 0.3) {
          playChime();
        }
      }, 5000);

      setIsAudioPlaying(true);
    } catch (err) {
      console.warn("Web Audio API is not supported in this browser environment.", err);
    }
  };

  const stopSoundscape = () => {
    if (gainNodeRef.current && audioContextRef.current) {
      const ctx = audioContextRef.current;
      gainNodeRef.current.gain.linearRampToValueAtTime(0, ctx.currentTime + 1.5); // Slow luxury fade out
      setTimeout(() => {
        try {
          droneOsc1Ref.current?.stop();
          droneOsc2Ref.current?.stop();
          if (chimeIntervalRef.current) clearInterval(chimeIntervalRef.current);
          setIsAudioPlaying(false);
        } catch (e) {
          // ignore
        }
      }, 1600);
    } else {
      if (chimeIntervalRef.current) clearInterval(chimeIntervalRef.current);
      setIsAudioPlaying(false);
    }
  };

  const toggleAudio = () => {
    if (isAudioPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  useEffect(() => {
    return () => {
      if (chimeIntervalRef.current) clearInterval(chimeIntervalRef.current);
      try {
        droneOsc1Ref.current?.stop();
        droneOsc2Ref.current?.stop();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  // Form handling with quiet luxury verification
  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!bookingForm.fullName.trim()) errors.fullName = "Vui lòng cho biết quý danh của Quý khách";
    if (!bookingForm.phone.trim()) {
      errors.phone = "Vui lòng cung cấp số điện thoại liên lạc";
    } else if (!/^[0-9+ ]{9,15}$/.test(bookingForm.phone.trim())) {
      errors.phone = "Số điện thoại không đúng định dạng";
    }
    if (!bookingForm.email.trim()) {
      errors.email = "Vui lòng cung cấp địa chỉ email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingForm.email.trim())) {
      errors.email = "Địa chỉ email không hợp lệ";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setFormSubmitted(true);
      const dateFormatted = new Date(bookingForm.date).toLocaleDateString("vi-VN", {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
      });
      
      // Auto-populate message in concierge suite
      setIsConciergeOpen(true);
      setChatMessages(prev => [
        ...prev,
        { sender: "user", text: `Tôi muốn đặt lịch thưởng lãm vào ngày ${dateFormatted}.` }
      ]);
      setIsTyping(true);
      
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          { 
            sender: "concierge", 
            text: `Kính thưa Quý khách ${bookingForm.fullName}, Tĩnh Tâm xin xác nhận lịch đón tiếp chu toàn dành riêng cho gia đình vào ngày ${dateFormatted}. Chuyên viên quản gia cấp cao sẽ liên lạc trực tiếp tới Quý khách qua số ${bookingForm.phone} trong ít phút tới để sắp đặt xe limousine đưa đón tận nơi miễn phí, bảo mật hành trình và chuẩn bị yến tiệc trà chay thượng hạng tại Thủy Tạ quán. Chúc đại gia tộc vạn cát vạn thịnh!` 
          }
        ]);
        setIsTyping(false);
      }, 1500);
    }
  };

  // Concierge interaction simulator
  const sendQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    // Check if butler is already typing to prevent multiple overlaps
    if (isTyping) return;

    setChatMessages(prev => [...prev, { sender: "user", text: queryText }]);
    setIsTyping(true);

    setTimeout(() => {
      let reply = "";
      const normalized = queryText.toLowerCase();

      if (normalized.includes("phong thuy") || normalized.includes("thuy") || normalized.includes("long mach") || normalized.includes("huong")) {
        reply = "Mảnh đất Thiên Phúc tọa lạc tại cửa ngõ Yên Tử thiêng liêng, kế thừa sinh khí Chùa Đồng ngàn năm. Địa thế 'Tựa Sơn Hướng Thủy' tựa lưng vào núi Kim Cương vững chãi, hướng mặt ra hồ Tĩnh Tại phẳng lặng như gương. Đây là đại thế tàng phong tụ khí cực hiếm, giúp hương linh an vị nhẹ nhàng, con cháu thụ lộc hưng thịnh đời đời.";
      } else if (normalized.includes("gia") || normalized.includes("bao nhieu") || normalized.includes("mua") || normalized.includes("phi") || normalized.includes("bảng giá") || normalized.includes("bản giá")) {
        reply = "Chúng tôi cung cấp các bộ sưu tập không gian tâm linh giới hạn, tạc từ đá Granite tự nhiên nhập khẩu nguyên khối cao cấp. Mộ đôi gia đình thanh nhã, cho tới các khuôn viên Đại Gia Tộc thượng đẳng từ 50m² đến 250m² thiết kế riêng biệt theo phong thủy dòng họ. Quý khách vui lòng để lại thông tin hoặc đặt lịch ghé thăm, quản gia riêng sẽ gửi bảng giá chiết khấu đặc quyền bảo mật tới tận tay Quý khách.";
      } else if (normalized.includes("phap ly") || normalized.includes("so huu") || normalized.includes("lau dai") || normalized.includes("pháp lý")) {
        reply = "Thiên Phúc Vĩnh Hằng Viên tự hào sở hữu hồ sơ pháp lý hoàn thiện tối cao. Dự án được phê duyệt quy hoạch tỷ lệ 1/500 và cấp sổ hồng sở hữu lâu dài vĩnh viễn, hoàn toàn không có rủi ro giải tỏa hay di dời. Đây là di sản tâm linh bất biến truyền đời của gia tộc.";
      } else if (normalized.includes("dich vu") || normalized.includes("cham soc") || normalized.includes("bao ve") || normalized.includes("5 sao") || normalized.includes("dịch vụ")) {
        reply = "Dịch vụ chăm sóc đạt tiêu chuẩn resort 5 sao: Đội ngũ quản gia túc trực thắp hương ngày rằm, mùng một và sóc vọng; chăm sóc thảm cỏ hoa cảnh mỗi ngày; bảo an đa lớp 24/7 bảo mật tuyệt đối; tổ chức đại lễ cầu siêu thường niên với các đại đức cao tăng. Mọi quy trình đều được chụp ảnh, báo cáo định kỳ chi tiết tới gia chủ.";
      } else if (normalized.includes("xe") || normalized.includes("dua don") || normalized.includes("di lai") || normalized.includes("o dau") || normalized.includes("đưa đón")) {
        reply = "Dự án nằm tại cửa ngõ linh sơn Yên Tử, thành phố Uông Bí, Quảng Ninh. Để hành trình của gia đình được tôn nghiêm và thoải mái nhất, ban quản lý cung cấp dòng xe VIP cao cấp (Limousine/Mercedes) đưa đón tận nhà miễn phí từ Hà Nội, Hải Phòng, Quảng Ninh cùng chuyên gia phong thủy tháp tùng giải đáp chi tiết.";
      } else {
        reply = "Tâm nguyện của Quý khách là điều vô cùng trân quý đối với chúng tôi. Thiên Phúc Vĩnh Hằng Viên là sự kết hợp sâu sắc giữa triết lý thiền tịnh dung dị và chuẩn mực sống thượng lưu, mang lại sự viên mãn an lòng cho cả người đi và người ở lại. Tĩnh Tâm rất hân hạnh được đồng hành và giải đáp sâu hơn qua cuộc điện đàm riêng.";
      }

      setChatMessages(prev => [...prev, { sender: "concierge", text: reply }]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    sendQuery(userInput);
    setUserInput("");
  };


  const handleVipServiceToggle = (service: string) => {
    setBookingForm(prev => {
      const exists = prev.vipService.includes(service);
      return {
        ...prev,
        vipService: exists 
          ? prev.vipService.filter(s => s !== service)
          : [...prev.vipService, service]
      };
    });
  };



  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#2c2a29] font-sans antialiased selection:bg-[#c5a880]/30 selection:text-[#1c1a19]">
      
      {/* Elegant minimalist sticky header */}
      <header className="sticky top-0 z-40 bg-[#faf9f6]/90 backdrop-blur-md border-b border-[#eaeae1]/50 px-6 lg:px-12 py-5 transition-luxury">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex flex-col">
            <span className="font-serif text-lg tracking-[0.25em] uppercase font-light text-[#1c1a19]">
              THIEN PHUC
            </span>
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#b89b72] font-semibold mt-0.5">
              Vĩnh Hằng Viên • Di Sản Tâm Linh
            </span>
          </div>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-widest text-[#2c2a29]/70 uppercase">
            <a href="#narrative" className="hover:text-[#b89b72] transition-colors">Tâm Niệm</a>
            <a href="#paths" className="hover:text-[#b89b72] transition-colors">Bảy Bậc Thiền</a>
            <a href="#landscape" className="hover:text-[#b89b72] transition-colors">Tuyệt Tác Cảnh Sắc</a>
            <a href="#fengshui" className="hover:text-[#b89b72] transition-colors">Sơ Đồ Phong Thủy</a>
            <a href="#collection" className="hover:text-[#b89b72] transition-colors">Bộ Sưu Tập</a>
          </nav>

          <div className="flex items-center gap-4">
            {/* Meditative sound controller */}
            <button 
              onClick={toggleAudio}
              className={`p-2 rounded-full border transition-all duration-300 ${
                isAudioPlaying 
                  ? "bg-[#1c1a19] border-[#b89b72] text-[#b89b72]" 
                  : "bg-white border-[#eaeae1] text-stone-500 hover:border-stone-400"
              }`}
              title="Thiền nhạc tĩnh tâm"
            >
              {isAudioPlaying ? (
                <div className="flex gap-0.5 items-end h-3 px-0.5">
                  <span className="w-0.5 h-3 bg-[#b89b72] rounded-full animate-bounce" style={{ animationDelay: '0.1s', animationDuration: '0.8s' }}></span>
                  <span className="w-0.5 h-1.5 bg-[#b89b72] rounded-full animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '0.6s' }}></span>
                  <span className="w-0.5 h-2.5 bg-[#b89b72] rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '0.7s' }}></span>
                </div>
              ) : (
                <VolumeX className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Quick concierge button (Temporarily Disabled)
            <button 
              onClick={() => setIsConciergeOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 border border-[#eaeae1] rounded-full text-[10px] uppercase tracking-widest text-[#2c2a29]/80 hover:border-[#b89b72] transition"
            >
              <MessageSquare className="w-3 h-3 text-[#b89b72]" />
              Quản gia Tĩnh Tâm
            </button>
            */}

            <a 
              href="#reservation" 
              className="px-5 py-2.5 bg-[#1c1a19] text-[#f5f4ed] text-[10px] tracking-widest uppercase font-medium hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury rounded-none"
            >
              Đón Tiếp VIP
            </a>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* HERO SECTION: Thien Phuc Meditative Splendor */}
      {/* ========================================== */}
      <section className="relative h-[88vh] bg-[#1c1a19] flex items-center justify-center overflow-hidden">
        {/* Immersive background photo with smooth slow scaling */}
        <div className="absolute inset-0">
          <motion.div
            initial={{ scale: 1.05, opacity: 0.3 }}
            animate={{ scale: 1, opacity: 0.65 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}Images/tong_quan.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1a19]/40 via-transparent to-[#faf9f6]" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Minimalist layout alignment */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-[10px] md:text-[11px] uppercase tracking-[0.5em] text-[#b89b72] font-semibold mb-4"
          >
            THE SANCTUARY OF ETERNAL PEACE
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1.2 }}
            className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white tracking-wide leading-[1.15]"
          >
            Nơi Tâm Hồn An Trú<br />
            <span className="font-serif italic font-normal text-[#eaeae1]">Trong Cõi Vĩnh Hằng</span>
          </motion.h2>

          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1, duration: 1.2 }}
            className="w-16 h-px bg-[#b89b72] my-8"
          />

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="font-sans text-xs md:text-sm text-stone-200/90 font-light tracking-wide max-w-xl leading-relaxed"
          >
            Đón nhận long mạch linh thiêng từ non cao Yên Tử, Thiên Phúc dựng xây một cõi an lạc vĩnh cửu, hòa nhập tuyệt đối vào thiên nhiên tinh khôi và di sản gia tộc bất biến trường tồn.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <a 
              href="#reservation"
              className="px-8 py-3.5 bg-white text-[#1c1a19] text-[10px] font-medium uppercase tracking-[0.25em] hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury shadow-sm"
            >
              Đặt lịch khảo sát riêng tư
            </a>
            <button 
              onClick={() => setIsConciergeOpen(true)}
              className="px-8 py-3.5 border border-white/30 text-white text-[10px] font-medium uppercase tracking-[0.25em] hover:bg-white/10 hover:border-white transition-luxury"
            >
              Liên hệ Quản gia riêng
            </button>
          </motion.div>
        </div>

        {/* Elegant scroll down prompt */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400">
          <span className="text-[8px] uppercase tracking-[0.4em]">Cuộn dọc</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#b89b72]" />
        </div>
      </section>

      {/* ========================================== */}
      {/* NARRATIVE SECTION: Thien Phuc Zen Philosophy */}
      {/* ========================================== */}
      <section id="narrative" className="py-24 px-6 lg:px-12 bg-[#faf9f6] border-b border-[#eaeae1]/30">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center"
        >
          
          <div className="md:col-span-5 flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] font-semibold">
              TRIẾT LÝ SỰ SỐNG & SỰ AN AN
            </span>
            <h3 className="font-serif text-3xl md:text-5xl font-light text-[#1c1a19] tracking-wide leading-tight">
              Sự chu toàn thấu đáo của bậc trí giả
            </h3>
            <div className="w-10 h-px bg-[#b89b72]"></div>
            <p className="font-sans text-stone-600 font-light text-sm leading-relaxed">
              &ldquo;Sinh tử tựa mây trôi; chuẩn bị chu toàn chính là đỉnh cao của sự an lòng.&rdquo; Trải qua bao thăng trầm cuộc đời, món quà ý nghĩa nhất dành cho tổ tiên và thế hệ mai sau là sự an bài vẹn toàn. 
            </p>
            <p className="font-sans text-stone-600 font-light text-sm leading-relaxed">
              Không còn gánh nặng lo toan, không còn lo âu quy hoạch biến động. Tại Thiên Phúc Vĩnh Hằng Viên, chúng tôi tôn vinh từng hành trình cuộc đời bằng sự tôn nghiêm tĩnh lặng nhất, chuẩn mực 5-sao hoàng gia kết hợp triết lý Thiền sâu sắc.
            </p>
          </div>

          <div className="md:col-span-7 relative">
            {/* Elegant luxury editorial photo collage */}
            <div className="aspect-[4/3] bg-stone-100 overflow-hidden relative">
              <img 
                src={`${import.meta.env.BASE_URL}Images/choi_ngoi_ngam_canh.jpg`} 
                alt="Zen luxury garden cemetery" 
                className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 transition-luxury"
              />
              <div className="absolute inset-0 bg-[#1c1a19]/5 mix-blend-color" />
            </div>
            
            {/* Overlay floating quote block */}
            <div className="absolute -bottom-8 -left-6 md:-left-10 bg-[#f5f4ed] p-6 max-w-sm border border-[#eaeae1]">
              <span className="font-serif text-3xl text-[#b89b72] block leading-none mb-2">&ldquo;</span>
              <p className="font-serif italic text-stone-700 text-sm leading-relaxed">
                Tựa sơn vững chãi qua ngàn năm, hướng thủy hanh thông trọn kiếp người. Phúc đức tổ tiên lưu vạn thuở, hiếu nghĩa con cháu rạng muôn đời.
              </p>
              <span className="text-[9px] uppercase tracking-widest text-[#b89b72] font-semibold mt-4 block text-right">— BÀI CA GIA TỘC THIÊN PHÚC</span>
            </div>
          </div>

        </motion.div>
      </section>

      {/* ========================================== */}
      {/* SEVEN PATHS: Interactive Serenity Timeline */}
      {/* ========================================== */}
      <section id="paths" className="py-24 px-6 lg:px-12 bg-[#f5f4ed]/50">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          
          {/* Section title */}
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-3">
              HÀNH TRÌNH TÂM LINH
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Bảy Bậc Giác Ngộ An Nhiên
            </h3>
            <p className="font-sans text-stone-500 font-light text-xs tracking-wider mt-2">
              Bảy nấc thang khai sáng, rũ bỏ hồng trần, tìm về chốn vĩnh hằng tịch tịnh
            </p>
            <div className="w-12 h-px bg-[#b89b72] mt-4"></div>
          </div>

          {/* Elegant horizontal timeline stepper */}
          <div className="relative flex justify-between items-center mb-16 max-w-4xl mx-auto px-4 overflow-x-auto py-6 gap-4">
            {/* The connector line running behind the nodes */}
            <div className="absolute top-[37px] left-8 right-8 h-0.5 bg-[#eaeae1] -z-10" />
            <div 
              className="absolute top-[37px] left-8 h-0.5 bg-[#b89b72] transition-all duration-700 -z-10" 
              style={{ width: `calc(${(currentStepIndex / (ENLIGHTENMENT_STEPS.length - 1)) * 100}% - 16px)` }}
            />

            {ENLIGHTENMENT_STEPS.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isCompleted = idx < currentStepIndex;
              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStepIndex(idx)}
                  className="relative z-10 flex flex-col items-center group focus:outline-none min-w-[70px] cursor-pointer"
                >
                  {/* Step node (circle) */}
                  <div className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive 
                      ? "bg-[#1c1a19] border-2 border-[#b89b72] text-[#b89b72] scale-110 shadow-lg" 
                      : isCompleted 
                        ? "bg-[#b89b72] text-white border-2 border-[#b89b72]"
                        : "bg-white border-2 border-[#eaeae1] text-stone-400 group-hover:border-stone-500"
                  }`}>
                    {isCompleted ? (
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    ) : (
                      <span className="text-[10px] font-semibold font-mono">{step.number}</span>
                    )}
                  </div>
                  {/* Step Label */}
                  <span className={`text-[10px] tracking-widest font-serif mt-2 font-medium transition-colors duration-300 whitespace-nowrap ${
                    isActive ? "text-[#1c1a19] font-semibold" : "text-stone-400 group-hover:text-stone-700"
                  }`}>
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Content layout */}
          <div className="bg-white border border-[#eaeae1] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Left text column */}
                <div className="lg:col-span-5 p-8 lg:p-14 flex flex-col justify-between min-h-[400px]">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs bg-[#b89b72]/10 text-[#b89b72] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                        BẬC {currentStep.number}
                      </span>
                      <span className="text-xs text-stone-400 font-light tracking-widest uppercase">
                        {currentStep.english}
                      </span>
                    </div>

                    <h4 className="font-serif text-3xl font-light text-[#1c1a19] tracking-wide mb-6">
                      {currentStep.title}
                    </h4>

                    <p className="font-serif text-stone-700 italic text-base leading-relaxed mb-6 pl-4 border-l border-[#b89b72]/40">
                      &ldquo;{currentStep.quote}&rdquo;
                    </p>

                    <p className="font-sans text-stone-600 font-light text-sm leading-relaxed">
                      {currentStep.description}
                    </p>
                  </div>

                  {/* Navigation trigger button inside details */}
                  <div className="mt-8 pt-6 border-t border-[#eaeae1] flex items-center justify-between">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest font-mono">
                      YÊN TỬ SANCTUARY
                    </span>
                    <button 
                      onClick={() => {
                        const next = currentStepIndex < ENLIGHTENMENT_STEPS.length - 1 ? currentStepIndex + 1 : 0;
                        setCurrentStepIndex(next);
                      }}
                      className="text-xs text-[#b89b72] hover:text-[#1c1a19] transition-colors font-semibold tracking-widest uppercase flex items-center gap-1"
                    >
                      Bậc tiếp theo <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right image column */}
                <div className="lg:col-span-7 relative h-[300px] lg:h-auto min-h-[400px] overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                    style={{ backgroundImage: `url(${currentStep.imageUrl})` }}
                  />
                  <div className="absolute inset-0 bg-black/10" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>
      </section>

      {/* ========================================== */}
      {/* HERITAGE SHOWCASE: Minimalist Bento Grid */}
      {/* ========================================== */}
      <section id="landscape" className="py-24 px-6 lg:px-12 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-4">
            <div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-2">
                KIẾN TRÚC & CẢNH SẮC
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
                Tuyệt Tác Cảnh Quan Di Sản
              </h3>
            </div>
            <p className="font-sans text-stone-500 font-light text-sm max-w-sm leading-relaxed">
              Sự kết tinh mỹ học tinh tế từ kiến trúc tôn nghiêm Á Đông và hồn cốt văn hóa thiền phái Trúc Lâm Yên Tử.
            </p>
          </div>

          {/* Luxury Gallery Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHOWCASE_ITEMS.map((item) => (
              <div 
                key={item.id}
                onClick={() => setSelectedShowcase(item)}
                className="group relative h-[420px] bg-[#f5f4ed] overflow-hidden cursor-pointer flex flex-col justify-end p-8 transition-luxury border border-[#eaeae1]/40"
              >
                {/* Background image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105 filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-90"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a19] via-transparent to-transparent opacity-85" />

                {/* Content */}
                <div className="relative z-10">
                  <span className="text-[9px] uppercase tracking-widest text-[#b89b72] font-semibold bg-[#1c1a19]/40 backdrop-blur-sm px-2.5 py-1 inline-block mb-3">
                    {item.tag}
                  </span>
                  <span className="text-[8px] text-white/50 block font-mono tracking-widest uppercase mb-1">{item.english}</span>
                  <h4 className="font-serif text-2xl text-white font-light tracking-wide group-hover:text-[#b89b72] transition-colors mb-2">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-stone-300 font-light leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-24 overflow-hidden">
                    {item.description}
                  </p>
                  <span className="text-[9px] uppercase tracking-widest text-white/85 font-medium border-b border-white/30 pb-0.5 group-hover:border-[#b89b72] group-hover:text-[#b89b72] transition">
                    Thưởng lãm kiến trúc →
                  </span>
                </div>
              </div>
            ))}
          </div>

        </motion.div>
      </section>

      {/* Showcase Showcase Detail Lightbox Drawer */}
      <AnimatePresence>
        {selectedShowcase && (
          <div className="fixed inset-0 bg-[#1c1a19]/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 10 }}
              transition={{ duration: 0.5 }}
              className="bg-[#faf9f6] text-[#2c2a29] max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-none border border-[#b89b72]/30 shadow-2xl relative"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedShowcase(null)}
                className="absolute top-5 right-5 z-20 bg-[#1c1a19] text-white p-2.5 hover:bg-[#b89b72] hover:text-[#1c1a19] transition"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Large Image */}
              <div className="h-80 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedShowcase.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-[9px] uppercase tracking-widest bg-[#1c1a19] text-white px-3 py-1 font-semibold">
                    {selectedShowcase.tag}
                  </span>
                </div>
              </div>

              {/* Main detailed copy */}
              <div className="p-8 lg:p-12">
                <span className="text-[10px] uppercase tracking-widest text-[#b89b72] font-semibold font-mono block mb-2">
                  {selectedShowcase.english}
                </span>
                <h4 className="font-serif text-3xl font-light text-[#1c1a19] tracking-wide mb-4">
                  {selectedShowcase.title}
                </h4>
                <div className="w-12 h-px bg-[#b89b72] mb-6"></div>

                <p className="font-sans text-stone-700 font-light text-sm leading-relaxed mb-6">
                  {selectedShowcase.longDescription}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#f5f4ed] p-6 border border-[#eaeae1] mb-8">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-semibold">VẬT LIỆU CHẾ TÁC</span>
                    <span className="text-xs text-stone-700 font-serif font-medium mt-1 block">Đá Granite xanh/trắng tự nhiên nguyên khối quý hiếm</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-semibold">ĐƠN VỊ THI CÔNG</span>
                    <span className="text-xs text-stone-700 font-serif font-medium mt-1 block">Nghệ nhân điêu khắc mỹ nghệ đá Ninh Bình</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-semibold">TIÊU CHUẨN</span>
                    <span className="text-xs text-stone-700 font-serif font-medium mt-1 block">Chống chịu thời tiết vĩnh cửu, thoát nước tự nhiên</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-stone-400 block font-semibold">QUY HOẠCH PHONG THỦY</span>
                    <span className="text-xs text-stone-700 font-serif font-medium mt-1 block">Được phê duyệt bởi Hội Phong thủy Á Đông</span>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button 
                    onClick={() => setSelectedShowcase(null)}
                    className="px-6 py-3 border border-[#eaeae1] text-stone-500 text-[10px] tracking-widest uppercase hover:text-stone-800 transition"
                  >
                    Quay lại
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedShowcase(null);
                      const reserveElem = document.getElementById("reservation");
                      reserveElem?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-6 py-3 bg-[#1c1a19] text-white text-[10px] tracking-widest uppercase hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
                  >
                    Yêu cầu tư vấn riêng
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================== */}
      {/* INTERACTIVE FENG SHUI MAP: Architectural blueprint */}
      {/* ========================================== */}
      <section id="fengshui" className="py-24 px-6 lg:px-12 bg-[#f5f4ed]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-3">
              VỊ TRÍ ĐỊA LINH
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Định Vị Thiên Phúc Vĩnh Hằng Viên
            </h3>
            <p className="font-sans text-stone-500 font-light text-xs tracking-wider mt-2">
              Kế thừa linh khí long mạch dưới chân Phật sơn Yên Tử linh thiêng
            </p>
            <div className="w-12 h-px bg-[#b89b72] mt-4"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Live Google Map Interactive Embed */}
            <div className="lg:col-span-8 bg-white border border-[#eaeae1] p-3 min-h-[450px] relative overflow-hidden">
              <iframe 
                src="https://maps.google.com/maps?q=21.0606617,106.7481965&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[420px] border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ Thiên Phúc Vĩnh Hằng Viên"
              ></iframe>
            </div>

            {/* Route & Limousine Guides */}
            <div className="lg:col-span-4 bg-white border border-[#eaeae1] p-8 lg:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#b89b72] font-semibold font-mono block mb-2">
                    ĐỊA CHỈ DỰ ÁN
                  </span>
                  <p className="font-serif text-lg font-medium text-[#1c1a19] leading-snug">
                    Đường Bãi Dài, Phường Uông Bí, TP. Uông Bí, Quảng Ninh
                  </p>
                  <p className="text-[10px] text-[#b89b72] font-mono mt-1">
                    Tọa độ: 21.0606617, 106.7481965
                  </p>
                  <p className="font-sans text-stone-500 font-light text-xs mt-2 leading-relaxed">
                    Nằm ngay cửa ngõ hành hương Yên Tử, thế đất rồng chầu kết tinh linh khí nghìn năm.
                  </p>
                </div>

                <div className="w-10 h-px bg-[#b89b72]"></div>

                <div>
                  <span className="text-[9px] uppercase tracking-widest text-[#b89b72] font-semibold font-mono block mb-3">
                    KHOẢNG CÁCH DI CHUYỂN
                  </span>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs border-b border-[#eaeae1]/50 pb-2">
                      <span className="text-stone-500 font-light flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#b89b72]" /> Từ Hà Nội</span>
                      <span className="text-[#1c1a19] font-medium font-serif">110km (~1h45)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-b border-[#eaeae1]/50 pb-2">
                      <span className="text-stone-500 font-light flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#b89b72]" /> Từ Hải Phòng</span>
                      <span className="text-[#1c1a19] font-medium font-serif">40km (~45 phút)</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-b border-[#eaeae1]/50 pb-2">
                      <span className="text-stone-500 font-light flex items-center gap-1.5"><MapPin className="w-3 h-3 text-[#b89b72]" /> Từ Hạ Long</span>
                      <span className="text-[#1c1a19] font-medium font-serif">45km (~50 phút)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="bg-[#f5f4ed] p-4 text-xs font-sans font-light text-stone-600 leading-relaxed border-l-2 border-[#b89b72]">
                  Ban quản lý cung cấp dịch vụ đưa đón bằng xe Limousine hạng sang miễn phí phục vụ các gia đình tham quan khảo sát thực tế.
                </div>
                <a 
                  href="#reservation"
                  className="w-full py-3.5 bg-[#1c1a19] text-[#f5f4ed] text-[10px] tracking-widest uppercase font-bold text-center block hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
                >
                  Đặt xe đưa đón khảo sát
                </a>
              </div>
            </div>

          </div>

        </motion.div>
      </section>

      {/* ========================================== */}
      {/* BESPOKE COLLECTION: Products catalog */}
      {/* ========================================== */}
      <section id="collection" className="py-24 px-6 lg:px-12 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-3">
              BỘ SƯU TẬP DI SẢN
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Khuôn Viên Vĩnh Hằng Giới Hạn
            </h3>
            <p className="font-sans text-stone-500 font-light text-xs tracking-wider mt-2">
              Sản phẩm chế tác cao cấp dành riêng cho từng quy mô và ước vọng dòng họ
            </p>
            <div className="w-12 h-px bg-[#b89b72] mt-4"></div>
          </div>

          {/* Catalog filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            <button
              onClick={() => setActiveProductFilter("all")}
              className={`px-4 py-2 text-xs tracking-widest uppercase transition-luxury font-medium border ${
                activeProductFilter === "all" 
                  ? "bg-[#1c1a19] text-white border-[#1c1a19]" 
                  : "bg-transparent text-stone-500 border-stone-200 hover:text-stone-800 hover:border-stone-400"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveProductFilter("single")}
              className={`px-4 py-2 text-xs tracking-widest uppercase transition-luxury font-medium border ${
                activeProductFilter === "single" 
                  ? "bg-[#1c1a19] text-white border-[#1c1a19]" 
                  : "bg-transparent text-stone-500 border-stone-200 hover:text-stone-800 hover:border-stone-400"
              }`}
            >
              Mộ Đơn / Đôi
            </button>
            <button
              onClick={() => setActiveProductFilter("family")}
              className={`px-4 py-2 text-xs tracking-widest uppercase transition-luxury font-medium border ${
                activeProductFilter === "family" 
                  ? "bg-[#1c1a19] text-white border-[#1c1a19]" 
                  : "bg-transparent text-stone-500 border-stone-200 hover:text-stone-800 hover:border-stone-400"
              }`}
            >
              Mộ Gia Tộc
            </button>
            <button
              onClick={() => setActiveProductFilter("bespoke")}
              className={`px-4 py-2 text-xs tracking-widest uppercase transition-luxury font-medium border ${
                activeProductFilter === "bespoke" 
                  ? "bg-[#1c1a19] text-white border-[#1c1a19]" 
                  : "bg-transparent text-stone-500 border-stone-200 hover:text-stone-800 hover:border-stone-400"
              }`}
            >
              Bespoke Nghệ Thuật
            </button>
          </div>

          {/* Product Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Item 1 */}
            {(activeProductFilter === "all" || activeProductFilter === "single") && (
              <div className="border border-[#eaeae1] bg-[#faf9f6] p-8 flex flex-col justify-between hover:border-[#b89b72] transition-luxury">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-mono tracking-widest text-[#b89b72] uppercase font-bold">AN LẠC COLLECTION</span>
                    <span className="text-[10px] text-emerald-800 italic font-serif">Sổ hồng riêng</span>
                  </div>
                  <h4 className="font-serif text-2xl font-light text-[#1c1a19] tracking-wide mb-2">Mộ Đơn & Đôi Gia Cảnh</h4>
                  <div className="w-8 h-px bg-[#b89b72] my-4"></div>
                  <p className="font-sans text-stone-500 font-light text-xs leading-relaxed mb-6">
                    Giải pháp hiếu nghĩa tôn nghiêm dành riêng cho đấng sinh thành. Quy hoạch chuẩn chỉ, bao bọc bởi thảm cỏ nhung Nhật Bản rực rỡ và thông tùng bách xanh mướt.
                  </p>
                  <ul className="text-xs text-stone-600 flex flex-col gap-2.5">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#b89b72]" /> Diện tích: 4.5m² - 9.0m²</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#b89b72]" /> Đá Granite tự nhiên nhập khẩu mài bóng</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#b89b72]" /> Hệ thống lọc thoát nước vi sinh châu Âu</li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-[#eaeae1] flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">BÀN GIAO VĨNH VIỄN</span>
                  <a href="#reservation" className="text-xs font-semibold text-[#1c1a19] hover:text-[#b89b72] transition-colors uppercase tracking-widest">Đăng ký ngay →</a>
                </div>
              </div>
            )}

            {/* Item 2 */}
            {(activeProductFilter === "all" || activeProductFilter === "family") && (
              <div className="border border-[#b89b72]/40 bg-white p-8 flex flex-col justify-between relative shadow-sm hover:border-[#b89b72] transition-luxury">
                <span className="absolute -top-3.5 right-6 bg-[#b89b72] text-white text-[8px] tracking-[0.2em] font-bold uppercase py-1 px-3">
                  ƯU TIÊN LỰA CHỌN
                </span>
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-mono tracking-widest text-[#b89b72] uppercase font-bold">VƯƠNG TỘC COLLECTION</span>
                    <span className="text-[10px] text-emerald-800 italic font-serif">Mái đá tạc quý</span>
                  </div>
                  <h4 className="font-serif text-2xl font-light text-[#1c1a19] tracking-wide mb-2">Khuôn Viên Đại Gia Tộc</h4>
                  <div className="w-8 h-px bg-[#b89b72] my-4"></div>
                  <p className="font-sans text-stone-500 font-light text-xs leading-relaxed mb-6">
                    Khẳng định uy thế, lưu giữ vương triều ký ức lâu đời của gia quyến. Được thiết kế cổng đá tạc khắc rồng phượng thủ công uy nghi, khoảng sân rộng tế lễ và hàng rào cây xanh sinh thái biệt lập.
                  </p>
                  <ul className="text-xs text-stone-600 flex flex-col gap-2.5">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#b89b72]" /> Diện tích đa dạng: 50m² - 250m²</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#b89b72]" /> 100% đá khối cao cấp chọn lựa tỉ mỉ</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#b89b72]" /> Thiết kế cuốn thư và lư hương phong thủy</li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-[#eaeae1] flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-[#b89b72] font-mono font-bold">CHIẾT KHẤU GIA TỘC</span>
                  <a href="#reservation" className="text-xs font-semibold text-[#b89b72] hover:text-[#1c1a19] transition-colors uppercase tracking-widest">Đăng ký ngay →</a>
                </div>
              </div>
            )}

            {/* Item 3 */}
            {(activeProductFilter === "all" || activeProductFilter === "bespoke") && (
              <div className="border border-[#eaeae1] bg-[#faf9f6] p-8 flex flex-col justify-between hover:border-[#b89b72] transition-luxury">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[9px] font-mono tracking-widest text-[#b89b72] uppercase font-bold">ARTISAN COMMISSION</span>
                    <span className="text-[10px] text-emerald-800 italic font-serif">Kỷ vật độc bản</span>
                  </div>
                  <h4 className="font-serif text-2xl font-light text-[#1c1a19] tracking-wide mb-2">Mộ Nghệ Thuật Bản Giới</h4>
                  <div className="w-8 h-px bg-[#b89b72] my-4"></div>
                  <p className="font-sans text-stone-500 font-light text-xs leading-relaxed mb-6">
                    Bản phác thảo nghệ thuật điêu khắc đương đại của riêng kiến trúc sư hàng đầu dành tặng dòng tộc Quý khách. Nơi câu chuyện cuộc đời được lưu danh vĩnh viễn trên những tác phẩm nghệ thuật đá tạc duy mỹ.
                  </p>
                  <ul className="text-xs text-stone-600 flex flex-col gap-2.5">
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#b89b72]" /> Thiết kế 3D cá nhân hóa hoàn toàn</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#b89b72]" /> Điêu khắc đá mỹ thuật cao tạc tác theo yêu cầu</li>
                    <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#b89b72]" /> Phù hợp di nguyện của riêng gia chủ</li>
                  </ul>
                </div>
                <div className="mt-8 pt-6 border-t border-[#eaeae1] flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">BẢN VẼ 3D ĐỘC QUYỀN</span>
                  <button 
                    onClick={() => {
                      setBookingForm(prev => ({ ...prev, note: "Tôi muốn đặt thiết kế riêng biệt cho Mộ Nghệ Thuật độc bản." }));
                      document.getElementById("reservation")?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="text-xs font-semibold text-[#1c1a19] hover:text-[#b89b72] transition-colors uppercase tracking-widest"
                  >
                    Yêu cầu 3D →
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Heritage Services Standard Description section */}
          <div className="mt-16 bg-[#faf9f6] border border-[#eaeae1] p-8 lg:p-12">
            <h4 className="font-serif text-2xl font-light text-[#1c1a19] tracking-wide mb-6 text-center">
              Dịch Vụ Quản Gia Trọn Kiếp 5-Sao Cao Cấp
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div className="p-4">
                <span className="text-xl font-serif text-[#b89b72] font-semibold block mb-2">24/7</span>
                <span className="text-xs text-stone-700 font-medium tracking-wide block mb-1">Bảo An Đa Lớp</span>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">Bảo vệ nghiêm ngặt, camera giám sát tuyệt mật toàn khuôn viên ngày đêm.</p>
              </div>
              <div className="p-4 border-t md:border-t-0 md:border-l border-[#eaeae1]">
                <span className="text-xl font-serif text-[#b89b72] font-semibold block mb-2">Hàng ngày</span>
                <span className="text-xs text-stone-700 font-medium tracking-wide block mb-1">Chăm sóc Sóc Vọng</span>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">Thắp nhang, quét dọn, tỉa cây và dọn dẹp mộ phần chu toàn tinh tịnh mỗi buổi sớm.</p>
              </div>
              <div className="p-4 border-t md:border-t-0 md:border-l border-[#eaeae1]">
                <span className="text-xl font-serif text-[#b89b72] font-semibold block mb-2">Đại Lễ</span>
                <span className="text-xs text-stone-700 font-medium tracking-wide block mb-1">Nghi Thức Cầu Siêu</span>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">Tổ chức đại lễ Vu Lan, cầu an cầu siêu quy mô lớn cùng các sư thầy cao tăng kính tôn.</p>
              </div>
              <div className="p-4 border-t md:border-t-0 md:border-l border-[#eaeae1]">
                <span className="text-xl font-serif text-[#b89b72] font-semibold block mb-2">Công Nghệ</span>
                <span className="text-xs text-stone-700 font-medium tracking-wide block mb-1">Báo Cáo Online</span>
                <p className="text-[11px] text-stone-500 leading-relaxed font-light">Cập nhật hình ảnh trực tiếp qua phần mềm số để con cháu phương xa luôn yên lòng.</p>
              </div>
            </div>
          </div>

        </motion.div>
      </section>

      {/* ========================================== */}
      {/* EXEXCLUSIVE RESERVATION: VIP Booking form */}
      {/* ========================================== */}
      <section id="reservation" className="py-24 px-6 lg:px-12 bg-[#faf9f6] border-t border-[#eaeae1]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-3">
              KẾ HOẠCH ĐÓN TIẾP VIP
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Đăng Ký Khảo Sát Thực Tế Bảo Mật
            </h3>
            <p className="font-sans text-stone-500 font-light text-xs tracking-wider mt-2">
              Chuyến đi thượng lưu, phục vụ riêng biệt bằng dòng xe Limousine cho toàn đại gia đình
            </p>
            <div className="w-12 h-px bg-[#b89b72] mt-4"></div>
          </div>

          <div className="bg-white border border-[#eaeae1] p-8 lg:p-12 relative">
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form 
                  key="booking-form"
                  onSubmit={handleBookingSubmit}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
                        Quý danh của Quý khách *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#b89b72]">
                          <User className="w-3.5 h-3.5" />
                        </span>
                        <input 
                          type="text" 
                          placeholder="Nhập đầy đủ họ và tên" 
                          value={bookingForm.fullName}
                          onChange={(e) => setBookingForm({ ...bookingForm, fullName: e.target.value })}
                          className={`w-full pl-9 pr-4 py-3 bg-[#faf9f6] border text-xs rounded-none focus:outline-none focus:border-[#b89b72] transition-colors ${
                            formErrors.fullName ? "border-red-400" : "border-[#eaeae1]"
                          }`}
                        />
                      </div>
                      {formErrors.fullName && <p className="text-[10px] text-red-500 mt-1">{formErrors.fullName}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
                        Số điện thoại liên hệ *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#b89b72]">
                          <Phone className="w-3.5 h-3.5" />
                        </span>
                        <input 
                          type="text" 
                          placeholder="Số điện thoại di động" 
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                          className={`w-full pl-9 pr-4 py-3 bg-[#faf9f6] border text-xs rounded-none focus:outline-none focus:border-[#b89b72] transition-colors ${
                            formErrors.phone ? "border-red-400" : "border-[#eaeae1]"
                          }`}
                        />
                      </div>
                      {formErrors.phone && <p className="text-[10px] text-red-500 mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
                        Thư điện tử (Email) *
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#b89b72]">
                          <Mail className="w-3.5 h-3.5" />
                        </span>
                        <input 
                          type="email" 
                          placeholder="example@gmail.com" 
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                          className={`w-full pl-9 pr-4 py-3 bg-[#faf9f6] border text-xs rounded-none focus:outline-none focus:border-[#b89b72] transition-colors ${
                            formErrors.email ? "border-red-400" : "border-[#eaeae1]"
                          }`}
                        />
                      </div>
                      {formErrors.email && <p className="text-[10px] text-red-500 mt-1">{formErrors.email}</p>}
                    </div>

                    {/* Choose Date (Optional) */}
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
                        Thời gian hẹn tư vấn (Không bắt buộc)
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#b89b72]">
                          <Calendar className="w-3.5 h-3.5" />
                        </span>
                        <input 
                          type="date" 
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className="w-full pl-9 pr-4 py-3 bg-[#faf9f6] border border-[#eaeae1] text-xs rounded-none focus:outline-none focus:border-[#b89b72] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Product Selection (Optional) */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
                      Hạng mục sản phẩm quan tâm (Không bắt buộc)
                    </label>
                    <select 
                      value={bookingForm.productType}
                      onChange={(e) => setBookingForm({ ...bookingForm, productType: e.target.value })}
                      className="w-full px-3 py-3 bg-[#faf9f6] border border-[#eaeae1] text-xs rounded-none focus:outline-none focus:border-[#b89b72] transition-colors"
                    >
                      <option value="family">Khuôn viên mộ Gia Tộc thượng lưu</option>
                      <option value="single">Khu mộ đơn / mộ song thân cao cấp</option>
                      <option value="bespoke">Mộ điêu khắc nghệ thuật bespoke độc bản</option>
                      <option value="unspecified">Cần tư vấn phong thủy tổng thể dự án trước</option>
                    </select>
                  </div>

                  {/* Submission and agreement */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] text-stone-400 font-light max-w-sm">
                      * Nhấn Đăng Ký đồng nghĩa Quý khách đồng ý bảo mật tuyệt đối các thông tin cá nhân cuộc viếng thăm cùng ban quản sự Thiên Phúc.
                    </p>
                    <button 
                      type="submit"
                      className="w-full sm:w-auto px-10 py-4 bg-[#1c1a19] text-white text-[10px] tracking-widest uppercase font-bold hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
                    >
                      Đăng ký tư vấn khảo sát
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="booking-success"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 flex flex-col items-center max-w-lg mx-auto"
                >
                  <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center text-[#b89b72] mb-6 border border-[#b89b72]/30">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif text-3xl font-light text-[#1c1a19] tracking-wide mb-3">
                    Đăng Ký Thành Công
                  </h4>
                  <p className="font-sans text-stone-600 font-light text-sm leading-relaxed mb-6">
                    Kính chúc Quý khách cát tường an nhiên! Lịch đón tiếp đã được bảo mật ghi nhận vào hệ thống. Ban quản lý sẽ nhanh chóng sắp xếp đội ngũ chuyên nghiệp và liên hệ trực tiếp hỗ trợ Quý khách trong vòng 15 phút.
                  </p>
                  
                  <div className="bg-[#f5f4ed] border border-[#eaeae1] p-5 w-full text-left text-xs mb-8 space-y-2">
                    <p><strong>Khách quý:</strong> {bookingForm.fullName}</p>
                    <p><strong>Điện thoại:</strong> {bookingForm.phone}</p>
                    <p><strong>Email:</strong> {bookingForm.email}</p>
                    {bookingForm.date && (
                      <p><strong>Ngày hẹn:</strong> {new Date(bookingForm.date).toLocaleDateString("vi-VN")}</p>
                    )}
                    <p><strong>Sản phẩm quan tâm:</strong> {
                      bookingForm.productType === "family" ? "Khuôn viên mộ Gia Tộc thượng lưu" :
                      bookingForm.productType === "single" ? "Khu mộ đơn / mộ song thân cao cấp" :
                      bookingForm.productType === "bespoke" ? "Mộ nghệ thuật bespoke độc bản" :
                      "Tư vấn phong thủy tổng thể"
                    }</p>
                  </div>

                  <div className="flex justify-center">
                    <button 
                      onClick={() => {
                        setFormSubmitted(false);
                        setBookingForm({
                          fullName: "",
                          phone: "",
                          email: "",
                          date: "",
                          slot: "morning",
                          productType: "family",
                          vipService: [],
                          note: ""
                        });
                      }}
                      className="px-8 py-3 bg-[#1c1a19] text-white text-[10px] tracking-widest uppercase font-bold hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
                    >
                      Quay lại trang chủ / Đăng ký mới
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
      </section>

      {/* ========================================== */}
      {/* FAQ SECTION: Sophisticated Q&A panels */}
      {/* ========================================== */}
      <section className="py-24 px-6 lg:px-12 bg-white border-t border-[#eaeae1]">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-3">
              MỌI SỰ THẮC MẮC
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Thư Viện Tri Thức Tâm Linh
            </h3>
            <div className="w-12 h-px bg-[#b89b72] mt-4"></div>
          </div>

          {/* Search bar inside FAQ */}
          <div className="mb-10 relative max-w-md mx-auto">
            <input 
              type="text" 
              placeholder="Nhập câu hỏi bạn đang băn khoăn... (pháp lý, phong thủy, giá cả)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-3.5 bg-[#faf9f6] border border-[#eaeae1] text-xs focus:outline-none focus:border-[#b89b72]"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#b89b72]">
              <Search className="w-4 h-4" />
            </span>
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 pb-4 border-b border-[#eaeae1]/60">
            {[
              { id: "all", label: "Tất cả" },
              { id: "legal", label: "Pháp Lý & Quy Hoạch" },
              { id: "fengshui", label: "Địa Linh Phong Thủy" },
              { id: "technology", label: "Công Nghệ Sinh Học" },
              { id: "services", label: "Dịch Vụ Chăm Sóc" }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setFaqCategory(cat.id)}
                className={`px-3 py-1.5 text-[10px] tracking-widest uppercase transition-luxury ${
                  faqCategory === cat.id 
                    ? "text-[#b89b72] font-bold border-b-2 border-[#b89b72]" 
                    : "text-stone-400 hover:text-stone-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ list */}
          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div 
                    key={faq.id}
                    className="border-b border-[#eaeae1]/70 pb-4 transition-all"
                  >
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                      className="w-full flex justify-between items-center text-left py-3 focus:outline-none group"
                    >
                      <h4 className="font-serif text-base text-[#1c1a19] tracking-wide font-medium group-hover:text-[#b89b72] transition-colors">
                        {faq.question}
                      </h4>
                      <span className={`text-[#b89b72] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                        <ChevronDown className="w-4 h-4" />
                      </span>
                    </button>
                    
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <p className="font-sans text-stone-600 font-light text-xs leading-relaxed mt-2 pl-4 border-l-2 border-[#b89b72]/40 bg-[#faf9f6] p-4">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-xs text-stone-400 py-8 font-light italic">
                Không tìm thấy câu trả lời phù hợp với từ khóa của Quý khách. Xin vui lòng gửi câu hỏi trực tiếp cho Quản gia Tĩnh Tâm bên góc màn hình.
              </p>
            )}
          </div>

        </motion.div>
      </section>

      {/* Chatbot feature temporarily disabled 
      <AnimatePresence>
        {isConciergeOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden bg-[#1c1a19]/40 backdrop-blur-sm flex justify-end">
            <div className="absolute inset-0" onClick={() => setIsConciergeOpen(false)} />

            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-[#faf9f6] h-full shadow-2xl flex flex-col border-l border-[#eaeae1] z-10"
            >
              <div className="p-6 bg-[#1c1a19] text-white flex justify-between items-center border-b border-[#b89b72]/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#b89b72]/20 flex items-center justify-center border border-[#b89b72]/30">
                    <Compass className="w-4 h-4 text-[#b89b72]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base tracking-widest uppercase font-light text-[#eaeae1]">
                      Quản Gia Tĩnh Tâm
                    </h4>
                    <span className="text-[8px] uppercase tracking-widest text-emerald-400 font-semibold block">
                      Đang Trực Tuyến • Vip Concierge
                    </span>
                  </div>
                </div>
                <button 
                  onClick={() => setIsConciergeOpen(false)}
                  className="text-stone-400 hover:text-white p-1"
                  aria-label="Đóng cuộc nói chuyện"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-[#faf9f6]">
                {chatMessages.map((msg, idx) => (
                  <div 
                    key={idx}
                    className={`flex gap-2 items-start ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.sender === "concierge" && (
                      <div className="w-6 h-6 rounded-full bg-[#b89b72]/15 border border-[#b89b72]/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Compass className="w-3 h-3 text-[#b89b72]" />
                      </div>
                    )}
                    <div className={`max-w-[80%] p-4 text-xs leading-relaxed shadow-sm ${
                      msg.sender === "user" 
                        ? "bg-[#1c1a19] text-[#f5f4ed] rounded-none border border-[#1c1a19]" 
                        : "bg-white text-stone-700 rounded-none border border-[#eaeae1]"
                    }`}>
                      <p>{msg.text}</p>
                      <span className="text-[8px] text-stone-400 block mt-1 text-right font-mono">
                        {msg.sender === "user" ? "Quý khách" : "Quản gia • Tĩnh Tâm"}
                      </span>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-2 items-start justify-start">
                    <div className="w-6 h-6 rounded-full bg-[#b89b72]/15 border border-[#b89b72]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Compass className="w-3 h-3 text-[#b89b72]" />
                    </div>
                    <div className="bg-white text-[#b89b72] rounded-none border border-[#eaeae1] p-3 px-4 shadow-sm flex items-center gap-1">
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                      <span className="typing-dot"></span>
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              <div className="p-4 bg-white border-t border-[#eaeae1]/60 space-y-2">
                <p className="text-[9px] uppercase tracking-wider text-[#b89b72] font-semibold">Tâm nguyện thường trực của khách quý:</p>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Phong thủy thế đất",
                    "Thủ tục pháp lý lâu dài",
                    "Bảng giá các khuôn viên",
                    "Đưa đón VIP tham quan"
                  ].map((phrase, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        sendQuery(phrase);
                      }}
                      className="text-[10px] px-3 py-1.5 bg-[#faf9f6] border border-[#eaeae1] text-stone-600 hover:border-[#b89b72] hover:text-[#1c1a19] transition cursor-pointer"
                    >
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>

              <form 
                onSubmit={handleSendMessage}
                className="p-4 bg-[#faf9f6] border-t border-[#eaeae1] flex gap-2"
              >
                <input 
                  type="text" 
                  placeholder="Gửi tâm nguyện thắc mắc cho Quản gia..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  className="flex-1 px-4 py-3 border border-[#eaeae1] bg-white text-xs focus:outline-none focus:border-[#b89b72]"
                />
                <button 
                  type="submit"
                  className="px-5 bg-[#1c1a19] text-white text-[10px] tracking-widest uppercase font-bold hover:bg-[#b89b72] hover:text-[#1c1a19] transition-colors"
                >
                  Gửi
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="fixed bottom-24 right-6 z-40">
        <motion.button 
          onClick={() => setIsConciergeOpen(true)}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1c1a19] border border-[#b89b72]/40 text-[#eaeae1] shadow-2xl hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Nhấp để trao đổi bí mật với Quản Gia Tĩnh Tâm"
        >
          <MessageSquare className="w-5 h-5" />
        </motion.button>
      </div>
      */}

      {/* ========================================== */}
      {/* FOOTER: Minimalist elegant luxury signoff */}
      {/* ========================================== */}
      <footer className="bg-[#1c1a19] text-white py-16 px-6 lg:px-12 border-t border-[#b89b72]/20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-stone-800">
          
          <div className="space-y-4">
            <h4 className="font-serif text-xl tracking-[0.25em] uppercase font-light text-[#eaeae1]">
              THIEN PHUC
            </h4>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#b89b72] font-semibold block">
              Vĩnh Hằng Viên • Non Thiêng Yên Tử
            </span>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Kiến tạo di sản tâm linh đỉnh cao 5 sao, gìn giữ phúc trạch thiên niên vạn đại cho dòng họ.
            </p>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-[#b89b72] font-semibold mb-4">VỊ TRÍ LONG MẠCH</h5>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Quốc lộ 18, Thượng Yên Công, Thành phố Uông Bí, Tỉnh Quảng Ninh (Cửa ngõ dâng hương lễ Phật Yên Tử).
            </p>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-[#b89b72] font-semibold mb-4">LIÊN HỆ PHÒNG KHÁCH VIP</h5>
            <p className="text-xs text-stone-400 font-light leading-relaxed">
              Hotline: 1800 68XX (Tổng đài đặt lịch miễn cước)<br />
              Email: vip@thienphucvinhhang.com<br />
              Văn phòng đại diện: Lầu 18, Toà nhà Sailing Tower, Quận 1, TP. HCM.
            </p>
          </div>

          <div>
            <h5 className="text-[10px] uppercase tracking-widest text-[#b89b72] font-semibold mb-4">ĐỐI TÁC DANH TIẾNG</h5>
            <ul className="text-xs text-stone-400 space-y-2 font-light">
              <li>• Sala Garden Holdings</li>
              <li>• Blackstones Funeral Services</li>
              <li>• Viện Nghiên Cứu Phong Thủy Á Đông</li>
              <li>• Công Nghệ Sinh Học Bio-Green</li>
            </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Thiên Phúc Vĩnh Hằng Viên. All rights reserved. Inspired by Understated Luxury.</p>
          <div className="flex gap-6 uppercase tracking-widest">
            <a href="#" className="hover:text-white">Điều khoản bảo mật</a>
            <a href="#" className="hover:text-white">Di sản kế thừa</a>
            <a href="#" className="hover:text-white">Sơ đồ vị trí</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
