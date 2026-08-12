import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Clock, ChevronRight } from "lucide-react";
import { PROJECT_INFO } from "../constants";
import { OptimizedImage } from "../components/OptimizedImage";

export default function LocationPage() {
  return (
    <>
      {/* Page hero */}
      <section className="relative pt-20 pb-24 px-6 lg:px-12 bg-[#1c1a19] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.04, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}Images/Photos/den_trinh.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1a19]/60 via-[#1c1a19]/85 to-[#1c1a19]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm uppercase tracking-[0.4em] text-[#b89b72] font-semibold block mb-4"
          >
            VỊ TRÍ ĐỊA LINH
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide mb-6 leading-tight"
          >
            Tọa Lạc Dưới Chân Núi Yên Tử
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-serif italic text-[#b89b72] text-lg sm:text-xl max-w-3xl mx-auto"
          >
            Thế Đất "Tựa Sơn – Hướng Thủy"
          </motion.p>
          <div className="w-16 h-px bg-[#b89b72] mx-auto mt-8"></div>
        </div>
      </section>

      {/* Map & Info */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-3">
              BẢN ĐỒ DỰ ÁN
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Định Vị Thiên Phúc Vĩnh Hằng Viên
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
            <div className="lg:col-span-8 bg-white border border-[#eaeae1] p-3 min-h-[480px] relative overflow-hidden">
              <iframe
                src="https://maps.google.com/maps?q=21.0606617,106.7481965&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[450px] border-0"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Bản đồ Thiên Phúc Vĩnh Hằng Viên"
              ></iframe>
            </div>

            <div className="lg:col-span-4 bg-[#faf9f6] border border-[#eaeae1] p-8 lg:p-10 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#b89b72] font-semibold font-mono block mb-2">
                    ĐỊA CHỈ DỰ ÁN
                  </span>
                  <p className="font-serif text-lg font-medium text-[#1c1a19] leading-snug">
                    {PROJECT_INFO.address.projectFormatted.map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </p>
                  <p className="text-sm text-[#b89b72] font-mono mt-2">
                    Tọa độ: {PROJECT_INFO.address.coords}
                  </p>
                </div>

                <div className="w-10 h-px bg-[#b89b72]"></div>

                <div>
                  <span className="text-xs uppercase tracking-widest text-[#b89b72] font-semibold font-mono block mb-3">
                    KHOẢNG CÁCH DI CHUYỂN
                  </span>
                  <div className="space-y-3">
                    {[
                      { city: "Từ Hà Nội", time: "110km (~2 giờ)" },
                      { city: "Từ Hải Phòng", time: "40km (~1 giờ)" },
                      { city: "Từ Hạ Long", time: "45km (~30-50 phút)" },
                      { city: "Từ Hải Dương", time: "80km (~1.5 giờ)" }
                    ].map((r, i) => (
                      <div key={i} className="flex justify-between items-center text-xs border-b border-[#eaeae1]/50 pb-2">
                        <span className="text-stone-500 font-light flex items-center gap-1.5">
                          <MapPin className="w-3 h-3 text-[#b89b72]" /> {r.city}
                        </span>
                        <span className="text-[#1c1a19] font-medium font-serif">{r.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 text-xs font-sans font-light text-stone-600 leading-relaxed border-l-2 border-[#b89b72]">
                  Ban quản lý cung cấp dịch vụ đưa đón bằng xe Limousine hạng sang <strong>miễn phí</strong> phục vụ các gia đình tham quan khảo sát.
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <a
                  href={`tel:${PROJECT_INFO.hotlineRaw}`}
                  className="w-full py-3.5 bg-[#1c1a19] text-[#f5f4ed] text-sm tracking-widest uppercase font-bold text-center block hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
                >
                  Đặt xe đưa đón khảo sát
                </a>
                <a
                  href="https://maps.google.com/?q=21.0606617,106.7481965"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-[#b89b72] text-[#b89b72] text-sm tracking-widest uppercase font-bold text-center block hover:bg-[#b89b72] hover:text-white transition-luxury"
                >
                  Mở Google Maps ↗
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Phong Thủy Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#f5f4ed]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <OptimizedImage
              src={`${import.meta.env.BASE_URL}Images/Photos/choi_ngoi_ngam_canh.jpg`}
              alt="Long mạch Yên Tử"
              className="w-full h-full border border-[#eaeae1]"
              aspectRatio="4/3"
            />

            <div>
              <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-3">
                PHONG THỦY ĐẮC ĐỊA
              </span>
              <h3 className="font-serif text-3xl md:text-4xl text-[#1c1a19] font-light tracking-wide leading-tight mb-6">
                Thế Đất<br />
                "Tựa Sơn – Hướng Thủy"
              </h3>
              <div className="w-10 h-px bg-[#b89b72] mb-6"></div>
              <p className="font-sans text-stone-700 font-light text-sm leading-relaxed mb-4">
                <strong>Thiên Phúc Vĩnh Hằng Viên</strong> tọa lạc trên vùng đất phát tích Thiền phái Trúc Lâm, có thế "tựa sơn – hướng thủy": lưng tựa dãy Yên Tử, mặt hướng về vùng hồ nước thanh bình.
              </p>
              <ul className="space-y-3 mb-6">
                {[
                  { t: "Phong thủy đắc địa", d: "Tiêu chuẩn vàng trong phong thủy âm trạch" },
                  { t: "Địa thế cao ráo", d: "Bền vững, trường tồn theo năm tháng" },
                  { t: "Hội tụ linh khí", d: "Mang lại phúc lành cho người đã khuất và bình an cho thế hệ sau" }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b89b72] mt-2 shrink-0"></span>
                    <div>
                      <span className="font-semibold text-[#1c1a19]">{item.t}:</span>{" "}
                      <span className="text-stone-600 font-light">{item.d}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <Link
                to="/san-pham"
                className="inline-flex items-center gap-2 text-xs text-[#b89b72] font-semibold tracking-widest uppercase hover:text-[#1c1a19] transition-colors border-b border-[#b89b72]/40 pb-1"
              >
                Xem sản phẩm mộ phần <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Văn phòng đại diện */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-3">
              VĂN PHÒNG ĐẠI DIỆN
            </span>
            <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl font-light text-[#1c1a19] tracking-wide whitespace-nowrap">
              Văn Phòng Đại Diện Tại Hà Nội
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {PROJECT_INFO.offices.map((off, i) => (
              <div key={i} className="border border-[#eaeae1] bg-[#faf9f6] p-8 hover:border-[#b89b72] transition-luxury text-center">
                <div className="flex flex-col items-center mb-4">
                  <h4 className="font-serif text-2xl text-[#1c1a19] mb-3">{off.city}</h4>
                  <span className="text-xs uppercase tracking-widest text-[#b89b72] font-bold bg-[#b89b72]/10 px-3 py-1.5">
                    {off.label}
                  </span>
                </div>
                <div className="w-12 h-px bg-[#b89b72] mx-auto mb-4"></div>
                <p className="text-sm text-stone-600 font-light leading-relaxed flex items-center justify-center gap-2 text-center">
                  <MapPin className="w-4 h-4 text-[#b89b72] shrink-0" />
                  {off.address}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12 bg-[#1c1a19] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-serif text-3xl md:text-4xl font-light tracking-wide mb-4">
            Sẵn Sàng Khám Phá Địa Linh?
          </h3>
          <p className="text-stone-400 text-sm font-light mb-8">
            Liên hệ ngay để được sắp xếp xe Limousine đưa đón tham quan thực tế miễn phí
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${PROJECT_INFO.hotlineRaw}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#b89b72] text-white text-sm tracking-widest uppercase font-bold hover:bg-white hover:text-[#1c1a19] transition-luxury"
            >
              <Phone className="w-3 h-3" /> Gọi {PROJECT_INFO.hotline}
            </a>
            <Link
              to="/lien-he"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/40 text-white text-sm tracking-widest uppercase font-bold hover:bg-white hover:text-[#1c1a19] transition-luxury"
            >
              Đăng ký tư vấn <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
