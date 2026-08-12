import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Compass, Building, Waves, Utensils, Car, Heart, ChevronRight, Trees, Map } from "lucide-react";
import { SHOWCASE_ITEMS } from "../data";
import { PROJECT_INFO, FACILITIES, STATS } from "../constants";
import { OptimizedImage } from "../components/OptimizedImage";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Temple: Compass,
  Building,
  Heart,
  Utensils,
  Waves,
  Car
};

export default function MasterPlanPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 pb-24 px-6 lg:px-12 bg-[#1c1a19] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.04, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0.5 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}Images/Photos/tong_quan.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1a19]/60 via-[#1c1a19]/85 to-[#1c1a19]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="text-sm uppercase tracking-[0.4em] text-[#b89b72] font-semibold block mb-4">
            QUY HOẠCH TỔNG THỂ 1/500
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide mb-6 leading-tight">
            Tuyệt Tác Quy Hoạch Sinh Thái
          </h1>
          <p className="font-serif italic text-[#b89b72] text-lg sm:text-xl max-w-3xl mx-auto">
            Hài hòa giữa kiến trúc và thiên nhiên – một "Hồn Việt – Nét Trần – Tinh thần thiền Trúc Lâm"
          </p>
          <div className="w-16 h-px bg-[#b89b72] mx-auto mt-8"></div>
        </div>
      </section>

      {/* Stats Summary */}
      <section className="py-16 px-6 lg:px-12 bg-[#f5f4ed] border-b border-[#eaeae1]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <div key={i} className="text-center">
              <span className="block font-serif text-3xl md:text-4xl text-[#b89b72] mb-1">{s.value}</span>
              <span className="block text-sm uppercase tracking-widest text-[#1c1a19] font-semibold mb-1">{s.label}</span>
              <span className="block text-sm text-stone-500 font-light italic">{s.desc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Master Plan Hero */}
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
              BẢN ĐỒ PHÂN KHU CHỨC NĂNG
            </span>
            <h2 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Quy Hoạch 32 Ha Giai Đoạn 1
            </h2>
          </div>

          <OptimizedImage
            src={`${import.meta.env.BASE_URL}Images/Photos/tong_quan_2.jpg`}
            alt="Bản đồ quy hoạch tổng thể"
            className="w-full h-full"
            aspectRatio="16/9"
          />
          <p className="text-center text-xs text-stone-500 italic mt-4">
            Phối cảnh tổng thể dự án Thiên Phúc Vĩnh Hằng Viên (góc nhìn từ đại ngàn Yên Tử)
          </p>
        </motion.div>
      </section>

      {/* Facilities Grid */}
      <section className="py-24 px-6 lg:px-12 bg-[#f5f4ed]/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-3 block">
              HỆ THỐNG TIỆN ÍCH 5 SAO
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Công Trình & Dịch Vụ Đồng Bộ
            </h3>
            <div className="w-12 h-px bg-[#b89b72] mt-4 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACILITIES.map((fac) => {
              const Icon = ICON_MAP[fac.icon] ?? Compass;
              return (
                <div key={fac.id} className="bg-white border border-[#eaeae1] p-6 hover:shadow-lg hover:border-[#b89b72]/40 transition-luxury">
                  <div className="w-12 h-12 rounded-full bg-[#b89b72]/10 flex items-center justify-center mb-4 border border-[#b89b72]/20">
                    <Icon className="w-5 h-5 text-[#b89b72]" />
                  </div>
                  <h4 className="font-serif text-lg text-[#1c1a19] mb-2 tracking-wide">{fac.title}</h4>
                  <p className="text-xs text-stone-600 font-light leading-relaxed">{fac.desc}</p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Showcase landscape */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold mb-3 block">
              CẢNH SẮC & KIẾN TRÚC
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Khám Phá Từng Khu Vực
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SHOWCASE_ITEMS.map((item) => (
              <div key={item.id} className="group bg-[#faf9f6] border border-[#eaeae1] overflow-hidden hover:shadow-xl transition-luxury">
                <div className="aspect-[4/3] overflow-hidden bg-stone-200">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs uppercase tracking-widest text-[#b89b72] font-semibold block mb-2">
                    {item.tag}
                  </span>
                  <h4 className="font-serif text-lg text-[#1c1a19] tracking-wide mb-2">{item.title}</h4>
                  <p className="text-xs text-stone-600 font-light leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Design principles */}
      <section className="py-24 px-6 lg:px-12 bg-[#f5f4ed]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-3">
              NGUYÊN TẮC THIẾT KẾ
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Triết Lý Quy Hoạch
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Phong Thủy Chủ Đạo", desc: "Tất cả các khu vực đều được phê duyệt theo Hội Phong Thủy Á Đông – bảo đảm vượng khí cho từng khuôn viên.", icon: Compass },
              { title: "Sinh Thái Bền Vững", desc: "Công nghệ sinh học khép kín, cây xanh tự nhiên Nhật Bản, không phát thải ra môi trường.", icon: Trees },
              { title: "Kiến Trúc Hài Hòa", desc: "Mái ngói cổ kính, đá Granite tự nhiên, gỗ quý – kết tinh giữa truyền thống và hiện đại.", icon: Building }
            ].map((p, i) => (
              <div key={i} className="bg-white border border-[#eaeae1] p-8 hover:border-[#b89b72] transition-luxury text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#b89b72]/10 border border-[#b89b72]/30 flex items-center justify-center">
                  <p.icon className="w-6 h-6 text-[#b89b72]" />
                </div>
                <h4 className="font-serif text-lg text-[#1c1a19] mb-3">{p.title}</h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/san-pham"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1c1a19] text-white text-sm tracking-widest uppercase font-bold hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
            >
              Khám phá sản phẩm mộ phần <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}
