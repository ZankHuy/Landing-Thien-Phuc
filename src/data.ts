export const img = (file: string) => `${import.meta.env.BASE_URL}Images/Photos/${file}`;
export const logoImg = (file: string) => `${import.meta.env.BASE_URL}Images/Logo/${file}`;

export interface EnlightenmentStep {
  id: string;
  number: string;
  title: string;
  english: string;
  description: string;
  quote: string;
  imageUrl: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  english: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  tag: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export const ENLIGHTENMENT_STEPS: EnlightenmentStep[] = [
  {
    id: "step1",
    number: "01",
    title: "Tĩnh Tâm",
    english: "Sự Tĩnh Lặng Của Tâm Hồn",
    description: "Giữa xô bồ cuộc sống, tìm về một khoảng lặng bình yên, nơi tâm hồn lắng dịu dưới bóng đại ngàn Yên Tử ngay từ những bước chân đầu tiên qua cổng tam quan tôn kính.",
    quote: "Tâm có tĩnh, lòng mới sáng; đất có lành, cốt mới an.",
    imageUrl: img("cong.jpg")
  },
  {
    id: "step2",
    number: "02",
    title: "Chánh Niệm",
    english: "Chánh Niệm Tỉnh Thức",
    description: "Ý thức rõ ràng từng hơi thở, từng bước đi tôn nghiêm tiến vào Đền Trình linh thiêng, thắp nén nhang thành kính dâng lên chư Phật và tổ tiên.",
    quote: "Trọn vẹn với hiện tại, thấu cảm mạch sống vĩnh hằng trong từng khoảnh khắc.",
    imageUrl: img("den_trinh.jpg")
  },
  {
    id: "step3",
    number: "03",
    title: "Vô Thường",
    english: "Vô Thường Sinh Diệt",
    description: "Nghỉ chân bên hiên Nhà để tro cổ kính, ngẫm về dòng chảy không ngừng của thời gian và chuẩn bị chu toàn một di sản tâm linh trường tồn vạn thuở.",
    quote: "Sinh tử tựa mây trôi; chuẩn bị chu toàn là đỉnh cao của sự an lòng.",
    imageUrl: img("nha_chua_tro.jpg")
  },
  {
    id: "step4",
    number: "04",
    title: "An Nhiên",
    english: "An Nhiên Tự Tại",
    description: "Thong dong tự tại tọa đàm nơi chòi ngắm cảnh thanh tịnh, tựa lưng vào núi Kim Cương hùng vĩ và hướng tầm mắt ra làn nước hồ tĩnh lặng.",
    quote: "Tựa sơn vững chãi qua ngàn năm, hướng thủy hanh thông trọn kiếp người.",
    imageUrl: img("choi_ngoi_ngam_canh.jpg")
  },
  {
    id: "step5",
    number: "05",
    title: "Trí Tuệ",
    english: "Trí Tuệ Minh Đức",
    description: "Thấu suốt lẽ sinh tử tại Nhà Điều Hành trung tâm, nơi quy hoạch phong thủy đỉnh cao được hiển lộ tường tận bởi các chuyên gia phong thủy Á Đông.",
    quote: "Bậc trí giả nhìn xa trông rộng, an bài tương lai bằng sự thấu đáo vẹn toàn.",
    imageUrl: img("nha_dieu_hanh.jpg")
  },
  {
    id: "step6",
    number: "06",
    title: "Tâm An",
    english: "Tâm An Thanh Tịnh",
    description: "Thực hiện đại lễ tri ân tôn nghiêm tại Nhà Tang Lễ hoàng gia, bày tỏ lòng hiếu nghĩa vẹn tròn và gieo mầm phúc đức sâu dày cho muôn đời con cháu.",
    quote: "Phúc đức tổ tiên lưu vạn thuở; hiếu nghĩa con cháu rạng muôn đời.",
    imageUrl: img("nha_tang_le.jpg")
  },
  {
    id: "step7",
    number: "07",
    title: "Niết Bàn",
    english: "Cõi Niết Bàn An Lạc",
    description: "Tâm hồn nhẹ tênh như sương khói đại ngàn, rũ bỏ mọi vướng bận hồng trần, hòa mình hoàn toàn vào bức tranh sơn thủy vĩnh hằng.",
    quote: "Rũ sạch bụi trần, thong dong bước vào cõi vĩnh hằng vô ưu.",
    imageUrl: img("tong_quan_2.jpg")
  }
];

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "family-grave",
    title: "Khuôn Viên Đại Gia Tộc",
    english: "Khuôn Viên Tổ Tiên",
    description: "Không gian sinh thái hoàng gia biệt lập tạc tác thủ công từ đá tự nhiên, lưu giữ vương triều ký ức lâu đời của dòng tộc.",
    longDescription: "Khuôn viên mộ đại gia tộc là kiệt tác kiến trúc tôn nghiêm, tọa lạc tại những vị thế đắc địa tụ khí tụ tài nhất dự án. Thiết kế tinh xảo kết hợp đá xanh nguyên khối điêu khắc tinh vi bởi các nghệ nhân lành nghề nhất Việt Nam, vây quanh bởi tường rào tùng bách xanh mướt và khuôn viên rộng rãi cho con cháu tề tựu.",
    imageUrl: img("7.jpg"),
    tag: "Đại Gia Tộc"
  },
  {
    id: "zen-garden",
    title: "Cảnh Sắc Tịnh An",
    english: "Cảnh Quan Thiền Định",
    description: "Mỹ học tối giản giao hòa thiên nhiên tinh khôi với lối đi sỏi trắng, hồ thiền tĩnh lặng và những rặng tùng bách nghiêm trang.",
    longDescription: "Sự giao hòa tuyệt mỹ giữa nghệ thuật kiến trúc thiền tịnh tối giản Á Đông và cảnh sắc nguyên sơ linh thiêng của đại ngàn Yên Tử. Từng con đường, tảng đá đều được sắp đặt tỉ mỉ mang âm hưởng vườn Thiền tinh tế, giúp rũ bỏ mọi phiền muộn, đưa bước chân viếng thăm chạm vào sự yên tịnh thẳm sâu.",
    imageUrl: img("8.jpg"),
    tag: "Cảnh Thiền"
  },
  {
    id: "den-trinh",
    title: "Điện Phật & Đền Trình",
    english: "Đền Thờ Tổ Tiên Hoàng Gia",
    description: "Chóp đỉnh tâm linh uy nghi, mái ngói cổ kính, nơi tiếp nhận long mạch thiêng liêng và tổ chức các nghi lễ đại đàn chuẩn quốc gia.",
    longDescription: "Công trình đền miếu cổ kính tọa lạc ngay trên long mạch của dự án. Từng chi tiết chạm khắc rồng phượng, mái đao cong vút được hoàn thiện bởi các thợ mộc mỹ nghệ truyền thống. Nơi đây là điểm cầu an, cầu siêu và hội tụ sinh khí tốt lành bảo vệ sự thịnh vượng đời đời của gia chủ.",
    imageUrl: img("den_trinh.jpg"),
    tag: "Đền Trình"
  },
  {
    id: "choi-ngam-canh",
    title: "Chòi Tọa Thiền Sơn Thủy",
    english: "Đài Ngắm Cảnh Toàn Cảnh",
    description: "Chòi nghỉ ngơi thưởng cảnh thiết kế mở, thu trọn toàn bộ bức tranh phong cảnh hùng vĩ của dải núi Kim Cương.",
    longDescription: "Không gian nghỉ chân thanh tịnh dành cho gia quyến khi ghé thăm viếng mộ. Kiến trúc mái ngói cong truyền thống kết hợp gỗ tự nhiên quý hiếm, mở ra tầm nhìn bao quát toàn bộ quy hoạch tựa sơn hướng thủy.",
    imageUrl: img("choi_ngoi_ngam_canh.jpg"),
    tag: "Tọa Thiền"
  },
  {
    id: "thuy-ta",
    title: "Nhà Hàng Thủy Tạ",
    english: "Trà Đạo & Ẩm Thực Ven Hồ",
    description: "Khu vực ẩm thực trà chay thượng hạng ven hồ, nơi gia tộc sum họp trong không khí ấm cúng và tôn nghiêm.",
    longDescription: "Khu nhà hàng Thủy Tạ ven hồ tĩnh tại cung cấp các món ăn chay thanh tịnh, trà đạo Á Đông và không gian đón tiếp sang trọng cho các nghi lễ gia tộc.",
    imageUrl: img("nha_hang_thuy_ta.jpg"),
    tag: "Thủy Tạ Quán"
  },
  {
    id: "nha-dich-vu",
    title: "Khu Dịch Vụ 5-Sao",
    english: "Phòng Tiếp Khách VIP",
    description: "Trung tâm quản gia chuyên nghiệp phục vụ 24/7 mọi tâm nguyện và nhu cầu của gia quyến.",
    longDescription: "Tòa nhà dịch vụ trung tâm đạt chuẩn resort 5-sao với phòng tiếp khách VIP, khu vực tư vấn phong thủy riêng tư, cùng đội ngũ quản gia tận tâm hỗ trợ từng chi tiết nhỏ nhất.",
    imageUrl: img("nha_dich_vu.jpg"),
    tag: "Dịch Vụ VIP"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq1",
    category: "legal",
    question: "Pháp lý dự án có được sở hữu lâu dài không?",
    answer: "Đầy đủ 100% pháp lý minh bạch. Dự án Thiên Phúc Vĩnh Hằng Viên được cấp giấy chứng nhận quyền sử dụng lâu dài do Ban Quản lý hoa viên cấp, đảm bảo tính pháp lý và an tâm tuyệt đối cho nhiều thế hệ mai sau, không lo ngại quy hoạch hay di dời."
  },
  {
    id: "faq2",
    category: "fengshui",
    question: "Vì sao thế đất tại đây được gọi là 'Tựa Sơn – Hướng Thủy'?",
    answer: "Dự án nằm tựa lưng vững chãi vào dãy núi Yên Tử - một nhánh rồng thiêng của rặng núi Phật giáo cổ kính, và hướng tầm mắt ra hồ điều hòa thanh bình. Đây là thế tụ khí tụ tài đại cát đại lợi trong phong thủy âm trạch."
  },
  {
    id: "faq3",
    category: "technology",
    question: "Công nghệ môi trường sinh học áp dụng như thế nào?",
    answer: "Chúng tôi áp dụng hệ thống xử lý nước và đất sinh thái khép kín sinh học tiên tiến nhất, kết hợp hệ thống lọc vi sinh tự nhiên đảm bảo 100% không phát thải gây ảnh hưởng đến mạch nước ngầm và môi trường đại ngàn xung quanh."
  },
  {
    id: "faq4",
    category: "services",
    question: "Dự án có các dịch vụ chăm sóc định kỳ như thế nào?",
    answer: "Dịch vụ trông nom – hương khói trọn đời bao gồm: cúng lễ định kỳ, chăm sóc cây xanh, vệ sinh và bảo dưỡng mộ phần, thắp hương ngày rằm, mùng một và các dịp lễ tết, bảo an 24/7. Gia đình hoàn toàn yên tâm khi không thường xuyên ghé thăm."
  },
  {
    id: "faq5",
    category: "legal",
    question: "Thủ tục mua mộ phần có phức tạp không?",
    answer: "Rất đơn giản. Chỉ cần CMND/CCCD, giấy đăng ký thông tin người sở hữu và ký hợp đồng. Nhân viên tư vấn sẽ hỗ trợ khách hàng từ A-Z một cách nhanh chóng và bảo mật."
  },
  {
    id: "faq6",
    category: "legal",
    question: "Có chính sách trả góp / thanh toán linh hoạt không?",
    answer: "Có. Khách hàng có thể chọn hình thức thanh toán một lần hoặc chia thành nhiều đợt theo tiến độ. Thiên Phúc Vĩnh Hằng Viên cũng hỗ trợ các phương án tài chính phù hợp với gia đình."
  },
  {
    id: "faq7",
    category: "services",
    question: "Giá mộ phần hiện nay khoảng bao nhiêu?",
    answer: "Mức giá mộ phần tại Thiên Phúc Vĩnh Hằng Viên phụ thuộc vào loại hình (mộ đơn, mộ đôi, mộ gia tộc, mộ đặc biệt). Vui lòng liên hệ Hotline để được báo giá và chính sách ưu đãi mới nhất."
  },
  {
    id: "faq8",
    category: "fengshui",
    question: "Từ Hà Nội / Hải Phòng / Hạ Long đi dự án mất bao lâu?",
    answer: "Từ Hà Nội khoảng 2 giờ xe, từ Hải Phòng khoảng 1 giờ xe, từ Hạ Long khoảng 30-50 phút xe. Ban quản lý cung cấp dịch vụ xe Limousine đưa đón miễn phí cho gia đình tham quan khảo sát."
  }
];

