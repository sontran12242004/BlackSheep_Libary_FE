# Black Sheep Library

**Nền tảng học tập và nghiên cứu tài chính dành riêng cho cộng đồng hội viên Black Sheep.**

Black Sheep Library là một ứng dụng web nội bộ được xây dựng nhằm tập trung hóa toàn bộ tài nguyên học tập tài chính — bao gồm sách, báo cáo phân tích, trading recap, và khóa học video — trong một giao diện thống nhất, phân quyền theo vai trò người dùng. Hệ thống được thiết kế theo triết lý đơn giản: không kêu gọi đầu tư, chỉ cung cấp tri thức.

---

## Mục lục

- [Tính năng chính](#tính-năng-chính)
- [Kiến trúc hệ thống](#kiến-trúc-hệ-thống)
- [Phân quyền vai trò](#phân-quyền-vai-trò)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cài đặt và khởi chạy](#cài-đặt-và-khởi-chạy)
- [Lưu trữ dữ liệu](#lưu-trữ-dữ-liệu)
- [Tuyến đường URL](#tuyến-đường-url)
- [Lưu ý quan trọng](#lưu-ý-quan-trọng)

---

## Tính năng chính

### Thư viện tài nguyên đa phương tiện

Hệ thống hỗ trợ ba định dạng nội dung chính: tài liệu PDF, hình ảnh phân tích/trading recap, và video khóa học. Mỗi định dạng có modal hiển thị chuyên biệt với trải nghiệm xem tối ưu.

- **PDF Reader Modal** — Đọc tài liệu trực tiếp trong trình duyệt, hỗ trợ chuyển đổi ngôn ngữ giao diện.
- **Video Course Modal** — Xem video khóa học với giao diện nhúng đầy đủ chức năng.
- **Chart Lightbox Modal** — Xem ảnh phân tích và trading recap ở chế độ toàn màn hình.

### Tìm kiếm và lọc nội dung

Người dùng có thể tìm kiếm tài nguyên theo tiêu đề, tác giả, mô tả, hoặc thẻ tag. Bộ lọc thị trường cho phép thu hẹp nội dung theo phân khúc cụ thể (Crypto, Forex, Stocks, v.v.).

### Theo dõi tiến độ đọc

Hội viên VIP có bảng theo dõi tiến độ đọc cá nhân, cho phép tiếp tục đọc từ vị trí đã dừng và quản lý danh sách tài nguyên đang theo dõi.

### Tải lên tài nguyên nội bộ

Tài khoản Coach và Admin có thể tải lên tài liệu PDF, hình ảnh, hoặc video trực tiếp từ ứng dụng thông qua Upload Modal. Dữ liệu được lưu trữ cục bộ qua IndexedDB và không yêu cầu backend server.

### Bảng điều hành Coach

Trang Coach cung cấp hai chế độ xem: bảng thống kê lượt xem và tiến độ đọc của học viên (Analytics), và lưới hiển thị toàn bộ giáo trình đang quản lý (Grid). Coach có thể ẩn/hiện, xóa, hoặc cập nhật thông tin từng tài liệu.

### Bảng quản trị Admin

Admin có toàn quyền quản lý tài nguyên và tài khoản hội viên: phân quyền VIP/Coach/Member, khóa/mở tài khoản, xóa tài khoản, và chuyển đổi nội dung giữa kho Member và kho VIP.

---

## Kiến trúc hệ thống

Ứng dụng được xây dựng theo mô hình Single Page Application (SPA) thuần client-side. Không có backend server hay cơ sở dữ liệu từ xa — toàn bộ dữ liệu người dùng tải lên được lưu trong IndexedDB của trình duyệt, trong khi dữ liệu mẫu được nhúng trực tiếp vào mã nguồn.

Định tuyến được thực hiện thủ công thông qua `window.history.pushState` và sự kiện `popstate`, tương thích với các trình duyệt hiện đại mà không cần thư viện router bên ngoài.

```
Browser (SPA)
    |
    +-- LandingPage (/)
    |
    +-- App.jsx (State & Router)
         |
         +-- /member   -->  MemberPage             (Hội viên thông thường)
         +-- /vip      -->  VipPage                (Hội viên VIP)
         +-- /coach    -->  CoachPage              (Huấn luyện viên)
         +-- /admin    -->  AdminPage              (Quản trị viên)
         +-- /settings -->  SettingsProfilePage
```

---

## Phân quyền vai trò

| Vai trò | Đường dẫn   | Quyền hạn                                                        |
|---------|-------------|------------------------------------------------------------------|
| Member  | `/member`   | Xem tài nguyên công khai, tìm kiếm, lọc nội dung                |
| VIP     | `/vip`      | Truy cập kho VIP, theo dõi tiến độ đọc cá nhân                  |
| Coach   | `/coach`    | Tải lên tài liệu, xem thống kê học viên, quản lý giáo trình     |
| Admin   | `/admin`    | Toàn quyền: quản lý tài nguyên và tài khoản hội viên            |

---

## Cấu trúc thư mục

```
BSV_Libary/
    index.html                       # Điểm vào HTML, khai báo font và meta
    vite.config.js                   # Cấu hình Vite build tool
    package.json
    src/
        main.jsx                     # Điểm vào React
        App.jsx                      # Root component, router, state toàn cục
        index.css                    # Design system: CSS variables, utility classes
        components/
            Header.jsx               # Thanh điều hướng chính
            AdminPanel.jsx           # Giao diện quản trị tài nguyên và người dùng
            CoachTrackerPanel.jsx    # Thống kê và theo dõi học viên (Coach)
            MediaGrid.jsx            # Lưới hiển thị tài nguyên
            UploadModal.jsx          # Modal tải lên tài liệu
            PdfReaderModal.jsx       # Đọc PDF trong trình duyệt
            VideoCourseModal.jsx     # Xem video khóa học
            ChartLightboxModal.jsx   # Xem ảnh phân tích toàn màn hình
            CategoryFilter.jsx       # Bộ lọc thị trường và danh mục
            VipReadingTracker.jsx    # Theo dõi tiến độ đọc (VIP)
            CoachHeaderBanner.jsx    # Banner thông tin trang Coach
            VipHeaderBanner.jsx      # Banner thông tin trang VIP
            DashboardStats.jsx       # Thẻ thống kê tổng quan
            Interactive3DBook.jsx    # Hiệu ứng sách 3D trang Landing
            BlazingFireAvatar3D.jsx  # Avatar 3D với hiệu ứng lửa
            AvatarWithFrame.jsx      # Khung avatar hội viên
            SheepHeadIcon.jsx        # Biểu tượng thương hiệu tùy chỉnh
        pages/
            LandingPage.jsx          # Trang chào, canvas particle, giới thiệu
            MemberPage.jsx           # Trang hội viên thông thường
            VipPage.jsx              # Trang hội viên VIP
            CoachPage.jsx            # Trang Coach
            AdminPage.jsx            # Trang Admin
            SettingsProfilePage.jsx  # Cài đặt hồ sơ cá nhân
        services/
            storageService.js        # Thao tác IndexedDB (CRUD media items)
        data/
            sampleFinanceData.js     # Dữ liệu mẫu: sách, VIP media, tài khoản
```

---

## Công nghệ sử dụng

| Thành phần  | Công nghệ                              |
|-------------|----------------------------------------|
| Framework   | React 18                               |
| Build Tool  | Vite 5                                 |
| Ngôn ngữ    | JavaScript (ES Modules, JSX)           |
| Styling     | Vanilla CSS với CSS Custom Properties  |
| Icon Library| Lucide React                           |
| Font        | Plus Jakarta Sans, Cinzel, JetBrains Mono (Google Fonts) |
| Lưu trữ     | Browser IndexedDB (TradeVaultDB)       |
| Routing     | Thủ công qua History API               |
| Triển khai  | Static SPA (không cần server)          |

---

## Cài đặt và khởi chạy

**Yêu cầu hệ thống:** Node.js >= 18, npm >= 9.

**1. Clone repository và cài đặt dependencies:**

```bash
git clone <repository-url>
cd BSV_Libary
npm install
```

**2. Khởi chạy môi trường phát triển:**

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:5173` theo mặc định.

**3. Build production:**

```bash
npm run build
```

Output sẽ được xuất vào thư mục `dist/`. Vì đây là SPA thuần client-side, toàn bộ thư mục `dist/` có thể được triển khai lên bất kỳ web server tĩnh nào (Nginx, Vercel, Netlify, GitHub Pages, v.v.).

**Lưu ý khi triển khai:** Nếu deploy lên server có hỗ trợ routing, cần cấu hình rewrite toàn bộ request về `index.html` để SPA routing hoạt động đúng với các đường dẫn `/member`, `/vip`, `/coach`, `/admin`.

---

## Lưu trữ dữ liệu

Ứng dụng sử dụng hai nguồn dữ liệu:

**Dữ liệu mẫu tĩnh** — Được nhúng trong file `src/data/sampleFinanceData.js`, bao gồm danh sách tài nguyên mẫu và tài khoản hội viên mẫu. Dữ liệu này không thay đổi giữa các phiên sử dụng và chỉ phục vụ mục đích trình diễn.

**Dữ liệu người dùng tải lên** — Được lưu trong IndexedDB của trình duyệt dưới tên database `TradeVaultDB`, object store `media_files`. File Blob (PDF, ảnh, video) được lưu trực tiếp trong IndexedDB mà không qua server. Dữ liệu này tồn tại lâu dài trên thiết bị của người dùng và sẽ bị mất nếu trình duyệt xóa cache/site data.

---

## Tuyến đường URL

| URL          | Nội dung                                       |
|--------------|------------------------------------------------|
| `/`          | Landing Page — giới thiệu nền tảng             |
| `/member`    | Kho tài nguyên công khai dành cho hội viên     |
| `/vip`       | Kho tài nguyên VIP và trading recap            |
| `/coach`     | Bảng điều hành Coach, thống kê và giáo trình   |
| `/admin`     | Bảng quản trị Admin                            |
| `/settings`  | Cài đặt hồ sơ cá nhân                         |

---

## Lưu ý quan trọng

Black Sheep Library là nền tảng học tập và nghiên cứu nội bộ. Toàn bộ nội dung được cung cấp với mục đích giáo dục và tham khảo. Ứng dụng **không kêu gọi đầu tư** dưới bất kỳ hình thức nào.

---

*Black Sheep Library — 2026*
