import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'Course Library | ChemLab 3D',
  description: 'Thư viện khóa học lý thuyết với danh mục, cấp độ và thẻ khóa học.',
};

const courses = [
  {
    title: 'Foundations of Matter',
    desc: 'Master the periodic table and the basic building blocks of our world.',
    badge: 'Inorganic',
    teacher: 'Prof. Proton',
    learners: '1.2k',
    color: 'border-primary-fixed bg-primary-fixed',
  },
  {
    title: 'Carbon Quest',
    desc: 'Explore the living chemistry of carbon and complex hydrocarbons.',
    badge: 'Organic',
    teacher: 'Dr. Bloom',
    learners: '850',
    color: 'border-secondary-container bg-secondary-container',
  },
  {
    title: 'Thermodynamics 101',
    desc: 'Unlock the secrets of heat, energy, and work in chemical systems.',
    badge: 'Physical',
    teacher: 'Prof. Spark',
    learners: '2.4k',
    color: 'border-tertiary-fixed bg-tertiary-fixed',
  },
  {
    title: 'Laboratory Safety',
    desc: 'Crucial protocols for every wizard of the workbench. Stay safe!',
    badge: 'Lab Skills',
    teacher: 'Officer Beaker',
    learners: '5.1k',
    color: 'border-error-container bg-error-container',
  },
  {
    title: 'Crystal Lattices',
    desc: 'Deep dive into solid-state chemistry and crystalline arrangements.',
    badge: 'Advanced',
    teacher: 'Dr. Quartz',
    learners: '420',
    color: 'border-primary-fixed-dim bg-primary-fixed-dim',
  },
  {
    title: 'pH Power',
    desc: 'Everything you need to know about Acids, Bases, and the pH scale.',
    badge: 'Acids',
    teacher: 'Ms. Litmus',
    learners: '1.8k',
    color: 'border-secondary-fixed-dim bg-secondary-fixed-dim',
  },
];

export default function TheoryCourseLibraryPage() {
  return (
    <div className="flex min-h-screen bg-background text-on-surface">
      <aside className="hidden w-64 flex-col gap-gutter border-r-2 border-secondary-container bg-surface-container-low p-unit shadow-md md:flex">
        <div className="flex items-center gap-3 px-2 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
            <span className="material-symbols-outlined">science</span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md text-primary">ChemLab 3D</h1>
            <p className="text-xs text-on-surface-variant">Magical Academy</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-2">
          <Link className="rounded-lg px-4 py-3 text-on-surface-variant hover:bg-secondary-fixed-dim/20" href={appRoutes.launch3dLab}>Laboratory</Link>
          <Link className="rounded-lg px-4 py-3 text-on-surface-variant hover:bg-secondary-fixed-dim/20" href={appRoutes.classManagementDetailed}>Classroom</Link>
          <Link className="rounded-lg bg-secondary-container px-4 py-3 font-bold text-on-secondary-container" href={appRoutes.theoryCourseLibrary}>Course Library</Link>
          <Link className="rounded-lg px-4 py-3 text-on-surface-variant hover:bg-secondary-fixed-dim/20" href={appRoutes.teacherDashboard}>Analytics</Link>
        </nav>
        <div className="border-t border-surface-variant pt-4">
          <Link className="block rounded-lg px-4 py-3 text-on-surface-variant hover:bg-secondary-fixed-dim/20" href={appRoutes.settingsCustomization}>Settings</Link>
          <Link className="mt-2 block rounded-lg px-4 py-3 text-on-surface-variant hover:bg-secondary-fixed-dim/20" href={appRoutes.learningCommunity}>Support</Link>
        </div>
      </aside>

      <main className="flex flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b-2 border-surface-variant bg-background px-gutter py-4">
          <div className="mx-auto flex w-full max-w-container-max items-center justify-between gap-4">
            <div className="relative w-full max-w-md">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input
                className="w-full rounded-full border-2 border-transparent bg-surface-container-high py-2 pl-12 pr-4 outline-none focus:border-primary"
                placeholder="Search magical theories..."
                type="text"
              />
            </div>
            <div className="flex items-center gap-3">
              <Link className="rounded-full p-2 hover:bg-surface-container-high" href={appRoutes.learningCommunity}>
                <span className="material-symbols-outlined">notifications</span>
              </Link>
              <Link className="rounded-full border-2 border-primary px-4 py-2 text-sm font-bold text-primary" href={appRoutes.interfaces}>
                All Interfaces
              </Link>
            </div>
          </div>
        </header>

        <div className="mx-auto w-full max-w-container-max px-gutter py-8">
          <div className="mb-8">
            <h2 className="font-display-lg-mobile text-display-lg-mobile text-primary md:font-display-lg md:text-display-lg">Library of Elements</h2>
            <p className="max-w-2xl text-on-surface-variant">
              Discover the secrets of the universe through our interactive theory courses. Each lesson is a step closer to becoming a Master Alchemist.
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row">
            <aside className="w-full lg:w-64">
              <div className="sticky top-28 rounded-lg border-2 border-surface-variant bg-surface-container-low p-6">
                <h3 className="mb-4 font-headline-md text-headline-md">Categories</h3>
                <div className="flex flex-wrap gap-2 lg:flex-col">
                  <button className="rounded-full border-2 border-primary-container bg-primary px-4 py-2 font-bold text-white">All Courses</button>
                  <button className="rounded-full px-4 py-2 text-on-surface-variant hover:bg-white">Inorganic</button>
                  <button className="rounded-full px-4 py-2 text-on-surface-variant hover:bg-white">Organic</button>
                  <button className="rounded-full px-4 py-2 text-on-surface-variant hover:bg-white">Physical Chem</button>
                </div>
              </div>
            </aside>

            <section className="grid flex-1 grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {courses.map((course) => (
                <article key={course.title} className={`course-card flex flex-col rounded-lg border-2 bg-white p-4 ${course.color}`}>
                  <div className={`mb-4 h-40 w-full rounded-lg ${course.color.split(' ')[1]} relative`}>
                    <span className="absolute right-3 top-3 rounded-full bg-black/60 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {course.badge}
                    </span>
                  </div>
                  <h4 className="mb-1 font-headline-md text-headline-md">{course.title}</h4>
                  <p className="mb-4 flex-1 text-on-surface-variant">{course.desc}</p>
                  <div className="mt-auto flex items-center justify-between border-t border-surface-container pt-4 text-sm">
                    <span>{course.teacher}</span>
                    <span className="flex items-center gap-1 text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">group</span>
                      {course.learners}
                    </span>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
