import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Calendar,
  ChevronRight,
  Phone,
  User,
  Mail,
  Check,
  CheckCircle,
  Search,
  X,
  ArrowDown,
  Building,
  Waves,
  Utensils,
  Car,
  Heart,
  Compass
} from "lucide-react";
import {
  ENLIGHTENMENT_STEPS,
  SHOWCASE_ITEMS,
  FAQ_ITEMS,
  PROJECT_OVERVIEW
} from "../data";
import { PROJECT_INFO, STATS, FACILITIES } from "../constants";
import type { ShowcaseItem, EnlightenmentStep } from "../data";
import { Link } from "react-router-dom";
import { OptimizedImage } from "../components/OptimizedImage";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Temple: Compass,
  Building,
  Heart,
  Utensils,
  Waves,
  Car
};

export default function HomePage() {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedShowcase, setSelectedShowcase] = useState<ShowcaseItem | null>(null);
  const [faqCategory, setFaqCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Booking form
  const [bookingForm, setBookingForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    date: "",
    productType: "family",
    note: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const currentStep: EnlightenmentStep = ENLIGHTENMENT_STEPS[currentStepIndex];
  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    const matchesCategory = faqCategory === "all" || faq.category === faqCategory;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

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
      // Simulate sending - in real life, this would POST to a server
      const payload = { ...bookingForm, submittedAt: new Date().toISOString() };
      console.log("[Booking] New reservation:", payload);
    }
  };

  return (
    <>
      {/* ============================================ */}
      {/* TRANG CHỦ */}
      {/* ============================================ */}
      <section className="relative h-[90vh] min-h-[600px] bg-[#1c1a19] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.04, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 0.95 }}
            transition={{ duration: 3.5, ease: "easeOut" }}
            className="absolute inset-0 bg-cover bg-center md:bg-[center_30%]"
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}Images/Photos/tong_quan.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1c1a19]/90 via-[#1c1a19]/45 via-50% to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#1c1a19]/40 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#faf9f6] to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-12">
          <div className="max-w-xl lg:max-w-2xl flex flex-col items-start text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1c1a19]/80 backdrop-blur-md border-l-2 border-[#b89b72] mb-6 shadow-md"
            >
              <span className="text-sm md:text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold">
                THIÊN PHÚC VĨNH HẰNG VIÊN
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 1.2 }}
              className="font-serif text-5xl sm:text-7xl lg:text-8xl font-light text-white tracking-wide leading-[1.1] mb-6 drop-shadow-md"
            >
              Nơi Tâm Hồn An Trú<br />
              <span className="font-serif italic font-normal text-[#b89b72]">Trong Cõi Vĩnh Hằng</span>
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="w-20 h-px bg-[#b89b72] mb-6 origin-left"
            />

            <motion.p
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 0.95, x: 0 }}
              transition={{ delay: 1, duration: 1 }}
              className="font-sans text-base sm:text-lg text-stone-200 font-light tracking-wide max-w-lg leading-relaxed mb-10 drop-shadow"
            >
              Đón nhận long mạch linh thiêng từ non cao Yên Tử, Thiên Phúc dựng xây một cõi an lạc vĩnh cửu, hòa nhập tuyệt đối vào thiên nhiên tinh khôi và di sản gia tộc bất biến trường tồn.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                onClick={scrollToSection("reservation")}
                className="px-8 py-3.5 bg-white text-[#1c1a19] text-sm font-medium uppercase tracking-[0.25em] hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury shadow-lg text-center cursor-pointer"
              >
                Đặt lịch khảo sát riêng tư
              </button>
              <a
                href={`tel:${PROJECT_INFO.hotlineRaw}`}
                className="px-8 py-3.5 border border-white/40 bg-black/40 backdrop-blur-md text-white text-sm font-medium uppercase tracking-[0.25em] hover:bg-[#b89b72] hover:border-[#b89b72] hover:text-[#1c1a19] transition-luxury text-center inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-3 h-3" /> Gọi {PROJECT_INFO.hotline}
              </a>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 lg:right-16 z-10 flex flex-col items-center gap-2 text-stone-300 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-full border border-white/10">
          <span className="text-xs uppercase tracking-[0.3em]">Cuộn dọc</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#b89b72]" />
        </div>
      </section>

      {/* ============================================ */}
      {/* TỔNG QUAN DỰ ÁN - OVERVIEW (MỚI) */}
      {/* ============================================ */}
      <section className="py-24 px-6 lg:px-12 bg-white border-b border-[#eaeae1]/30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <div className="lg:col-span-5">
              <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-3">
                TỔNG QUAN DỰ ÁN
              </span>
              <h3 className="font-serif text-4xl md:text-5xl font-light text-[#1c1a19] tracking-wide leading-tight mb-6">
                {PROJECT_OVERVIEW.headline}
              </h3>
              <div className="w-10 h-px bg-[#b89b72] mb-6"></div>
              <p className="font-sans text-stone-600 font-light text-lg leading-relaxed mb-4">
                {PROJECT_OVERVIEW.intro}
              </p>
              <p className="font-sans text-stone-600 font-light text-lg leading-relaxed italic border-l-2 border-[#b89b72]/40 pl-4">
                "Kiến Tạo Không Gian An Nghỉ Thanh Tịnh – Nhân Văn – Trường Tồn"
              </p>
              <Link
                to="/gioi-thieu"
                className="inline-flex items-center gap-2 mt-6 text-base text-[#b89b72] font-semibold tracking-widest uppercase hover:text-[#1c1a19] transition-colors border-b border-[#b89b72]/40 pb-1"
              >
                Tìm hiểu chi tiết dự án <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="lg:col-span-7 overflow-hidden shadow-xl border border-[#eaeae1]">
              <OptimizedImage
                src={`${import.meta.env.BASE_URL}Images/Photos/tong_quan_2.jpg`}
                alt="Tổng quan Thiên Phúc Vĩnh Hằng Viên"
                className="w-full h-full"
                aspectRatio="4/3"
                thumbnail={`${import.meta.env.BASE_URL}Images/Thumbnails/tong_quan_2_thumb.jpg`}
              />
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-t border-b border-[#eaeae1] py-10">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <span className="block font-serif text-5xl md:text-5xl text-[#b89b72] mb-1">
                  {s.value}
                </span>
                <span className="block text-sm uppercase tracking-widest text-[#1c1a19] font-semibold mb-1">
                  {s.label}
                </span>
                <span className="block text-sm text-stone-500 font-light italic">
                  {s.desc}
                </span>
              </div>
            ))}
          </div>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECT_OVERVIEW.pillars.map((pillar, i) => (
              <div
                key={i}
                className="p-6 border border-[#eaeae1] bg-[#faf9f6] hover:border-[#b89b72] transition-luxury"
              >
                <span className="text-[#b89b72] font-serif text-5xl block mb-3 leading-none">0{i + 1}</span>
                <h4 className="font-serif text-2xl text-[#1c1a19] mb-3 tracking-wide">{pillar.title}</h4>
                <p className="text-base text-stone-600 leading-relaxed font-light">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* TIỆN ÍCH ĐỒNG BỘ */}
      {/* ============================================ */}
      <section className="py-24 px-6 lg:px-12 bg-[#f5f4ed]/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-3">
              TIỆN ÍCH ĐỒNG BỘ 5 SAO
            </span>
            <h3 className="font-serif text-5xl md:text-5xl font-light text-[#1c1a19] tracking-wide">
              Hệ Thống Tiện Ích Hoàn Hảo
            </h3>
            <p className="font-sans text-stone-500 font-light text-base tracking-wider mt-2">
              Thiên nhiên hòa quyện cùng kiến trúc tạo nên "Hồn Việt – Nét Trần – Tinh thần thiền Trúc Lâm"
            </p>
            <div className="w-12 h-px bg-[#b89b72] mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACILITIES.map((fac) => {
              const Icon = ICON_MAP[fac.icon] ?? Compass;
              return (
                <div
                  key={fac.id}
                  className="bg-white border border-[#eaeae1] p-6 hover:shadow-lg hover:border-[#b89b72]/40 transition-luxury"
                >
                  <div className="w-12 h-12 rounded-full bg-[#b89b72]/10 flex items-center justify-center mb-4 border border-[#b89b72]/20">
                    <Icon className="w-5 h-5 text-[#b89b72]" />
                  </div>
                  <h4 className="font-serif text-2xl text-[#1c1a19] mb-2 tracking-wide">{fac.title}</h4>
                  <p className="text-base text-stone-600 font-light leading-relaxed">{fac.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/quy-hoach"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#b89b72] text-[#b89b72] text-sm tracking-widest uppercase font-medium hover:bg-[#b89b72] hover:text-white transition-luxury"
            >
              Xem chi tiết quy hoạch tổng thể <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* BẢY BẬC GIÁC NGỘ - PHENOMENOLOGY */}
      {/* ============================================ */}
      <section id="paths" className="py-24 px-6 lg:px-12 bg-[#faf9f6]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-3">
              HÀNH TRÌNH TÂM LINH
            </span>
            <h3 className="font-serif text-5xl md:text-5xl font-light text-[#1c1a19] tracking-wide">
              Bảy Bậc Giác Ngộ An Nhiên
            </h3>
            <p className="font-sans text-stone-500 font-light text-base tracking-wider mt-2">
              Bảy nấc thang thiền định, rũ bỏ hồng trần, tìm về chốn vĩnh hằng tại tâm
            </p>
            <div className="w-12 h-px bg-[#b89b72] mt-4"></div>
          </div>

          <div className="relative flex justify-between items-center mb-16 max-w-4xl mx-auto px-4 overflow-x-auto py-6 gap-4">
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
                  <div
                    className={`w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all duration-500 ${
                      isActive
                        ? "bg-[#1c1a19] border-2 border-[#b89b72] text-[#b89b72] scale-110 shadow-lg"
                        : isCompleted
                        ? "bg-[#b89b72] text-white border-2 border-[#b89b72]"
                        : "bg-white border-2 border-[#eaeae1] text-stone-400 group-hover:border-stone-500"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    ) : (
                      <span className="text-sm font-semibold font-mono">{step.number}</span>
                    )}
                  </div>
                  <span
                    className={`text-sm tracking-widest font-serif mt-2 font-medium transition-colors duration-300 whitespace-nowrap ${
                      isActive ? "text-[#1c1a19] font-semibold" : "text-stone-400 group-hover:text-stone-700"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>

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
                <div className="lg:col-span-5 p-8 lg:p-14 flex flex-col justify-between min-h-[400px]">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-base bg-[#b89b72]/10 text-[#b89b72] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">
                        BẬC {currentStep.number}
                      </span>
                      <span className="text-base text-stone-400 font-light tracking-widest uppercase">
                        {currentStep.english}
                      </span>
                    </div>

                    <h4 className="font-serif text-5xl font-light text-[#1c1a19] tracking-wide mb-6">
                      {currentStep.title}
                    </h4>

                    <p className="font-serif text-stone-700 italic text-xl leading-relaxed mb-6 pl-4 border-l border-[#b89b72]/40">
                      &ldquo;{currentStep.quote}&rdquo;
                    </p>

                    <p className="font-sans text-stone-600 font-light text-lg leading-relaxed">
                      {currentStep.description}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t border-[#eaeae1] flex items-center justify-between">
                    <span className="text-sm text-stone-400 uppercase tracking-widest font-mono">
                      CẢNH QUAN THIÊN PHÚC
                    </span>
                    <button
                      onClick={() => {
                        const next = currentStepIndex < ENLIGHTENMENT_STEPS.length - 1 ? currentStepIndex + 1 : 0;
                        setCurrentStepIndex(next);
                      }}
                      className="text-base text-[#b89b72] hover:text-[#1c1a19] transition-colors font-semibold tracking-widest uppercase flex items-center gap-1"
                    >
                      Bậc tiếp theo <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

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

      {/* ============================================ */}
      {/* BỘ SƯU TẬP DI SẢN */}
      {/* ============================================ */}
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
              <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-2">
                KIẾN TRÚC & CẢNH SẮC
              </span>
              <h3 className="font-serif text-5xl md:text-5xl font-light text-[#1c1a19] tracking-wide">
                Tuyệt Tác Cảnh Quan Di Sản
              </h3>
            </div>
            <p className="font-sans text-stone-500 font-light text-lg max-w-sm leading-relaxed">
              Sự kết tinh mỹ học tinh tế từ kiến trúc tôn nghiêm Á Đông và hồn cốt văn hóa thiền phái Trúc Lâm Yên Tử.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SHOWCASE_ITEMS.slice(0, 3).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedShowcase(item)}
                className="group relative h-[420px] bg-[#f5f4ed] overflow-hidden cursor-pointer flex flex-col justify-end p-8 transition-luxury border border-[#eaeae1]/40"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-1000 group-hover:scale-105 filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-90"
                  style={{ backgroundImage: `url(${item.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1a19] via-transparent to-transparent opacity-85" />

                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-widest text-[#b89b72] font-semibold bg-[#1c1a19]/40 backdrop-blur-sm px-2.5 py-1 inline-block mb-3">
                    {item.tag}
                  </span>
                  <span className="text-xs text-white/50 block font-mono tracking-widest uppercase mb-1">{item.english}</span>
                  <h4 className="font-serif text-3xl text-white font-light tracking-wide group-hover:text-[#b89b72] transition-colors mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-stone-300 font-light leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-24 overflow-hidden">
                    {item.description}
                  </p>
                  <span className="text-xs uppercase tracking-widest text-white/85 font-medium border-b border-white/30 pb-0.5 group-hover:border-[#b89b72] group-hover:text-[#b89b72] transition">
                    Thưởng lãm kiến trúc →
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/quy-hoach"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-[#b89b72] text-[#b89b72] text-sm tracking-widest uppercase font-medium hover:bg-[#b89b72] hover:text-white transition-luxury"
            >
              Xem tất cả công trình tiện ích <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Showcase Lightbox */}
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
              <button
                onClick={() => setSelectedShowcase(null)}
                className="absolute top-5 right-5 z-20 bg-[#1c1a19] text-white p-2.5 hover:bg-[#b89b72] hover:text-[#1c1a19] transition"
                aria-label="Đóng"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="h-80 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${selectedShowcase.imageUrl})` }}
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-xs uppercase tracking-widest bg-[#1c1a19] text-white px-3 py-1 font-semibold">
                    {selectedShowcase.tag}
                  </span>
                </div>
              </div>

              <div className="p-8 lg:p-12">
                <span className="text-sm uppercase tracking-widest text-[#b89b72] font-semibold font-mono block mb-2">
                  {selectedShowcase.english}
                </span>
                <h4 className="font-serif text-5xl font-light text-[#1c1a19] tracking-wide mb-4">
                  {selectedShowcase.title}
                </h4>
                <div className="w-12 h-px bg-[#b89b72] mb-6"></div>

                <p className="font-sans text-stone-700 font-light text-lg leading-relaxed mb-6">
                  {selectedShowcase.longDescription}
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedShowcase(null)}
                    className="px-6 py-3 border border-[#eaeae1] text-stone-500 text-sm tracking-widest uppercase hover:text-stone-800 transition"
                  >
                    Quay lại
                  </button>
                  <a
                    href={`tel:${PROJECT_INFO.hotlineRaw}`}
                    className="px-6 py-3 bg-[#1c1a19] text-white text-sm tracking-widest uppercase hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
                  >
                    Gọi {PROJECT_INFO.hotline}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ============================================ */}
      {/* MẪU THIẾT KẾ ĐỘC ĐÁO */}
      {/* ============================================ */}
      <section id="reservation" className="py-24 px-6 lg:px-12 bg-[#faf9f6] border-t border-[#eaeae1]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-3">
              KẾ HOẠCH ĐÓN TIẾP VIP
            </span>
            <h3 className="font-serif text-5xl md:text-5xl font-light text-[#1c1a19] tracking-wide">
              Đăng Ký Khảo Sát Thực Tế Bảo Mật
            </h3>
            <p className="font-sans text-stone-500 font-light text-base tracking-wider mt-2">
              Hoặc gọi ngay Hotline <span className="text-[#b89b72] font-semibold">{PROJECT_INFO.hotline}</span> để được tư vấn trực tiếp
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
                    <div>
                      <label className="block text-sm uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
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
                          className={`w-full pl-9 pr-4 py-3 bg-[#faf9f6] border text-base rounded-none focus:outline-none focus:border-[#b89b72] transition-colors ${
                            formErrors.fullName ? "border-red-400" : "border-[#eaeae1]"
                          }`}
                        />
                      </div>
                      {formErrors.fullName && <p className="text-sm text-red-500 mt-1">{formErrors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-sm uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
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
                          className={`w-full pl-9 pr-4 py-3 bg-[#faf9f6] border text-base rounded-none focus:outline-none focus:border-[#b89b72] transition-colors ${
                            formErrors.phone ? "border-red-400" : "border-[#eaeae1]"
                          }`}
                        />
                      </div>
                      {formErrors.phone && <p className="text-sm text-red-500 mt-1">{formErrors.phone}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
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
                          className={`w-full pl-9 pr-4 py-3 bg-[#faf9f6] border text-base rounded-none focus:outline-none focus:border-[#b89b72] transition-colors ${
                            formErrors.email ? "border-red-400" : "border-[#eaeae1]"
                          }`}
                        />
                      </div>
                      {formErrors.email && <p className="text-sm text-red-500 mt-1">{formErrors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
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
                          className="w-full pl-9 pr-4 py-3 bg-[#faf9f6] border border-[#eaeae1] text-base rounded-none focus:outline-none focus:border-[#b89b72] transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
                      Hạng mục sản phẩm quan tâm (Không bắt buộc)
                    </label>
                    <select
                      value={bookingForm.productType}
                      onChange={(e) => setBookingForm({ ...bookingForm, productType: e.target.value })}
                      className="w-full px-3 py-3 bg-[#faf9f6] border border-[#eaeae1] text-base rounded-none focus:outline-none focus:border-[#b89b72] transition-colors"
                    >
                      <option value="family">Khuôn viên mộ Gia Tộc thượng lưu</option>
                      <option value="single">Khu mộ đơn / mộ song thân cao cấp</option>
                      <option value="bespoke">Mộ điêu khắc nghệ thuật bespoke độc bản</option>
                      <option value="unspecified">Cần tư vấn phong thủy tổng thể dự án trước</option>
                    </select>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-stone-400 font-light max-w-sm">
                      * Nhấn Đăng Ký đồng nghĩa Quý khách đồng ý bảo mật tuyệt đối các thông tin cá nhân.
                    </p>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-4 bg-[#1c1a19] text-white text-sm tracking-widest uppercase font-bold hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
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
                  <h4 className="font-serif text-5xl font-light text-[#1c1a19] tracking-wide mb-3">
                    Đăng Ký Thành Công
                  </h4>
                  <p className="font-sans text-stone-600 font-light text-lg leading-relaxed mb-6">
                    Kính chúc Quý khách cát tường an nhiên! Lịch đón tiếp đã được bảo mật ghi nhận. Ban quản lý sẽ liên hệ trực tiếp trong vòng 15 phút qua số <span className="font-semibold">{bookingForm.phone}</span>.
                  </p>
                  <p className="text-base text-stone-500 mb-6">
                    Hoặc gọi ngay <a href={`tel:${PROJECT_INFO.hotlineRaw}`} className="text-[#b89b72] font-semibold">{PROJECT_INFO.hotline}</a> để được hỗ trợ tức thì.
                  </p>

                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setBookingForm({
                          fullName: "",
                          phone: "",
                          email: "",
                          date: "",
                          productType: "family",
                          note: ""
                        });
                      }}
                      className="px-8 py-3 bg-[#1c1a19] text-white text-sm tracking-widest uppercase font-bold hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
                    >
                      Đăng ký mới
                    </button>
                    <a
                      href={`tel:${PROJECT_INFO.hotlineRaw}`}
                      className="px-8 py-3 border border-[#b89b72] text-[#b89b72] text-sm tracking-widest uppercase font-bold hover:bg-[#b89b72] hover:text-white transition-luxury inline-flex items-center gap-2"
                    >
                      <Phone className="w-3 h-3" /> Gọi ngay
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* CÂU HỎI THƯỜNG GẶP */}
      {/* ============================================ */}
      <section className="py-24 px-6 lg:px-12 bg-white border-t border-[#eaeae1]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-3">
              MỌI SỰ THẮC MẮC
            </span>
            <h3 className="font-serif text-5xl md:text-5xl font-light text-[#1c1a19] tracking-wide">
              Thư Viện Tri Thức Tâm Linh
            </h3>
            <div className="w-12 h-px bg-[#b89b72] mt-4"></div>
          </div>

          <div className="mb-10 relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Nhập câu hỏi bạn đang băn khoăn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-3.5 bg-[#faf9f6] border border-[#eaeae1] text-base focus:outline-none focus:border-[#b89b72]"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#b89b72]">
              <Search className="w-4 h-4" />
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10 pb-4 border-b border-[#eaeae1]/60">
            {[
              { id: "all", label: "Tất cả" },
              { id: "legal", label: "Pháp Lý & Quy Hoạch" },
              { id: "fengshui", label: "Địa Linh Phong Thủy" },
              { id: "technology", label: "Công Nghệ Sinh Học" },
              { id: "services", label: "Dịch Vụ Chăm Sóc" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFaqCategory(cat.id)}
                className={`px-3 py-1.5 text-sm tracking-widest uppercase transition-luxury ${
                  faqCategory === cat.id
                    ? "text-[#b89b72] font-bold border-b-2 border-[#b89b72]"
                    : "text-stone-400 hover:text-stone-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedFaqId === faq.id;
                return (
                  <div key={faq.id} className="border-b border-[#eaeae1]/70 pb-4">
                    <button
                      onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                      className="w-full flex justify-between items-center text-left py-3 focus:outline-none group"
                    >
                      <h4 className="font-serif text-xl text-[#1c1a19] tracking-wide font-medium group-hover:text-[#b89b72] transition-colors">
                        {faq.question}
                      </h4>
                      <span className={`text-[#b89b72] transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                        <ChevronRight className="w-4 h-4 rotate-90" />
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
                          <p className="font-sans text-stone-600 font-light text-base leading-relaxed mt-2 pl-4 border-l-2 border-[#b89b72]/40 bg-[#faf9f6] p-4">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-base text-stone-400 py-8 font-light italic">
                Không tìm thấy câu trả lời phù hợp. Vui lòng gọi Hotline <a href={`tel:${PROJECT_INFO.hotlineRaw}`} className="text-[#b89b72] font-semibold">{PROJECT_INFO.hotline}</a> để được tư vấn.
              </p>
            )}
          </div>
        </motion.div>
      </section>
    </>
  );
}