// ============================================================
// PROJECT OVERVIEW DATA
// ============================================================

export interface OverviewPillar {
  title: string;
  desc: string;
}

export interface ProjectOverview {
  headline: string;
  intro: string;
  pillars: OverviewPillar[];
  mission: string[];
}

export const PROJECT_OVERVIEW: ProjectOverview = {
  headline: "Công Viên Nghĩa Trang Văn Minh – Sinh Thái Chuẩn Mực",
  intro: "Thiên Phúc Vĩnh Hằng Viên được quy hoạch như một hoa viên nghĩa trang sinh thái chuẩn mực, gắn liền với triết lý Thiền phái Trúc Lâm. Đây không chỉ là nơi an nghỉ vĩnh hằng cho người đã khuất, mà còn là biểu tượng nhân văn, giúp con cháu thể hiện đạo hiếu và giữ gìn phúc đức lâu dài.",
  pillars: [
    {
      title: "Tâm Linh & Văn Hóa",
      desc: "Tọa lạc dưới chân núi Yên Tử – đất Phật linh thiêng, gắn với lịch sử dựng nước và phát triển Thiền phái Trúc Lâm Yên Tử. Gìn giữ giá trị tâm linh, lịch sử – văn hóa ngàn năm."
    },
    {
      title: "Quy Hoạch Sinh Thái",
      desc: "Thiên nhiên với kiến trúc nơi đây như hòa quyện làm một, tạo cho Yên Tử một vẻ đẹp cổ kính mang đậm màu sắc thời gian và một 'Hồn Việt – Nét Trần – Tinh thần thiền Trúc Lâm'."
    },
    {
      title: "Dịch Vụ Trọn Đời",
      desc: "Đem đến dịch vụ trọn đời, an tâm tuyệt đối cho thân nhân với chuẩn mực resort 5 sao, đội ngũ quản gia chuyên nghiệp, công nghệ bảo mật hiện đại."
    }
  ],
  mission: [
    "Tạo dựng một hoa viên nghĩa trang văn minh, hài hòa với thiên nhiên.",
    "Gìn giữ giá trị tâm linh, gắn với lịch sử – văn hóa Yên Tử.",
    "Đem đến dịch vụ trọn đời, an tâm tuyệt đối cho thân nhân."
  ]
};

