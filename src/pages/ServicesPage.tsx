import React, { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Check, Phone, ChevronRight, ExternalLink } from "lucide-react";
import { PROJECT_INFO } from "../constants";
import { SERVICES } from "../data";
import { Modal, ServiceModalContent } from "../components/Modal";

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 pb-24 px-6 lg:px-12 bg-[#1c1a19] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.04, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}Images/Photos/nha_dich_vu.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1a19]/60 via-[#1c1a19]/85 to-[#1c1a19]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="text-sm uppercase tracking-[0.4em] text-[#b89b72] font-semibold block mb-4">
            DỊCH VỤ TRỌN ĐỜI 5 SAO
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide mb-6 leading-tight">
            Quản Gia Tận Tâm – An Tâm Tuyệt Đối
          </h1>
          <p className="font-serif italic text-[#b89b72] text-lg sm:text-xl max-w-3xl mx-auto">
            Đồng hành cùng gia tộc từ lễ tang đến trọn đời, theo đúng chuẩn mực resort 5 sao
          </p>
          <div className="w-16 h-px bg-[#b89b72] mx-auto mt-8"></div>
        </div>
      </section>

      {/* Services grid */}
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
              HỆ THỐNG DỊCH VỤ
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              6 Hạng Mục Dịch Vụ Toàn Diện
            </h3>
            <p className="text-sm text-stone-500 font-light mt-3">
              Từ tang lễ trọn gói, trông nom hương khói đến tư vấn phong thủy – tất cả vì sự an yên trọn vẹn của gia tộc
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                onClick={() => setSelectedService(s)}
                className="border border-[#eaeae1] bg-[#faf9f6] p-8 hover:border-[#b89b72] hover:shadow-lg transition-luxury flex flex-col cursor-pointer"
              >
                <span className="text-4xl mb-3">{s.icon}</span>
                <span className="text-xs uppercase tracking-widest text-[#b89b72] font-semibold font-mono mb-2">
                  {s.english}
                </span>
                <h4 className="font-serif text-xl text-[#1c1a19] mb-4 tracking-wide">{s.title}</h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed mb-5 flex-1">{s.desc}</p>
                <ul className="border-t border-[#eaeae1] pt-4 space-y-2">
                  {s.features.map((f, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-light">
                      <Check className="w-3 h-3 text-[#b89b72] mt-0.5 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Service Modal */}
          <Modal isOpen={!!selectedService} onClose={() => setSelectedService(null)}>
            {selectedService && (
              <ServiceModalContent
                icon={selectedService.icon}
                english={selectedService.english}
                title={selectedService.title}
                desc={selectedService.desc}
                features={selectedService.features}
              />
            )}
          </Modal>
        </motion.div>
      </section>

      {/* Process timeline */}
      <section className="py-24 px-6 lg:px-12 bg-[#f5f4ed]/50">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-3">
              QUY TRÌNH ĐÓN TIẾP
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              4 Bước Đồng Hành Cùng Gia Tộc
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { n: "01", t: "Tiếp Nhận", d: "Liên hệ Hotline hoặc đăng ký tư vấn để được phục vụ 24/7." },
              { n: "02", t: "Tư Vấn", d: "Chuyên gia phong thủy và quản gia cấp cao hỗ trợ lựa chọn sản phẩm phù hợp." },
              { n: "03", t: "Tham Quan", d: "Sắp xếp xe Limousine đưa đón miễn phí tham quan dự án thực tế." },
              { n: "04", t: "Hoàn Tất", d: "Ký hợp đồng, hỗ trợ thủ tục pháp lý, bàn giao sổ hồng và bắt đầu dịch vụ trọn đời." }
            ].map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#b89b72]/10 border-2 border-[#b89b72] flex items-center justify-center">
                  <span className="font-serif text-xl text-[#b89b72] font-semibold">{step.n}</span>
                </div>
                <h4 className="font-serif text-lg text-[#1c1a19] mb-2">{step.t}</h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">{step.d}</p>
                {i < 3 && (
                  <span className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-[#eaeae1]" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Testimonials placeholder */}
      <section className="py-24 px-6 lg:px-12 bg-white border-t border-[#eaeae1]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-3">
              CAM KẾT CỦA CHÚNG TÔI
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              An Tâm Tuyệt Đối
            </h3>
          </div>

          <div className="bg-[#faf9f6] border-l-4 border-[#b89b72] p-8 lg:p-12 italic">
            <p className="font-serif text-xl md:text-2xl text-stone-700 leading-relaxed mb-6">
              "Chúng tôi cam kết mọi dịch vụ đều được thực hiện với sự tôn nghiêm, chu toàn và bảo mật tuyệt đối. Đội ngũ quản gia chuyên nghiệp đồng hành cùng gia tộc 24/7, đảm bảo mọi tâm nguyện đều được thực hiện trọn vẹn."
            </p>
            <p className="text-xs text-[#b89b72] font-semibold tracking-widest uppercase">
              — Tập thể Ban Quản Lý Thiên Phúc Vĩnh Hằng Viên
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              { v: "100%", l: "Khách hàng hài lòng về dịch vụ chăm sóc" },
              { v: "24/7", l: "Hỗ trợ tư vấn mọi lúc" },
              { v: "100%", l: "Bảo mật thông tin cá nhân" }
            ].map((s, i) => (
              <div key={i} className="text-center py-6 border-t border-[#eaeae1]">
                <span className="block font-serif text-3xl text-[#b89b72] font-semibold mb-1">{s.v}</span>
                <span className="text-xs text-stone-600">{s.l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 lg:px-12 bg-[#1c1a19] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-serif text-3xl md:text-4xl font-light tracking-wide mb-4">
            Tìm Hiểu Chi Tiết Về Các Dịch Vụ?
          </h3>
          <p className="text-stone-400 text-sm font-light mb-8">
            Quản gia của chúng tôi sẵn sàng tư vấn chi tiết cho gia đình bạn
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${PROJECT_INFO.hotlineRaw}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#b89b72] text-white text-sm tracking-widest uppercase font-bold hover:bg-white hover:text-[#1c1a19] transition-luxury"
            >
              <Phone className="w-3 h-3" /> Gọi {PROJECT_INFO.hotline}
            </a>
            <Link
              to="/lien-he"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-white/40 text-white text-sm tracking-widest uppercase font-bold hover:bg-white hover:text-[#1c1a19] transition-luxury"
            >
              Đăng ký tư vấn <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
