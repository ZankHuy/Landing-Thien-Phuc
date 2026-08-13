import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ChevronRight, Award, Leaf, Heart, Compass, Building2, Users } from "lucide-react";
import { PROJECT_INFO } from "../constants";
import { PROJECT_OVERVIEW } from "../data";
import { OptimizedImage } from "../components/OptimizedImage";

export default function AboutPage() {
  const [showAll, setShowAll] = React.useState(false);

  return (
    <>
      {/* Hero của trang */}
      <section className="relative pt-20 pb-24 px-6 lg:px-12 bg-[#1c1a19] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.04, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}Images/Photos/anh_tong_quan.jpg')` }}
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
            GIỚI THIỆU DỰ ÁN
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-4xl sm:text-5xl lg:text-5xl font-light text-white tracking-wide mb-6 leading-tight"
          >
            {PROJECT_INFO.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-serif italic text-[#b89b72] text-lg sm:text-xl max-w-3xl mx-auto"
          >
            {PROJECT_INFO.tagline}
          </motion.p>
          <div className="w-16 h-px bg-[#b89b72] mx-auto mt-8"></div>
        </div>
      </section>

      {/* Giới thiệu chính */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            <div className="lg:col-span-7">
              <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-3">
                VỀ CHÚNG TÔI
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-[#1c1a19] font-light tracking-wide leading-tight mb-6">
                Di Sản Tâm Linh Trường Tồn<br />
                Gìn Giữ Phúc Trạch Muôn Đời
              </h2>
              <div className="w-10 h-px bg-[#b89b72] mb-6"></div>
              <p className="font-sans text-stone-700 font-light text-base leading-relaxed mb-4">
                {PROJECT_OVERVIEW.intro}
              </p>
              <p className="font-sans text-stone-700 font-light text-base leading-relaxed mb-4">
                Tọa lạc dưới chân núi Yên Tử (Quảng Ninh) – nơi được mệnh danh là "đất Phật linh thiêng", gắn với lịch sử dựng nước và phát triển Thiền phái Trúc Lâm Yên Tử – <strong>{PROJECT_INFO.name}</strong> là kiệt tác kết hợp giữa <em>tâm linh – thiên nhiên – dịch vụ chu toàn</em>.
              </p>
              <p className="font-sans text-stone-700 font-light text-base leading-relaxed italic border-l-2 border-[#b89b72]/40 pl-4">
                "Kiến Tạo Không Gian An Nghỉ Thanh Tịnh – Nhân Văn – Trường Tồn"
              </p>
            </div>
            <div className="lg:col-span-5">
              <OptimizedImage
              src={`${import.meta.env.BASE_URL}Images/Photos/cong.jpg`}
              alt="Cổng tam quan Thiên Phúc"
              className="w-full h-full border border-[#eaeae1] shadow-xl"
              aspectRatio="3/4"
            />
            </div>
          </div>

          {/* Sứ mệnh */}
          <div className="bg-[#faf9f6] border border-[#eaeae1] p-8 lg:p-12 mb-20">
            <h3 className="font-serif text-2xl text-[#1c1a19] mb-6 text-center tracking-wide">
              Sứ Mệnh Của Chúng Tôi
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {PROJECT_OVERVIEW.mission.map((m, i) => (
                <div key={i} className="flex items-start gap-4">
                  <span className="w-10 h-10 shrink-0 rounded-full bg-[#b89b72]/10 border border-[#b89b72]/30 flex items-center justify-center font-serif text-lg text-[#b89b72] font-semibold">
                    {i + 1}
                  </span>
                  <p className="text-sm text-stone-700 leading-relaxed font-light">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Chủ đầu tư & Đơn vị phát triển */}
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
              CHỦ ĐẦU TƯ & ĐỐI TÁC
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Uy Tín Từ Những Đơn Vị Hàng Đầu
            </h3>
            <div className="w-12 h-px bg-[#b89b72] mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-[#eaeae1] p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-5 h-5 text-[#b89b72]" />
                <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">CHỦ ĐẦU TƯ</span>
              </div>
              <h4 className="font-serif text-2xl text-[#1c1a19] mb-3">{PROJECT_INFO.investor}</h4>
              <div className="w-10 h-px bg-[#b89b72] mb-4"></div>
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                Đơn vị tiên phong trong lĩnh vực đầu tư bất động sản nghỉ dưỡng và công viên nghĩa trang sinh thái tại Việt Nam, cam kết mang lại giá trị bền vững cho mọi thế hệ.
              </p>
            </div>

            <div className="bg-white border border-[#b89b72]/40 p-8 lg:p-10 relative">
              <span className="absolute -top-3 right-6 bg-[#b89b72] text-white text-xs tracking-[0.2em] font-bold uppercase py-1 px-3 shadow-sm">
                ĐƠN VỊ PHÁT TRIỂN
              </span>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-5 h-5 text-[#b89b72]" />
                <span className="text-xs uppercase tracking-widest text-stone-400 font-mono">ĐẦU TƯ & PHÁT TRIỂN</span>
              </div>
              <h4 className="font-serif text-2xl text-[#1c1a19] mb-3">{PROJECT_INFO.developer}</h4>
              <div className="w-10 h-px bg-[#b89b72] mb-4"></div>
              <p className="text-sm text-stone-600 leading-relaxed font-light">
                Thương hiệu uy tín trong ngành dịch vụ tâm linh, chuyên phát triển các khu công viên nghĩa trang sinh thái theo tiêu chuẩn quốc tế.
              </p>
            </div>
          </div>

          {/* Đối tác danh tiếng */}
          <div className="mt-16">
            <h4 className="text-center text-sm uppercase tracking-widest text-[#b89b72] font-semibold mb-8">
              Đối Tác Danh Tiếng
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["Tập đoàn Sala Garden", "Dịch vụ Tang lễ Hoàng Gia Việt", "Viện Nghiên Cứu Phong Thủy Á Đông", "Công Nghệ Sinh Học Bio-Green"].map((partner, i) => (
                <div
                  key={i}
                  className="bg-white border border-[#eaeae1] p-6 text-center hover:border-[#b89b72] transition-luxury"
                >
                  <Building2 className="w-6 h-6 text-[#b89b72] mx-auto mb-3" />
                  <p className="text-xs font-medium text-stone-700 leading-relaxed">{partner}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Giá trị cốt lõi */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-3">
              GIÁ TRỊ CỐT LÕI
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Tam Giá Trị Dự Án
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Compass, title: "Tâm Linh", desc: "Gắn liền với thiền phái Trúc Lâm Yên Tử, tôn vinh giá trị văn hóa tâm linh ngàn năm." },
              { icon: Leaf, title: "Sinh Thái", desc: "Quy hoạch đồng bộ với thiên nhiên, công nghệ sinh học khép kín, không phát thải." },
              { icon: Heart, title: "Nhân Văn", desc: "Dịch vụ trọn đời 5 sao, đồng hành cùng gia tộc qua nhiều thế hệ." }
            ].map((v, i) => (
              <div key={i} className="text-center p-6 border border-[#eaeae1] bg-[#faf9f6] hover:border-[#b89b72] transition-luxury">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#b89b72]/10 border border-[#b89b72]/30 flex items-center justify-center">
                  <v.icon className="w-7 h-7 text-[#b89b72]" />
                </div>
                <h4 className="font-serif text-2xl text-[#1c1a19] mb-3">{v.title}</h4>
                <p className="text-sm text-stone-600 font-light leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <a
              href={`tel:${PROJECT_INFO.hotlineRaw}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#b89b72] text-white text-sm tracking-widest uppercase font-bold hover:bg-[#1c1a19] transition-luxury"
            >
              Liên hệ tư vấn <ChevronRight className="w-3 h-3" />
            </a>
          </div>
        </motion.div>
      </section>
    </>
  );
}
