import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Phone,
  Volume2,
  VolumeX,
  Menu,
  X,
  ChevronRight,
  Compass
} from "lucide-react";
import { PROJECT_INFO, NAV_ITEMS } from "../constants";

interface HeaderProps {
  isAudioPlaying: boolean;
  toggleAudio: () => void;
}

export function Header({ isAudioPlaying, toggleAudio }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-[#faf9f6]/90 backdrop-blur-md border-b border-[#eaeae1]/50 px-6 lg:px-12 py-5 transition-luxury">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src={`${import.meta.env.BASE_URL}Images/Logo/TPVHV_horizontal.png`}
            alt="Thiên Phúc Vĩnh Hằng Viên Logo"
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Điều hướng trên máy tính */}
        <nav className="hidden lg:flex items-center gap-7 text-[11px] font-medium tracking-widest text-[#2c2a29]/70 uppercase">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `transition-colors cursor-pointer hover:text-[#b89b72] ${
                  isActive ? "text-[#b89b72] font-semibold" : ""
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Điều khiển âm thanh */}
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
                <span className="w-0.5 h-3 bg-[#b89b72] rounded-full animate-bounce" style={{ animationDelay: "0.1s", animationDuration: "0.8s" }}></span>
                <span className="w-0.5 h-1.5 bg-[#b89b72] rounded-full animate-bounce" style={{ animationDelay: "0.3s", animationDuration: "0.6s" }}></span>
                <span className="w-0.5 h-2.5 bg-[#b89b72] rounded-full animate-bounce" style={{ animationDelay: "0.5s", animationDuration: "0.7s" }}></span>
              </div>
            ) : (
              <VolumeX className="w-3.5 h-3.5" />
            )}
          </button>

          {/* Nút gọi điện nhanh trên máy tính */}
          <a
            href={`tel:${PROJECT_INFO.hotlineRaw}`}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 bg-[#faf9f6] border border-[#b89b72] text-[#b89b72] text-sm tracking-widest uppercase font-medium hover:bg-[#b89b72] hover:text-white transition-luxury"
            title={`Gọi ${PROJECT_INFO.hotline}`}
          >
            <Phone className="w-3 h-3" />
            <span>{PROJECT_INFO.hotline}</span>
          </a>

          <Link
            to="/lien-he"
            className="hidden md:inline-flex px-5 py-2.5 bg-[#1c1a19] text-[#f5f4ed] text-sm tracking-widest uppercase font-medium hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury rounded-none cursor-pointer"
          >
            Đón Tiếp VIP
          </Link>

          {/* Nút mở menu trên di động */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 border border-[#eaeae1] bg-white text-[#1c1a19]"
            aria-label="Mở menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Ngăn menu trên di động */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 right-0 bg-[#faf9f6] border-b border-[#eaeae1] shadow-xl"
          >
            <div className="px-6 py-4 flex flex-col">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `py-3 text-xs tracking-widest uppercase font-medium border-b border-[#eaeae1]/60 flex items-center justify-between ${
                      isActive ? "text-[#b89b72]" : "text-[#2c2a29]"
                    }`
                  }
                >
                  {item.label}
                  <ChevronRight className="w-3.5 h-3.5" />
                </NavLink>
              ))}
              <a
                href={`tel:${PROJECT_INFO.hotlineRaw}`}
                className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#b89b72] text-white text-xs tracking-widest uppercase font-bold"
              >
                <Phone className="w-3.5 h-3.5" />
                Gọi {PROJECT_INFO.hotline}
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
