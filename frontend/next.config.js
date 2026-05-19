/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      { source: '/student-dashboard', destination: '/dashboard/student', permanent: true },
      { source: '/teacher-dashboard', destination: '/dashboard/teacher', permanent: true },
      { source: '/school-portal', destination: '/dashboard/school', permanent: true },

      { source: '/learning-pathway', destination: '/learning/pathway', permanent: true },
      { source: '/lesson-interface', destination: '/learning/lessons', permanent: true },
      { source: '/video-lecture-detail', destination: '/learning/videos', permanent: true },
      { source: '/quiz-review', destination: '/learning/quizzes', permanent: true },
      { source: '/profile-achievements', destination: '/learning/achievements', permanent: true },

      { source: '/theory-course-library', destination: '/courses', permanent: true },
      { source: '/course-builder', destination: '/courses/builder', permanent: true },
      { source: '/course-create-edit', destination: '/courses/create', permanent: true },
      { source: '/course-category-management', destination: '/courses/categories', permanent: true },
      { source: '/course-management-categories', destination: '/courses/categories', permanent: true },
      { source: '/create-category', destination: '/courses/categories/create', permanent: true },
      { source: '/edit-category', destination: '/courses/categories/inorganic-elements/edit', permanent: true },

      { source: '/experiment-library', destination: '/experiments', permanent: true },
      { source: '/launch-3d-lab', destination: '/experiments/lab-3d', permanent: true },
      { source: '/experiment-results', destination: '/experiments/results', permanent: true },

      { source: '/periodic-table', destination: '/tools/periodic-table', permanent: true },

      { source: '/user-management', destination: '/admin/users', permanent: true },
      { source: '/content-management', destination: '/admin/content', permanent: true },
      { source: '/create-content', destination: '/admin/content', permanent: true },
      { source: '/settings-customization', destination: '/admin/settings', permanent: true },
      { source: '/delete-confirmation', destination: '/admin/delete-confirmation', permanent: true },

      { source: '/learning-community', destination: '/community', permanent: true },
      { source: '/science-news-blog', destination: '/blog', permanent: true },

      { source: '/course-detail-enrollment', destination: '/courses/foundations-of-matter', permanent: true },
    ];
  },
};

module.exports = nextConfig;
