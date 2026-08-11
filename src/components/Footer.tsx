import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { PROJECT_INFO, NAV_ITEMS } from "../constants";

export function Footer() {
  return (
    <footer className="bg-[#1c1a19] text-white py-16 px-6 lg:px-12 border-t border-[#b89b72]/20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-stone-800">
        {/* Brand */}
        <div className="space-y-4">
          <Link to="/" className="inline-block">
            <img
              src={`${import.meta.env.BASE_URL}Images/Logo/TPVHV_horizontal.png`}
              alt="Thiên Phúc Vĩnh Hằng Viên Logo"
              className="h-12 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-luxury"
            />
          </Link>
          <p className="text-xs text-stone-400 font-light leading-relaxed mt-2">
            Kiến tạo di sản tâm linh đỉnh cao, gìn giữ phúc trạch thiên niên vạn đại cho dòng họ.
          </p>
          <p className="text-sm text-stone-500 mt-3 leading-relaxed">
            <span className="text-[#b89b72] font-semibold">Chủ đầu tư:</span> {PROJECT_INFO.investor}
            <br />
            <span className="text-[#b89b72] font-semibold">Phát triển:</span> {PROJECT_INFO.developer}
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h5 className="text-sm uppercase tracking-widest text-[#b89b72] font-semibold mb-4">DANH MỤC</h5>
          <ul className="text-xs text-stone-400 font-light space-y-2.5">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <Link to={item.path} className="hover:text-[#b89b72] transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Office */}
        <div>
          <h5 className="text-sm uppercase tracking-widest text-[#b89b72] font-semibold mb-4">VĂN PHÒNG ĐẠI DIỆN</h5>
          <ul className="text-xs text-stone-400 font-light space-y-3 leading-relaxed">
            <li className="flex items-start gap-2">
              <MapPin className="w-3 h-3 text-[#b89b72] mt-1 shrink-0" />
              <span>
                <span className="text-white font-medium block">Hà Nội</span>
                {PROJECT_INFO.address.hanoi}
              </span>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-sm uppercase tracking-widest text-[#b89b72] font-semibold mb-4">LIÊN HỆ TƯ VẤN</h5>
          <ul className="text-xs text-stone-400 font-light space-y-3 leading-relaxed">
            <li className="flex items-start gap-2">
              <Phone className="w-3 h-3 text-[#b89b72] mt-1 shrink-0" />
              <span>
                <span className="text-white/80 font-medium block text-sm uppercase tracking-wider">Hotline</span>
                <a href={`tel:${PROJECT_INFO.hotlineRaw}`} className="text-base text-white font-serif font-medium hover:text-[#b89b72] transition-colors">
                  {PROJECT_INFO.hotline}
                </a>
              </span>
            </li>
            <li className="pt-2">
              <Link
                to="/lien-he"
                className="inline-block w-full text-center px-4 py-3 bg-[#b89b72] text-white text-sm tracking-widest uppercase font-bold hover:bg-white hover:text-[#1c1a19] transition-luxury"
              >
                Đăng ký tư vấn →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-stone-500 gap-4">
        <p>© {new Date().getFullYear()} Thiên Phúc Vĩnh Hằng Viên. All rights reserved.</p>
        <div className="flex gap-6 uppercase tracking-widest">
          <Link to="/lien-he" className="hover:text-white">Điều khoản bảo mật</Link>
          <Link to="/gioi-thieu" className="hover:text-white">Di sản kế thừa</Link>
          <a href={`tel:${PROJECT_INFO.hotlineRaw}`} className="hover:text-white">Hotline 24/7</a>
        </div>
      </div>
    </footer>
  );
}