// ============================================================
// SERVICES DATA (for /dich-vu page)
// ============================================================

export const SERVICES = [
  {
    id: "care",
    icon: "🪴",
    title: "Dịch Vụ Trông Nom Hương Khói Trọn Đời",
    english: "Dịch Vụ Chăm Sóc Vĩnh Viễn",
    desc: "Đội ngũ quản gia túc trực chăm sóc mộ phần: cúng lễ, thắp hương định kỳ, chăm sóc cây xanh, vệ sinh lau chùi mỗi ngày. Gia đình hoàn toàn yên tâm dù ở xa.",
    features: [
      "Thắp hương ngày rằm, mùng một, sóc vọng",
      "Chăm sóc cây xanh, thảm cỏ Nhật Bản",
      "Quét dọn vệ sinh, lau chùi mộ phần",
      "Báo cáo hình ảnh qua ứng dụng mobile",
      "Cúng giỗ online cho con cháu phương xa"
    ]
  },
  {
    id: "funeral",
    icon: "🕯️",
    title: "Dịch Vụ Tang Lễ Trọn Gói",
    english: "Tang Lễ Trọn Gói",
    desc: "Hỗ trợ toàn bộ quy trình tang lễ tại Nhà Tang Lễ hoàng gia trong khuôn viên dự án. Đội ngũ chuyên nghiệp đồng hành cùng gia đình trong giờ phút thiêng liêng.",
    features: [
      "Nhà Tang Lễ đầy đủ tiện nghi chuẩn 5 sao",
      "Hỗ trợ thủ tục pháp lý, giấy tờ",
      "Trang trí hoa tươi, ánh sáng tôn nghiêm",
      "Phòng chờ riêng cho thân nhân",
      "Bố trí xe đưa đón tang gia"
    ]
  },
  {
    id: "cremation",
    icon: "🔥",
    title: "Dịch Vụ Hỏa Táng & Lưu Tro",
    english: "Hỏa Táng & Lưu Giữ Tro Cốt",
    desc: "Lò hỏa táng hiện đại đặt tại khuôn viên, quy trình tôn nghiêm theo đúng nghi thức truyền thống. Nhà để tro cốt được bảo quản vĩnh viễn trong không gian thanh tịnh.",
    features: [
      "Lò hỏa táng công nghệ tiên tiến, không khói",
      "Nhà để tro riêng biệt, bảo quản mãi mãi",
      "Bình tro cốt cao cấp nhiều lựa chọn",
      "Phòng chiêu hồn trang nghiêm"
    ]
  },
  {
    id: "cung",
    icon: "🍵",
    title: "Dịch Vụ Mâm Cúng",
    english: "Dịch Vụ Dâng Cúng",
    desc: "Chuẩn bị mâm cúng trọn gói theo phong tục Việt Nam cho các ngày giỗ, lễ tết, sóc vọng, kỵ nhật. Đầu bếp chay chuyên nghiệp, nguyên liệu thượng hạng.",
    features: [
      "Mâm cúng chay truyền thống",
      "Mâm cúng mặn theo yêu cầu",
      "Hoa quả tươi theo mùa",
      "Đầu bếp chay được chứng nhận",
      "Bày biện tại Nhà Hàng Thủy Tạ hoặc tại mộ"
    ]
  },
  {
    id: "fengshui",
    icon: "🧭",
    title: "Tư Vấn Phong Thủy Chuyên Sâu",
    english: "Tư Vấn Phong Thủy",
    desc: "Chuyên gia phong thủy Á Đông tư vấn vị trí, hướng mộ phần và ngày giờ an táng phù hợp với tuổi, mệnh gia chủ. Cam kết hài hòa long mạch dự án.",
    features: [
      "Xem tuổi, mệnh gia chủ",
      "Tư vấn hướng mộ theo bát trạch",
      "Chọn ngày giờ an táng tốt nhất",
      "Báo cáo phong thủy chi tiết kèm file"
    ]
  },
  {
    id: "transport",
    icon: "🚗",
    title: "Dịch Vụ Limousine Đưa Đón VIP",
    english: "Dịch Vụ Limousine VIP",
    desc: "Xe Limousine/Mercedes hạng sang đưa đón miễn phí từ Hà Nội, Hải Phòng, Hạ Long và các tỉnh lân cận. Phục vụ gia đình tham quan khảo sát thực tế.",
    features: [
      "Limousine 9 chỗ cao cấp",
      "Tài xế chuyên nghiệp, lịch sự",
      "Miễn phí đưa đón tận nơi",
      "Có thể đón tại 3 văn phòng: HN, HP, HCM"
    ]
  }
];
