import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Check, Phone, ChevronRight } from "lucide-react";
import { PROJECT_INFO, PRICE_TABLE } from "../constants";

type TabFilter = "all" | "don" | "doi" | "giatoc" | "daigiatoc";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<TabFilter>("all");

  const filteredProducts = PRICE_TABLE.filter((p) => {
    if (activeTab === "all") return true;
    if (activeTab === "don") return p.code === "DON";
    if (activeTab === "doi") return p.code === "DOI";
    if (activeTab === "giatoc") return p.code === "GIATOC";
    if (activeTab === "daigiatoc") return p.code === "DAIGIATOC";
    return true;
  });

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
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}Images/Photos/8.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1a19]/60 via-[#1c1a19]/85 to-[#1c1a19]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="text-sm uppercase tracking-[0.4em] text-[#b89b72] font-semibold block mb-4">
            BỘ SƯU TẬP DI SẢN
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide mb-6 leading-tight">
            Khuôn Viên Vĩnh Hằng Giới Hạn
          </h1>
          <p className="font-serif italic text-[#b89b72] text-lg sm:text-xl max-w-3xl mx-auto">
            Sản phẩm chế tác cao cấp dành riêng cho từng quy mô và ước vọng dòng họ
          </p>
          <div className="w-16 h-px bg-[#b89b72] mx-auto mt-8"></div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {[
              { id: "all" as TabFilter, label: "Tất cả sản phẩm" },
              { id: "don" as TabFilter, label: "Mộ Đơn" },
              { id: "doi" as TabFilter, label: "Mộ Đôi" },
              { id: "giatoc" as TabFilter, label: "Mộ Gia Tộc" },
              { id: "daigiatoc" as TabFilter, label: "Mộ Đại Gia Tộc" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-5 py-2.5 text-xs tracking-widest uppercase transition-luxury font-medium border ${
                  activeTab === tab.id
                    ? "bg-[#1c1a19] text-white border-[#1c1a19]"
                    : "bg-transparent text-stone-500 border-stone-200 hover:text-stone-800 hover:border-stone-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.code}
                className={`group border p-5 flex flex-col justify-between transition-luxury shadow-sm hover:shadow-md ${
                  p.featured
                    ? "border-[#b89b72]/40 bg-white relative hover:border-[#b89b72]"
                    : "border-[#eaeae1] bg-[#faf9f6] hover:border-[#b89b72]"
                }`}
              >
                {p.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#b89b72] text-white text-xs tracking-[0.2em] font-bold uppercase py-1 px-3 z-10 shadow-sm">
                    ƯU TIÊN LỰA CHỌN
                  </span>
                )}
                <div>
                  <div className="aspect-[4/3] overflow-hidden mb-4 bg-stone-200 border border-[#eaeae1] relative">
                    <img
                      src={`${import.meta.env.BASE_URL}Images/Photos/${p.image}`}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-2 left-2 bg-[#1c1a19]/80 backdrop-blur-sm text-white text-[10px] tracking-[0.15em] font-bold uppercase py-1 px-2">
                      {p.ratio}
                    </span>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] font-mono tracking-widest text-[#b89b72] uppercase font-bold">
                      {p.code}
                    </span>
                  </div>
                  <h4 className="font-serif text-xl font-light text-[#1c1a19] tracking-wide mb-2">{p.name}</h4>
                  <div className="w-6 h-px bg-[#b89b72] my-3"></div>
                  <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase tracking-widest">Diện tích</span>
                      <span className="text-[#1c1a19] font-serif font-medium">{p.area}</span>
                    </div>
                    <div>
                      <span className="text-stone-400 block text-[10px] uppercase tracking-widest">Số lượng</span>
                      <span className="text-[#1c1a19] font-serif font-medium">{p.quantity}</span>
                    </div>
                  </div>
                  <p className="font-sans text-stone-500 font-light text-xs leading-relaxed mb-4">{p.desc}</p>
                  <ul className="text-xs text-stone-600 flex flex-col gap-1.5">
                    {p.features.map((f, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3 h-3 text-[#b89b72] shrink-0 mt-0.5" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 pt-4 border-t border-[#eaeae1] flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 font-mono">BÀN GIAO VĨNH VIỄN</span>
                  <Link
                    to="/lien-he"
                    className={`text-[11px] font-semibold uppercase tracking-widest transition-colors ${
                      p.featured
                        ? "text-[#b89b72] hover:text-[#1c1a19]"
                        : "text-[#1c1a19] hover:text-[#b89b72]"
                    }`}
                  >
                    Đăng ký →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Pricing note + CTA */}
      <section className="py-16 px-6 lg:px-12 bg-[#faf9f6] border-t border-[#eaeae1]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-3">
            BẢNG GIÁ NIÊM YẾT
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-[#1c1a19] font-light mb-4">
            Nhận Báo Giá Chi Tiết & Ưu Đãi 10 Suất Ngoại Giao
          </h3>
          <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
            Đặc biệt, ưu đãi <strong className="text-[#b89b72]">10 suất ngoại giao giá tốt nhất</strong> dành cho khách hàng đăng ký sớm. Mức giá mộ phần phụ thuộc vào vị trí, hướng và diện tích cụ thể.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${PROJECT_INFO.hotlineRaw}`}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#1c1a19] text-white text-sm tracking-widest uppercase font-bold hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
            >
              <Phone className="w-3 h-3" /> Gọi {PROJECT_INFO.hotline}
            </a>
            <Link
              to="/lien-he"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-[#b89b72] text-[#b89b72] text-sm tracking-widest uppercase font-bold hover:bg-[#b89b72] hover:text-white transition-luxury"
            >
              Yêu cầu báo giá <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Why invest */}
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
              TẠI SAO CHỌN THIÊN PHÚC
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide">
              Lợi Ích Khi Sở Hữu
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { t: "Pháp Lý Minh Bạch", d: "Giấy chứng nhận quyền sử dụng lâu dài, an tâm cho nhiều thế hệ. Không lo quy hoạch, di dời." },
              { t: "Phong Thủy Đắc Địa", d: "Được tư vấn bởi Hội Phong Thủy Á Đông, vị trí đắc địa tụ khí tụ tài cho dòng họ." },
              { t: "Dịch Vụ Trọn Đời", d: "Trông nom, hương khói, chăm sóc 24/7. Con cháu yên tâm dù ở bất kỳ đâu." }
            ].map((b, i) => (
              <div key={i} className="border-l-2 border-[#b89b72] pl-6 py-2">
                <h4 className="font-serif text-xl text-[#1c1a19] mb-2">{b.t}</h4>
                <p className="text-xs text-stone-600 font-light leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}
