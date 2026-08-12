export const PROJECT_INFO = {
  name: "Thiên Phúc Vĩnh Hằng Viên",
  tagline: "Công Viên Nghĩa Trang Sinh Thái Chuẩn Mực – An Nghỉ Thanh Tịnh, Nhân Văn, Trường Tồn",
  hotline: "0911.561.369",
  hotlineRaw: "0911561369",
  zaloPhone: "0911561369",
  address: {
    project: "Đường Bãi Dài, Phường Yên Tử, Thành phố Uông Bí, Tỉnh Quảng Ninh, Việt Nam",
    projectFormatted: ["Đường Bãi Dài, Phường Yên Tử", "Thành phố Uông Bí", "Tỉnh Quảng Ninh", "Việt Nam"],
    coords: "21.0606617, 106.7481965"
  },
  offices: [
    {
      city: "Hà Nội",
      address: "Tầng 4 Toà nhà Diamond Flower Tower, 48 Lê Văn Lương, P. Nhân Chính, Q. Thanh Xuân, TP. Hà Nội",
      label: "Văn phòng đại diện"
    }
  ],
  investor: "Công Ty Cổ Phần Long Hải Quảng Ninh",
  developer: "Công Ty Cổ Phần Thương Mại & Dịch Vụ Sala Garden",
  scale: "Giai đoạn 1: 32 ha (Tổng quy hoạch nhiều giai đoạn)",
  productTypes: "Mộ đơn · Mộ đôi · Mộ gia tộc"
};

export const STATS = [
  { value: "32 ha", label: "Quy mô giai đoạn 1", desc: "Quy hoạch đồng bộ sinh thái" },
  { value: "7.763", label: "Mộ đơn & đôi", desc: "Giải pháp an nghỉ phổ thông" },
  { value: "1.436", label: "Mộ gia tộc", desc: "Khuôn viên ấm cúng 4-12 mộ phần" },
  { value: "174", label: "Mộ đại gia tộc", desc: "Cực hiếm - Vị thế đắc địa" }
];

export const FACILITIES = [
  { id: "f1", icon: "Temple", title: "Đền Trình & Nhà Nguyện", desc: "Không gian tâm linh trang nghiêm, mái ngói cổ kính tọa lạc ngay trên long mạch dự án." },
  { id: "f2", icon: "Building", title: "Nhà Điều Hành", desc: "Trung tâm quản lý vận hành chuyên nghiệp, hỗ trợ gia chủ thủ tục pháp lý nhanh chóng." },
  { id: "f3", icon: "Heart", title: "Nhà Tang Lễ & Hỏa Táng", desc: "Dịch vụ tang lễ trọn gói chuẩn 5 sao, nhà để tro và phòng chờ riêng tư." },
  { id: "f4", icon: "Utensils", title: "Nhà Hàng Thủy Tạ", desc: "Tiệc chay, trà đạo Á Đông với tầm nhìn ra hồ điều hòa thanh tịnh." },
  { id: "f5", icon: "Waves", title: "Hồ Điều Hòa", desc: "Mặt nước tĩnh lặng tạo thế 'Hướng Thủy' – tụ khí tụ tài theo phong thủy." },
  { id: "f6", icon: "Car", title: "Bãi Đỗ Xe Rộng Rãi", desc: "Đỗ xe ô tô, xe điện và Limousine đưa đón tận nơi cho gia đình viếng thăm." }
];

export const PRICE_TABLE = [
  {
    code: "DON",
    name: "Mộ Đơn",
    image: "Mo_Don.JPG",
    thumbnail: "Mo_Don_thumb.jpg",
    area: "4.8 m²",
    quantity: "7.763 mộ",
    ratio: "Tỷ lệ ~30% dự án",
    desc: "Giải pháp hiếu nghĩa tôn nghiêm dành riêng cho đấng sinh thành. Thiết kế đá Granite mài bóng hiện đại.",
    features: ["An táng / Lưu tro", "Đá Granite cao cấp", "Lọc thoát nước sinh học"]
  },
  {
    code: "DOI",
    name: "Mộ Đôi",
    image: "Mo_Doi.JPG",
    thumbnail: "Mo_Doi_thumb.jpg",
    area: "9.6 m²",
    quantity: "7.763 mộ",
    ratio: "Tỷ lệ ~30% dự án",
    desc: "Giải pháp hiếu nghĩa tôn nghiêm dành cho cặp đôi. Thiết kế đá Granite mài bóng hiện đại.",
    features: ["An táng / Lưu tro", "Đá Granite cao cấp", "Lọc thoát nước sinh học"]
  },
  {
    code: "GIATOC",
    name: "Mộ Gia Tộc",
    image: "8.jpg",
    area: "45 m² - 200 m²",
    quantity: "1.436 mộ",
    ratio: "Tỷ lệ ~53% dự án",
    desc: "Quy hoạch không gian ấm cúng cho gia đình 4 - 12 mộ phần. Bao bọc bởi thảm cỏ nhung Nhật Bản rực rỡ và thông tùng bách xanh mướt.",
    features: ["Cát táng đôi / đơn", "Phối cảnh sinh thái", "Sổ hồng riêng biệt"],
    featured: false
  },
  {
    code: "DAIGIATOC",
    name: "Mộ Đại Gia Tộc",
    image: "7.jpg",
    area: "200 m² - 300+ m²",
    quantity: "174 mộ",
    ratio: "Tỷ lệ ~15% dự án",
    desc: "Khẳng định uy thế, lưu giữ vương triều ký ức lâu đời. Cổng đá tạc khắc rồng phượng thủ công uy nghi và sân tế lễ rộng rãi.",
    features: ["100% đá khối nguyên khối", "Vị trí đắc địa nhất", "Mái đá tạc quý phái"],
    featured: true
  }
];

export const NAV_ITEMS = [
  { id: "home", label: "Trang Chủ", path: "/" },
  { id: "about", label: "Giới Thiệu", path: "/gioi-thieu" },
  { id: "location", label: "Vị Trí", path: "/vi-tri" },
  { id: "masterplan", label: "Quy Hoạch", path: "/quy-hoach" },
  { id: "products", label: "Sản Phẩm", path: "/san-pham" },
  { id: "services", label: "Dịch Vụ", path: "/dich-vu" },
  { id: "contact", label: "Liên Hệ", path: "/lien-he" }
];
