export const appRoutes = {
  home: '/',
  interfaces: '/interfaces',
  login: '/auth/login',
  register: '/auth/register',
  profile: '/profile',
  changePassword: '/profile/change-password',

  studentDashboard: '/dashboard/student',
  teacherDashboard: '/dashboard/teacher',
  schoolDashboard: '/dashboard/school',
  profileAchievements: '/learning/achievements',
  periodicTable: '/tools/periodic-table',

  experimentLibrary: '/experiments',
  launch3dLab: '/experiments/lab-3d',
  experimentResults: '/experiments/results',

  learningPathway: '/learning/pathway',
  learningLessons: '/learning/lessons',
  learningQuizzes: '/learning/quizzes',
  learningVideos: '/learning/videos',
  learningCommunity: '/community',
  scienceNewsBlog: '/blog',

  theoryCourseLibrary: '/courses',
  courseDetailEnrollment: '/courses/foundations-of-matter',
  courseBuilder: '/courses/builder',
  courseCreateEdit: '/courses/create',
  courseEdit: '/courses/foundations-of-matter/edit',
  courseCategories: '/courses/categories',
  createCategory: '/courses/categories/create',
  editCategory: '/courses/categories/inorganic-elements/edit',

  deleteConfirmation: '/admin/delete-confirmation',
  contentManagement: '/admin/content',
  classManagementDetailed: '/admin/classes',
  userManagement: '/admin/users',
  settingsCustomization: '/admin/settings',

  // Backward-compatible aliases for existing imports/screens.
  lessonInterface: '/learning/lessons',
  quizReview: '/learning/quizzes',
  videoLectureDetail: '/learning/videos',
  courseCategoryManagement: '/courses/categories',
  courseManagementCategories: '/courses/categories',
  createContent: '/admin/content',
  schoolPortal: '/dashboard/school',
} as const;

export type AppRouteKey = keyof typeof appRoutes;
export type AppRoutePath = (typeof appRoutes)[AppRouteKey];
