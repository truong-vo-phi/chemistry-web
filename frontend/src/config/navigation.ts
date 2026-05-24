import { appRoutes } from './site-routes';

export type InterfaceItem = {
  title: string;
  path: string;
  description: string;
};

export type InterfaceGroup = {
  group: string;
  items: InterfaceItem[];
};

export const interfaceGroups: InterfaceGroup[] = [
  {
    group: 'Trang chính',
    items: [
      { title: 'Trang chủ', path: appRoutes.home, description: 'Trang landing tổng quan của ChemLab 3D.' },
      { title: 'Bảng điều hướng giao diện', path: appRoutes.interfaces, description: 'Danh sách toàn bộ giao diện chức năng.' },
    ],
  },
  {
    group: 'Học viên',
    items: [
      { title: 'Student Dashboard', path: appRoutes.studentDashboard, description: 'Bảng điều khiển chính cho học viên.' },
      { title: 'Profile & Achievements', path: appRoutes.profileAchievements, description: 'Hồ sơ và huy hiệu thành tích.' },
      { title: 'Periodic Table', path: appRoutes.periodicTable, description: 'Tra cứu bảng tuần hoàn tương tác.' },
      { title: 'Learning Pathway', path: appRoutes.learningPathway, description: 'Lộ trình học theo module.' },
      { title: 'Learning Community', path: appRoutes.learningCommunity, description: 'Không gian lớp học/cộng đồng.' },
      { title: 'Lesson Interface', path: appRoutes.lessonInterface, description: 'Màn hình học bài chi tiết.' },
      { title: 'Quiz Review', path: appRoutes.quizReview, description: 'Xem lại kết quả bài quiz.' },
      { title: 'Video Lecture Detail', path: appRoutes.videoLectureDetail, description: 'Trang chi tiết video bài giảng.' },
      { title: 'Science News Blog', path: appRoutes.scienceNewsBlog, description: 'Tin tức/tài nguyên khoa học.' },
      { title: 'Experiment Library', path: appRoutes.experimentLibrary, description: 'Thư viện thí nghiệm.' },
      { title: 'Launch 3D Lab', path: appRoutes.launch3dLab, description: 'Trang khởi chạy phòng lab 3D.' },
      { title: 'Experiment Results', path: appRoutes.experimentResults, description: 'Thống kê và kết quả thí nghiệm.' },
    ],
  },
  {
    group: 'Khóa học',
    items: [
      { title: 'Theory Course Library', path: appRoutes.theoryCourseLibrary, description: 'Thư viện khóa học lý thuyết.' },
      { title: 'Course Detail & Enrollment', path: appRoutes.courseDetailEnrollment, description: 'Chi tiết khóa học và đăng ký.' },
      { title: 'Course Category Management', path: appRoutes.courseCategoryManagement, description: 'Quản lý danh mục khóa học.' },
      { title: 'Course Management Categories', path: appRoutes.courseManagementCategories, description: 'Màn hình quản lý danh mục mở rộng.' },
    ],
  },
  {
    group: 'Biên soạn/Nội dung',
    items: [
      { title: 'Course Builder', path: appRoutes.courseBuilder, description: 'Trình xây dựng nội dung khóa học.' },
      { title: 'Course Create & Edit', path: appRoutes.courseCreateEdit, description: 'Tạo/chỉnh sửa khóa học dạng form.' },
      { title: 'Create Category', path: appRoutes.createCategory, description: 'Tạo danh mục mới (giữ giao diện hiện tại).' },
      { title: 'Edit Category', path: appRoutes.editCategory, description: 'Chỉnh sửa danh mục hiện có.' },
      { title: 'Delete Confirmation', path: appRoutes.deleteConfirmation, description: 'Xác nhận xóa danh mục.' },
      { title: 'Content Management', path: appRoutes.contentManagement, description: 'Quản lý nội dung học tập.' },
      { title: 'Create Content', path: appRoutes.createContent, description: 'Tạo nội dung bài học/thí nghiệm.' },
    ],
  },
  {
    group: 'Quản trị',
    items: [
      { title: 'Teacher Dashboard', path: appRoutes.teacherDashboard, description: 'Bảng điều khiển cho giáo viên/quản trị.' },
      { title: 'Class Management Detailed', path: appRoutes.classManagementDetailed, description: 'Quản lý lớp học chi tiết.' },
      { title: 'User Management', path: appRoutes.userManagement, description: 'Quản lý tài khoản người dùng.' },
      { title: 'School Portal', path: appRoutes.schoolPortal, description: 'Cổng quản trị trường/hệ thống.' },
      { title: 'Settings Customization', path: appRoutes.settingsCustomization, description: 'Thiết lập và tuỳ biến hệ thống.' },
    ],
  },
];
