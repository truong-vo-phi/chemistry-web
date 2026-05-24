import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'Course Detail & Enrollment | ChemLab 3D',
  description: 'Trang chi tiết khóa học và đăng ký theo UI chức năng riêng.',
};

export default function CourseDetailEnrollmentPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <header className="sticky top-0 z-30 border-b-2 border-surface-variant bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-container-max items-center justify-between px-margin-mobile py-4 md:px-margin-desktop">
          <Link href={appRoutes.theoryCourseLibrary} className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined">arrow_back</span>
            <span className="font-label-sm">Back to Library</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href={appRoutes.lessonInterface} className="rounded-full border-2 border-outline-variant px-4 py-2 text-sm">Preview Lesson</Link>
            <button className="rounded-full border-2 border-primary-fixed-dim bg-primary px-5 py-2 text-sm font-bold text-on-primary">Enroll Now</button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-container-max grid-cols-1 gap-gutter px-margin-mobile py-8 md:px-margin-desktop lg:grid-cols-12">
        <section className="lg:col-span-8 rounded-3xl border-2 border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm">
          <span className="mb-3 inline-block rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-on-secondary-container">Inorganic</span>
          <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary md:font-display-lg md:text-display-lg">Foundations of Matter</h1>
          <p className="mt-4 text-on-surface-variant">
            Build a deep understanding of atoms, periodic trends, bonding, and reaction basics with interactive lessons tailored for grade 9-10 learners.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-outline-variant/20 bg-surface p-4 text-center">
              <p className="text-xs uppercase text-on-surface-variant">Lessons</p>
              <p className="text-2xl font-bold text-primary">24</p>
            </div>
            <div className="rounded-2xl border border-outline-variant/20 bg-surface p-4 text-center">
              <p className="text-xs uppercase text-on-surface-variant">Duration</p>
              <p className="text-2xl font-bold text-primary">8h</p>
            </div>
            <div className="rounded-2xl border border-outline-variant/20 bg-surface p-4 text-center">
              <p className="text-xs uppercase text-on-surface-variant">Students</p>
              <p className="text-2xl font-bold text-primary">1.2k</p>
            </div>
            <div className="rounded-2xl border border-outline-variant/20 bg-surface p-4 text-center">
              <p className="text-xs uppercase text-on-surface-variant">Rating</p>
              <p className="text-2xl font-bold text-primary">4.8</p>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-primary/20 bg-primary-fixed/20 p-5">
            <h2 className="font-headline-md text-on-surface">What you&apos;ll learn</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-on-surface-variant">
              <li>Atomic structure and periodic table logic</li>
              <li>Common reaction types with safe laboratory simulations</li>
              <li>Problem-solving through interactive quizzes and tasks</li>
            </ul>
          </div>
        </section>

        <aside className="space-y-gutter lg:col-span-4">
          <section className="rounded-3xl border-2 border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
            <h3 className="mb-4 font-headline-md text-on-surface">Instructor</h3>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary-fixed" />
              <div>
                <p className="font-label-sm text-on-surface">Prof. Proton</p>
                <p className="text-sm text-on-surface-variant">Lead Chemistry Teacher</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border-2 border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
            <h3 className="mb-4 font-headline-md text-on-surface">Actions</h3>
            <div className="space-y-3">
              <button className="w-full rounded-full border-2 border-primary-fixed-dim bg-primary px-4 py-3 font-label-sm text-on-primary">Enroll Course</button>
              <Link href={appRoutes.lessonInterface} className="block w-full rounded-full border-2 border-outline-variant px-4 py-3 text-center font-label-sm">Open Lesson UI</Link>
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
