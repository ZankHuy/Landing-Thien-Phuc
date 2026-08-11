import React, { useState } from "react";
import { motion } from "motion/react";
import { Phone, Mail, MapPin, User, Calendar, MessageSquare, CheckCircle, Clock } from "lucide-react";
import { PROJECT_INFO } from "../constants";

// Google Form entry IDs
const GOOGLE_FORM_ENTRY_IDS = {
  fullName: "entry.1788567409",
  phone: "entry.923084852",
  email: "entry.1689035335",
  date: "entry.978461335",
  message: "entry.542117420"
};

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScfJPviC_ff6tEaFPwCSsfvrTXU7HN7NHGXLbNCpjBx23LWKA/formResponse";

export default function ContactPage() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    date: "",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Vui lòng nhập họ tên";
    if (!form.phone.trim()) {
      e.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9+ ]{9,15}$/.test(form.phone.trim())) {
      e.phone = "Số điện thoại không hợp lệ";
    }
    if (!form.email.trim()) {
      e.email = "Vui lòng nhập email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      e.email = "Email không hợp lệ";
    }
    if (!form.message.trim()) e.message = "Vui lòng nhập nội dung cần tư vấn";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("[Contact] Submission:", { ...form, at: new Date().toISOString() });
      setSubmitted(true);
    }
  };

  const handleGoogleFormSubmit = () => {
    if (!validate()) return;
    
    const formData = new FormData();
    formData.append(GOOGLE_FORM_ENTRY_IDS.fullName, form.fullName);
    formData.append(GOOGLE_FORM_ENTRY_IDS.phone, form.phone);
    formData.append(GOOGLE_FORM_ENTRY_IDS.email, form.email);
    formData.append(GOOGLE_FORM_ENTRY_IDS.date, form.date);
    formData.append(GOOGLE_FORM_ENTRY_IDS.message, form.message);

    // Tạo iframe ẩn để submit
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.name = "google-form-target";
    document.body.appendChild(iframe);

    // Tạo form ẩn và submit
    const hiddenForm = document.createElement("form");
    hiddenForm.action = GOOGLE_FORM_URL;
    hiddenForm.method = "POST";
    hiddenForm.target = "google-form-target";
    hiddenForm.style.display = "none";

    for (const [key, value] of formData.entries()) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = String(value);
      hiddenForm.appendChild(input);
    }

    document.body.appendChild(hiddenForm);
    hiddenForm.submit();

    // Cleanup và hiện thông báo
    setTimeout(() => {
      document.body.removeChild(hiddenForm);
      document.body.removeChild(iframe);
      console.log("[Contact] Google Form submitted:", { ...form, at: new Date().toISOString() });
      setSubmitted(true);
    }, 1000);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative pt-20 pb-24 px-6 lg:px-12 bg-[#1c1a19] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.04, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 0.55 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${import.meta.env.BASE_URL}Images/Photos/nha_hang_thuy_ta.jpg')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1c1a19]/60 via-[#1c1a19]/85 to-[#1c1a19]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="text-sm uppercase tracking-[0.4em] text-[#b89b72] font-semibold block mb-4">
            LIÊN HỆ TƯ VẤN
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-wide mb-6 leading-tight">
            Đồng Hành Cùng Gia Tộc
          </h1>
          <p className="font-serif italic text-[#b89b72] text-lg sm:text-xl max-w-3xl mx-auto">
            Gọi ngay Hotline <a href={`tel:${PROJECT_INFO.hotlineRaw}`} className="underline underline-offset-4 hover:text-white">{PROJECT_INFO.hotline}</a> hoặc để lại thông tin để được tư vấn trong 15 phút
          </p>
          <div className="w-16 h-px bg-[#b89b72] mx-auto mt-8"></div>
        </div>
      </section>

      {/* Contact options */}
      <section className="py-16 px-6 lg:px-12 bg-[#f5f4ed] border-b border-[#eaeae1]">
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { icon: Phone, label: "Hotline", value: PROJECT_INFO.hotline, href: `tel:${PROJECT_INFO.hotlineRaw}`, note: "Hỗ trợ 24/7" },
            { icon: MessageSquare, label: "Zalo", value: PROJECT_INFO.hotline, href: `https://zalo.me/${PROJECT_INFO.zaloPhone}`, note: "Chat trực tiếp" }
          ].map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="bg-white border border-[#eaeae1] p-6 hover:border-[#b89b72] hover:shadow-lg transition-luxury text-center group"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#b89b72]/10 border border-[#b89b72]/30 flex items-center justify-center group-hover:bg-[#b89b72] group-hover:text-white transition-luxury">
                <c.icon className="w-5 h-5 text-[#b89b72] group-hover:text-white transition-colors" />
              </div>
              <span className="text-sm uppercase tracking-widest text-stone-400 font-mono block mb-1">{c.label}</span>
              <span className="font-serif text-lg text-[#1c1a19] font-semibold block mb-1">{c.value}</span>
              <span className="text-sm text-stone-500 italic">{c.note}</span>
            </a>
          ))}
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-24 px-6 lg:px-12 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left - Form */}
          <div className="lg:col-span-7">
            <span className="text-sm uppercase tracking-[0.3em] text-[#b89b72] font-semibold block mb-3">
              GỬI YÊU CẦU TƯ VẤN
            </span>
            <h3 className="font-serif text-3xl md:text-4xl font-light text-[#1c1a19] tracking-wide mb-4">
              Để Lại Thông Tin
            </h3>
            <p className="text-sm text-stone-500 font-light mb-8">
              Chúng tôi sẽ phản hồi trong vòng <strong>15 phút</strong> trong giờ làm việc hoặc sớm nhất vào đầu giờ sáng hôm sau.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#f5f4ed] border border-[#b89b72]/30 p-10 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#b89b72]/15 border border-[#b89b72]/30 flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[#b89b72]" />
                </div>
                <h4 className="font-serif text-2xl text-[#1c1a19] mb-3">Gửi Yêu Cầu Thành Công</h4>
                <p className="text-sm text-stone-600 font-light mb-6">
                  Kính chào <strong>{form.fullName}</strong>! Yêu cầu tư vấn của Quý khách đã được tiếp nhận. Chúng tôi sẽ liên hệ trong ít phút tới.
                </p>
                <div className="space-y-3">
                  <a
                    href={`tel:${PROJECT_INFO.hotlineRaw}`}
                    className="block w-full px-6 py-3 bg-[#1c1a19] text-white text-xs tracking-widest uppercase font-bold hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
                  >
                    Gọi ngay {PROJECT_INFO.hotline}
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ fullName: "", phone: "", email: "", date: "", message: "" });
                    }}
                    className="w-full px-6 py-3 border border-[#eaeae1] text-stone-500 text-xs tracking-widest uppercase font-bold hover:text-stone-800 transition"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 bg-[#faf9f6] border border-[#eaeae1] p-6 lg:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
                      Họ và tên *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#b89b72]">
                        <User className="w-3.5 h-3.5" />
                      </span>
                      <input
                        type="text"
                        placeholder="Nhập họ tên đầy đủ"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className={`w-full pl-9 pr-4 py-3 bg-white border text-xs focus:outline-none focus:border-[#b89b72] transition-colors ${errors.fullName ? "border-red-400" : "border-[#eaeae1]"}`}
                      />
                    </div>
                    {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
                      Số điện thoại *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#b89b72]">
                        <Phone className="w-3.5 h-3.5" />
                      </span>
                      <input
                        type="text"
                        placeholder="Số điện thoại di động"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={`w-full pl-9 pr-4 py-3 bg-white border text-xs focus:outline-none focus:border-[#b89b72] transition-colors ${errors.phone ? "border-red-400" : "border-[#eaeae1]"}`}
                      />
                    </div>
                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
                      Email *
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#b89b72]">
                        <Mail className="w-3.5 h-3.5" />
                      </span>
                      <input
                        type="email"
                        placeholder="example@gmail.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={`w-full pl-9 pr-4 py-3 bg-white border text-xs focus:outline-none focus:border-[#b89b72] transition-colors ${errors.email ? "border-red-400" : "border-[#eaeae1]"}`}
                      />
                    </div>
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
                      Ngày hẹn tham quan (không bắt buộc)
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#b89b72]">
                        <Calendar className="w-3.5 h-3.5" />
                      </span>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                        className="w-full pl-9 pr-4 py-3 bg-white border border-[#eaeae1] text-xs focus:outline-none focus:border-[#b89b72] transition-colors"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm uppercase tracking-widest text-[#2c2a29] font-medium mb-2">
                    Nội dung cần tư vấn *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Vui lòng chia sẻ nhu cầu của Quý khách (mộ đơn, mộ đôi, mộ gia tộc, dịch vụ tang lễ, phong thủy...)"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border text-xs focus:outline-none focus:border-[#b89b72] transition-colors resize-none ${errors.message ? "border-red-400" : "border-[#eaeae1]"}`}
                  />
                  {errors.message && <p className="text-sm text-red-500 mt-1">{errors.message}</p>}
                </div>
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-stone-400 font-light max-w-sm">
                    * Thông tin của Quý khách được bảo mật tuyệt đối theo chính sách bảo mật của chúng tôi.
                  </p>
                  <button
                    type="button"
                    onClick={handleGoogleFormSubmit}
                    className="w-full sm:w-auto px-10 py-4 bg-[#1c1a19] text-white text-sm tracking-widest uppercase font-bold hover:bg-[#b89b72] hover:text-[#1c1a19] transition-luxury"
                  >
                    Gửi yêu cầu tư vấn
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right - Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#f5f4ed] p-8 border-l-4 border-[#b89b72]">
              <h4 className="font-serif text-2xl text-[#1c1a19] mb-3">Địa Chỉ Dự Án</h4>
              <p className="text-sm text-stone-700 font-light leading-relaxed flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#b89b72] mt-0.5 shrink-0" />
                <span>{PROJECT_INFO.address.project}</span>
              </p>
              <p className="text-sm text-[#b89b72] font-mono mt-3">
                Tọa độ: {PROJECT_INFO.address.coords}
              </p>
            </div>

            <div className="bg-[#1c1a19] text-white p-8">
              <span className="text-sm uppercase tracking-widest text-[#b89b72] font-semibold block mb-4">
                GIỜ MỞ CỬA
              </span>
              <div className="space-y-2 text-sm font-light">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#b89b72]" />
                  <span className="text-white/80">Hỗ trợ 24/7</span>
                </div>
                <div className="flex justify-between border-b border-stone-700 pb-2">
                  <span className="text-stone-400">Thứ 2 - Thứ 6</span>
                  <span>8:00 - 20:00</span>
                </div>
                <div className="flex justify-between border-b border-stone-700 pb-2">
                  <span className="text-stone-400">Thứ 7</span>
                  <span>8:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-400">Chủ Nhật</span>
                  <span>9:00 - 17:00</span>
                </div>
              </div>
              <p className="text-sm text-stone-400 italic mt-4">
                * Hỗ trợ khẩn cấp 24/7 qua Hotline
              </p>
            </div>

            <div className="border border-[#eaeae1] p-8">
              <h4 className="font-serif text-xl text-[#1c1a19] mb-4">Văn Phòng Đại Diện</h4>
              <ul className="space-y-4 text-sm font-light">
                {[
                  { city: "Hà Nội", addr: PROJECT_INFO.address.hanoi }
                ].map((o, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b89b72] mt-2 shrink-0" />
                    <div>
                      <span className="block font-medium text-[#1c1a19] text-xs uppercase tracking-wider mb-0.5">{o.city}</span>
                      <span className="text-stone-600">{o.addr}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Map */}
      <section className="bg-[#faf9f6] border-t border-[#eaeae1]">
        <iframe
          src="https://maps.google.com/maps?q=21.0606617,106.7481965&t=&z=15&ie=UTF8&iwloc=&output=embed"
          className="w-full h-[450px] border-0"
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bản đồ Thiên Phúc Vĩnh Hằng Viên"
        ></iframe>
      </section>
    </>
  );
}
