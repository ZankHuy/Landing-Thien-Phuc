import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Phone, MessageCircle, X, ChevronUp } from "lucide-react";
import { PROJECT_INFO } from "../constants";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show floating contact after user scrolls past hero (600px)
      const y = window.scrollY;
      setVisible(y > 600);
      setShowTop(y > 1200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Hidden until scroll threshold */}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3"
          >
            {/* Expanded panel */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#1c1a19] text-white border border-[#b89b72]/40 shadow-2xl w-72 overflow-hidden"
                >
                  {/* Header */}
                  <div className="px-5 py-4 bg-gradient-to-br from-[#1c1a19] to-[#2c2a29] border-b border-[#b89b72]/20">
                    <p className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold">
                      Tư vấn viên
                    </p>
                    <h4 className="font-serif text-lg tracking-wide text-white mt-1">
                      Quản Gia {PROJECT_INFO.name.split(" ")[0]}
                    </h4>
                    <p className="text-sm text-stone-400 mt-1 leading-relaxed">
                      Hỗ trợ 24/7 · Miễn phí tư vấn
                    </p>
                  </div>

                  {/* Hotline button */}
                  <a
                    href={`tel:${PROJECT_INFO.hotlineRaw}`}
                    className="flex items-center gap-3 px-5 py-4 hover:bg-[#b89b72]/10 transition-colors border-b border-stone-800"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#b89b72]/15 border border-[#b89b72]/40 flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-[#b89b72]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm uppercase tracking-widest text-stone-400">Gọi Hotline</p>
                      <p className="font-serif text-base font-semibold text-white">
                        {PROJECT_INFO.hotline}
                      </p>
                    </div>
                  </a>

                  {/* Zalo button */}
                  <a
                    href={`https://zalo.me/${PROJECT_INFO.zaloPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-5 py-4 hover:bg-[#b89b72]/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#0068FF]/15 border border-[#0068FF]/40 flex items-center justify-center shrink-0">
                      <MessageCircle className="w-4 h-4 text-[#5fa8ff]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm uppercase tracking-widest text-stone-400">Chat Zalo</p>
                      <p className="font-serif text-base font-semibold text-white">
                        {PROJECT_INFO.hotline}
                      </p>
                    </div>
                  </a>

                  <div className="px-5 py-3 bg-[#1c1a19] border-t border-stone-800">
                    <p className="text-[9px] text-stone-500 italic text-center">
                      Cam kết bảo mật thông tin khách hàng
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main toggle button */}
            <div className="flex items-center gap-2">
              {/* Back-to-top button (separate) */}
              <AnimatePresence>
                {showTop && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={scrollToTop}
                    className="w-10 h-10 rounded-full bg-white/90 backdrop-blur border border-[#eaeae1] text-[#2c2a29] shadow-lg hover:bg-[#b89b72] hover:text-white hover:border-[#b89b72] transition-all flex items-center justify-center"
                    title="Lên đầu trang"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.button
                onClick={() => setOpen(!open)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-14 h-14 rounded-full bg-[#b89b72] text-white shadow-2xl hover:bg-[#1c1a19] transition-luxury flex items-center justify-center"
                aria-label={open ? "Đóng liên hệ" : "Mở liên hệ"}
                title="Liên hệ tư vấn"
              >
                {/* Radar pulse rings */}
                {!open && (
                  <>
                    <span className="radar-pulse-ring" />
                    <span className="radar-pulse-ring" style={{ animationDelay: "1s" }} />
                  </>
                )}
                {open ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Phone className="w-5 h-5" />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
