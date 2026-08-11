# Thiên Phúc Vĩnh Hằng Viên

Landing page giới thiệu dự án công viên nghĩa trang cao cấp **Thiên Phúc Vĩnh Hằng Viên** tại Uông Bí, Quảng Ninh.

## Cấu trúc website

| Trang | Đường dẫn | Mô tả |
|---|---|---|
| Trang chủ | `/` | Hero, tổng quan dự án, tiện ích, bảy bậc giác ngộ, bộ sưu tập, FAQ, form đặt lịch |
| Giới thiệu | `/gioi-thieu` | Giới thiệu dự án, chủ đầu tư, đơn vị phát triển, đối tác, giá trị cốt lõi |
| Vị trí | `/vi-tri` | Bản đồ Google Maps, khoảng cách di chuyển, phong thủy "Tựa Sơn – Hướng Thủy", 3 văn phòng đại diện |
| Quy hoạch | `/quy-hoach` | Quy hoạch tổng thể 32ha, tiện ích đồng bộ, bản đồ phân khu, nguyên tắc thiết kế |
| Sản phẩm | `/san-pham` | Mộ đơn, mộ đôi, mộ gia đình, khuôn viên đại gia tộc với bộ lọc |
| Dịch vụ | `/dich-vu` | 6 hạng mục: trông nom hương khói, tang lễ, hỏa táng, mâm cúng, phong thủy, Limousine |
| Liên hệ | `/lien-he` | Form tư vấn, hotline, email, Zalo, 3 văn phòng, bản đồ |

## Tính năng nổi bật

- **Responsive SPA với React Router v7** - điều hướng mượt mà giữa 7 trang
- **Nút liên hệ follow theo cuộn trang** - xuất hiện sau 600px, có radar pulse + 2 kênh (Hotline + Zalo) + nút back-to-top
- **CTA nội bộ trong từng section** - Hero, navigation, sections, footer đều có nút gọi điện
- **Web Audio Synthesizer** - thiền nhạc 136.1 Hz Solfeggio với chuông gió Pentatonic
- **Google Maps embed** - định vị live với tọa độ 21.0606617, 106.7481965
- **Form đăng ký tư vấn** - validate client-side với animation chuyển trạng thái
- **Hero/lightbox/showcase gallery** - sử dụng motion animations

## Thông tin liên hệ (single source of truth)

Toàn bộ thông tin hotline, email, địa chỉ, chủ đầu tư... được quản lý tập trung tại `src/constants.ts`:

- Hotline: **0911.561.369** · Zalo: **0911.561.369**
- Email: info@nghiatrangthienphuc.com
- Văn phòng: Quảng Ninh (Uông Bí), Hà Nội (Đống Đa), TP.HCM (An Khánh)
- Chủ đầu tư: Công Ty Cổ Phần Long Hải Quảng Ninh
- Đơn vị phát triển: Công Ty CP TM & DV Sala Garden

## Công nghệ

- React 19 + TypeScript
- React Router v7 (HashRouter cho GitHub Pages)
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide Icons

## Chạy local

```bash
npm install
npm run dev
```

## Build production

```bash
npm run build
```

## Deploy

Site được deploy tự động qua **GitHub Actions** từ branch `main`.

1. GitHub Actions sẽ tự động chạy khi có push lên `main`
2. Build output được upload lên GitHub Pages thông qua `deploy.yml` workflow

**Live**: [https://zankhuy.github.io/Landing-Thien-Phuc/](https://zankhuy.github.io/Landing-Thien-Phuc/)
