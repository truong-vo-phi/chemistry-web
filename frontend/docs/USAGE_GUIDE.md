# ChemLab 3D - Hướng Dẫn Sử Dụng Chức Năng (Bản Thống Nhất)

Cập nhật: 19/05/2026

## 1) Tổng quan

Website đã được thống nhất theo một khung giao diện chung cho toàn bộ trang chức năng:
- Top bar chung
- Side menu điều hướng theo nhóm chức năng
- Khu vực nội dung chính thống nhất
- Footer chung
- Điều hướng nội bộ dùng `next/link`

Trang chủ giữ vai trò landing: `/`.
Trang mục lục chức năng: `/interfaces`.

## 2) Cách chạy dự án

```powershell
cd D:\PROJECT\chemistry-web\frontend
npm install
npm run dev
```

Mở trình duyệt tại: `http://localhost:3000`

## 3) Cách sử dụng điều hướng chung

### 3.1 Từ trang chủ
1. Vào `/`
2. Bấm menu `Giao diện` để mở trang `/interfaces`

### 3.2 Từ bất kỳ trang chức năng nào
1. Dùng side menu bên trái để chuyển nhanh giữa các màn hình
2. Dùng khối `Liên kết liên quan` trong nội dung để đi theo luồng nghiệp vụ
3. Dùng nút hành động chính (Primary Action) để đi đúng tác vụ chính của trang

## 4) Danh sách chức năng theo nhóm

## 4.1 Trang chính
- `/` - Trang chủ
- `/interfaces` - Bảng điều hướng toàn bộ giao diện

## 4.2 Học viên
- `/student-dashboard` - Bảng điều khiển học viên
- `/profile-achievements` - Hồ sơ và thành tích
- `/periodic-table` - Bảng tuần hoàn
- `/learning-pathway` - Lộ trình học tập
- `/learning-community` - Cộng đồng lớp học
- `/lesson-interface` - Giao diện bài học
- `/quiz-review` - Xem lại bài quiz
- `/video-lecture-detail` - Chi tiết video bài giảng
- `/experiment-library` - Thư viện thí nghiệm
- `/launch-3d-lab` - Khởi chạy phòng lab 3D
- `/experiment-results` - Kết quả thí nghiệm
- `/science-news-blog` - Tin tức và tài nguyên

## 4.3 Khóa học
- `/theory-course-library` - Thư viện khóa học lý thuyết
- `/course-detail-enrollment` - Chi tiết và đăng ký khóa học
- `/course-category-management` - Quản lý danh mục khóa học
- `/course-management-categories` - Tổng quan danh mục ở mức quản trị

## 4.4 Biên soạn/Nội dung
- `/course-builder` - Trình xây dựng khóa học
- `/course-create-edit` - Tạo/chỉnh sửa khóa học
- `/content-management` - Quản lý nội dung
- `/create-content` - Tạo nội dung mới
- `/create-category` - Tạo danh mục mới
- `/edit-category` - Chỉnh sửa danh mục
- `/delete-confirmation` - Xác nhận xóa danh mục

## 4.5 Quản trị
- `/teacher-dashboard` - Dashboard giáo viên/quản trị
- `/class-management-detailed` - Quản lý lớp học chi tiết
- `/user-management` - Quản lý người dùng
- `/school-portal` - Cổng quản trị trường
- `/settings-customization` - Thiết lập hệ thống

## 5) Hướng dẫn thao tác theo luồng thường dùng

## 5.1 Luồng học viên
1. Vào `/student-dashboard`
2. Mở `/learning-pathway` để chọn bài
3. Vào `/lesson-interface` để học
4. Làm và kiểm tra tại `/quiz-review`
5. Xem thành tích tại `/profile-achievements`

## 5.2 Luồng quản lý khóa học
1. Vào `/course-category-management`
2. Tạo danh mục mới ở `/create-category`
3. Chỉnh sửa tại `/edit-category`
4. Mở builder tại `/course-builder`
5. Xuất bản/chỉnh sửa tại `/course-create-edit`

## 5.3 Luồng quản trị hệ thống
1. Vào `/teacher-dashboard`
2. Quản lý lớp tại `/class-management-detailed`
3. Quản lý người dùng tại `/user-management`
4. Tinh chỉnh hệ thống tại `/settings-customization`

## 6) Cách trỏ route trong code (khuyến nghị)

Không hardcode đường dẫn. Dùng file cấu hình route:
- `src/config/site-routes.ts`

Ví dụ:

```tsx
import Link from 'next/link';
import { appRoutes } from '../../config/site-routes';

<Link href={appRoutes.createCategory}>Tạo danh mục</Link>
```

Danh mục điều hướng dùng chung:
- `src/config/navigation.ts`

## 7) Thành phần layout dùng chung

- `src/components/layout/unified-feature-page.tsx`: khung chuẩn cho trang chức năng
- `src/components/layout/interface-grid.tsx`: lưới danh mục giao diện
- `src/components/layout/app-shell.tsx`: shell phụ cho trang mục lục

## 8) Sự cố thường gặp

### 8.1 Lỗi `Could not read package.json`
Nguyên nhân: chạy sai thư mục.

Cách đúng:
```powershell
cd D:\PROJECT\chemistry-web\frontend
npm run dev
```

### 8.2 Không thấy giao diện mong muốn
- Truy cập thẳng `/interfaces`
- Kiểm tra route trong mục 4

### 8.3 Link nội bộ không chạy
- Kiểm tra đã dùng `Link` từ `next/link`
- Kiểm tra route có trong `appRoutes`
