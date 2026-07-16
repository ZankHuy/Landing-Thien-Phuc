const img = (file: string) => `${import.meta.env.BASE_URL}Images/${file}`;

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
    english: "Stillness of Mind",
    description: "Giữa xô bồ cuộc sống, tìm về một khoảng lặng bình yên, nơi tâm hồn lắng dịu dưới bóng đại ngàn Yên Tử ngay từ những bước chân đầu tiên qua cổng tam quan tôn kính.",
    quote: "Tâm có tĩnh, lòng mới sáng; đất có lành, cốt mới an.",
    imageUrl: img("cong.jpg")
  },
  {
    id: "step2",
    number: "02",
    title: "Chánh Niệm",
    english: "Mindfulness",
    description: "Ý thức rõ ràng từng hơi thở, từng bước đi tôn nghiêm tiến vào Đền Trình linh thiêng, thắp nén nhang thành kính dâng lên chư Phật và tổ tiên.",
    quote: "Trọn vẹn với hiện tại, thấu cảm mạch sống vĩnh hằng trong từng khoảnh khắc.",
    imageUrl: img("den_trinh.jpg")
  },
  {
    id: "step3",
    number: "03",
    title: "Vô Thường",
    english: "Impermanence",
    description: "Nghỉ chân bên hiên Nhà Chùa Trọ cổ kính, ngẫm về dòng chảy không ngừng của thời gian và chuẩn bị chu toàn một di sản tâm linh trường tồn vạn thuở.",
    quote: "Sinh tử tựa mây trôi; chuẩn bị chu toàn là đỉnh cao của sự an lòng.",
    imageUrl: img("nha_chua_tro.jpg")
  },
  {
    id: "step4",
    number: "04",
    title: "An Nhiên",
    english: "Serenity",
    description: "Thong dong tự tại tọa đàm nơi chòi ngắm cảnh thanh tịnh, tựa lưng vào núi Kim Cương hùng vĩ và hướng tầm mắt ra làn nước hồ tĩnh lặng.",
    quote: "Tựa sơn vững chãi qua ngàn năm, hướng thủy hanh thông trọn kiếp người.",
    imageUrl: img("choi_ngoi_ngam_canh.jpg")
  },
  {
    id: "step5",
    number: "05",
    title: "Trí Tuệ",
    english: "Wisdom",
    description: "Thấu suốt lẽ sinh tử tại Nhà Điều Hành trung tâm, nơi quy hoạch phong thủy đỉnh cao được hiển lộ tường tận bởi các chuyên gia phong thủy Á Đông.",
    quote: "Bậc trí giả nhìn xa trông rộng, an bài tương lai bằng sự thấu đáo vẹn toàn.",
    imageUrl: img("nha_dieu_hanh.jpg")
  },
  {
    id: "step6",
    number: "06",
    title: "Từ Bi",
    english: "Compassion",
    description: "Thực hiện đại lễ tri ân tôn nghiêm tại Nhà Tang Lễ hoàng gia, bày tỏ lòng hiếu nghĩa vẹn tròn và gieo mầm phúc đức sâu dày cho muôn đời con cháu.",
    quote: "Phúc đức tổ tiên lưu vạn thuở; hiếu nghĩa con cháu rạng muôn đời.",
    imageUrl: img("nha_tang_le.jpg")
  },
  {
    id: "step7",
    number: "07",
    title: "Giải Thoát",
    english: "Liberation",
    description: "Tâm hồn nhẹ tênh như sương khói đại ngàn, rũ bỏ mọi vướng bận hồng trần, hòa mình hoàn toàn vào bức tranh sơn thủy vĩnh hằng.",
    quote: "Rũ sạch bụi trần, thong dong bước vào cõi vĩnh hằng vô ưu.",
    imageUrl: img("tong_quan_2.jpg")
  }
];

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "family-grave",
    title: "Khuôn Viên Đại Gia Tộc",
    english: "Ancestral Estate Plots",
    description: "Không gian sinh thái hoàng gia biệt lập tạc tác thủ công từ đá tự nhiên, lưu giữ vương triều ký ức lâu đời của dòng tộc.",
    longDescription: "Khuôn viên mộ đại gia tộc là kiệt tác kiến trúc tôn nghiêm, tọa lạc tại những vị thế đắc địa tụ khí tụ tài nhất dự án. Thiết kế tinh xảo kết hợp đá xanh nguyên khối điêu khắc tinh vi bởi các nghệ nhân lành nghề nhất Việt Nam, vây quanh bởi tường rào tùng bách xanh mướt và khuôn viên rộng rãi cho con cháu tề tựu.",
    imageUrl: img("7.jpg"),
    tag: "Đại Gia Tộc"
  },
  {
    id: "zen-garden",
    title: "Cảnh Sắc Tịnh An",
    english: "Zen Meditation Landscapes",
    description: "Mỹ học tối giản giao hòa thiên nhiên tinh khôi với lối đi sỏi trắng, hồ thiền tĩnh lặng và những rặng tùng bách nghiêm trang.",
    longDescription: "Sự giao hòa tuyệt mỹ giữa nghệ thuật kiến trúc thiền tịnh tối giản Á Đông và cảnh sắc nguyên sơ linh thiêng của đại ngàn Yên Tử. Từng con đường, tảng đá đều được sắp đặt tỉ mỉ mang âm hưởng vườn Thiền tinh tế, giúp rũ bỏ mọi phiền muộn, đưa bước chân viếng thăm chạm vào sự yên tịnh thẳm sâu.",
    imageUrl: img("8.jpg"),
    tag: "Zen Landscape"
  },
  {
    id: "den-trinh",
    title: "Điện Phật & Đền Trình",
    english: "Imperial Ancestral Shrine",
    description: "Chóp đỉnh tâm linh uy nghi, mái ngói cổ kính, nơi tiếp nhận long mạch thiêng liêng và tổ chức các nghi lễ đại đàn chuẩn quốc gia.",
    longDescription: "Công trình đền miếu cổ kính tọa lạc ngay trên long mạch của dự án. Từng chi tiết chạm khắc rồng phượng, mái đao cong vút được hoàn thiện bởi các thợ mộc mỹ nghệ truyền thống. Nơi đây là điểm cầu an, cầu siêu và hội tụ sinh khí tốt lành bảo vệ sự thịnh vượng đời đời của gia chủ.",
    imageUrl: img("den_trinh.jpg"),
    tag: "Đền Trình"
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq1",
    category: "legal",
    question: "Pháp lý dự án có được sở hữu lâu dài không?",
    answer: "Đầy đủ 100% pháp lý minh bạch. Dự án Thiên Phúc Vĩnh Hằng Viên được cấp sổ hồng sở hữu lâu dài ổn định, không lo ngại quy hoạch hay di dời, mang lại sự an tâm tuyệt đối cho nhiều thế hệ mai sau."
  },
  {
    id: "faq2",
    category: "fengshui",
    question: "Vì sao thế đất tại đây được gọi là 'Tựa Sơn Hướng Thủy'?",
    answer: "Dự án nằm tựa lưng vững chãi vào dải núi Kim Cương kì vĩ - một nhánh rồng thiêng của rặng núi Phật giáo Yên Tử cổ kính, và hướng tầm mắt ra hồ nước tĩnh tại xanh biếc. Đây là thế tụ khí tụ tài đại cát đại lợi trong phong thủy."
  },
  {
    id: "faq3",
    category: "technology",
    question: "Công nghệ môi trường châu Âu áp dụng như thế nào?",
    answer: "Chúng tôi áp dụng hệ thống xử lý nước và đất sinh thái khép kín sinh học tiên tiến nhất, kết hợp hệ thống lọc vi sinh tự nhiên đảm bảo 100% không phát thải gây ảnh hưởng đến mạch nước ngầm và môi trường đại ngàn xung quanh."
  },
  {
    id: "faq4",
    category: "services",
    question: "Dự án có các dịch vụ chăm sóc định kỳ như thế nào?",
    answer: "Dịch vụ chuẩn 5 sao bao gồm: chăm sóc cây cỏ, thắp hương ngày rằm, mùng một và các dịp lễ tết, quét dọn vệ sinh lau chùi mộ phần hàng ngày, bảo an 24/7, và hỗ trợ cúng giỗ online vô cùng tiện lợi cho con cháu ở xa."
  }
];
