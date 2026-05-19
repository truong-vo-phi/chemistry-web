import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'Đánh Giá Bài Quiz | ChemLab 3D',
  description: 'Phân tích đáp án, giải thích kết quả và đề xuất nội dung ôn tập.',
};

const stats = [
  { icon: 'school', label: 'Trạng thái', value: 'Đang học' },
            { icon: 'trending_up', label: 'Tiến độ', value: '68%' },
            { icon: 'forum', label: 'Tương tác', value: 'Cao' }
];

export default function QuizReviewPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <header className="sticky top-0 z-40 border-b-2 border-surface-variant bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-container-max items-center justify-between gap-4 px-margin-mobile py-3 md:px-margin-desktop">
          <Link href={appRoutes.home} className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-on-primary-fixed-variant bg-primary-container shadow-[2px_2px_0px_0px_rgba(0,67,149,0.3)]">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                science
              </span>
            </div>
            <span className="font-headline-md text-headline-md font-bold text-primary">ChemLab 3D</span>
          </Link>

          <nav className="hidden items-center gap-4 md:flex">
            <Link className="rounded-full px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary" href={appRoutes.interfaces}>Tất cả giao diện</Link>
            <Link className="rounded-full px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary" href={appRoutes.learningPathway}>Học tập</Link>
            <Link className="rounded-full px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary" href={appRoutes.courseBuilder}>Biên soạn</Link>
            <Link className="rounded-full px-3 py-2 text-sm text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary" href={appRoutes.teacherDashboard}>Quản trị</Link>
          </nav>

          <Link href={appRoutes.profileAchievements} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-tertiary-fixed-dim bg-tertiary-container">
            <span className="material-symbols-outlined text-on-tertiary-container">person</span>
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-container-max px-margin-mobile py-8 md:px-margin-desktop">
        <section className="rounded-xl border-2 border-primary-fixed-dim bg-surface-container-lowest p-6 shadow-sm">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-on-surface-variant">Học viên</p>
          <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary md:font-headline-md md:text-headline-md">Đánh Giá Bài Quiz</h1>
          <p className="mt-3 max-w-3xl text-on-surface-variant">Phân tích đáp án, giải thích kết quả và đề xuất nội dung ôn tập.</p>
          <p className="mt-2 text-xs text-outline">Route: {appRoutes.quizReview}</p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={appRoutes.lessonInterface} className="rounded-full border-2 border-on-primary-fixed-variant bg-primary px-5 py-2 font-label-sm text-on-primary shadow-[0_4px_0_0_rgba(0,67,149,0.3)]">
              Quay lại bài học
            </Link>
            <Link href={appRoutes.learningPathway} className="rounded-full border-2 border-outline-variant bg-surface px-5 py-2 font-label-sm text-on-surface hover:bg-surface-container">
              Về lộ trình
            </Link>
            <Link href={appRoutes.videoLectureDetail} className="rounded-full border-2 border-outline-variant bg-surface px-5 py-2 font-label-sm text-on-surface hover:bg-surface-container">
              Xem lại bài giảng
            </Link>
          </div>
        </section>

        <section className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {stats.map((item) => (
            <article key={item.label} className="rounded-xl border-2 border-surface-variant bg-surface-container-lowest p-4 shadow-sm">
              <div className="mb-2 flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-xs uppercase tracking-wide text-on-surface-variant">{item.label}</span>
              </div>
              <p className="font-headline-md text-headline-md text-on-surface">{item.value}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
