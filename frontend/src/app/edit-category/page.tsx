import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'Edit Category - Inorganic Elements',
  description: 'Giao diện chỉnh sửa danh mục theo phong cách Magical Academy ban đầu.',
};

const lessons = [
  ['Metals & Ores', 'Level 1', '15 Mins', 'matter'],
  ['The Halogens', 'Level 2', '20 Mins', 'water_drop'],
  ['Noble Gases', 'Level 1', '18 Mins', 'diamond'],
  ['Transition Metals', 'Level 3', '24 Mins', 'electric_bolt'],
  ['Crystal Lattice', 'Level 2', '30 Mins', 'bubble_chart'],
  ['Nitrogen Cycle', 'Level 2', '22 Mins', 'filter_drama'],
] as const;

export default function EditCategoryPage() {
  return (
    <div className="bg-surface font-body-md text-on-surface">
      <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col gap-unit border-r border-outline-variant/30 bg-surface-container-low p-gutter md:flex">
        <div className="mb-gutter flex items-center gap-3">
          <div className="flex h-12 w-12 rotate-3 items-center justify-center rounded-2xl bg-primary shadow-lg">
            <span className="material-symbols-outlined text-3xl text-on-primary">school</span>
          </div>
          <div>
            <h1 className="text-[20px] font-display-lg text-primary">Magical Academy</h1>
            <p className="font-label-sm text-on-surface-variant opacity-70">Master Alchemist</p>
          </div>
        </div>
        <nav className="flex-grow space-y-3">
          <Link className="sidebar-active flex items-center gap-3 rounded-2xl border border-secondary/20 p-4 font-label-sm text-on-secondary-container" href={appRoutes.courseCategoryManagement}>Laboratory</Link>
          <Link className="flex items-center gap-3 rounded-2xl p-4 font-label-sm text-on-surface-variant hover:bg-surface-container-high" href={appRoutes.theoryCourseLibrary}>Spellbook</Link>
          <Link className="flex items-center gap-3 rounded-2xl p-4 font-label-sm text-on-surface-variant hover:bg-surface-container-high" href={appRoutes.schoolPortal}>Academy</Link>
        </nav>
      </aside>

      <header className="sticky top-0 z-40 h-20 border-b border-outline-variant/20 bg-surface/60 backdrop-blur-xl md:pl-64">
        <div className="flex h-full items-center justify-between px-margin-mobile md:px-margin-desktop">
          <h2 className="font-headline-md text-headline-md text-primary">Edit Category</h2>
          <div className="flex items-center gap-4">
            <Link className="rounded-full border-2 border-outline-variant px-4 py-2 text-sm" href={appRoutes.createCategory}>Create New</Link>
            <Link className="rounded-full border-2 border-error/30 bg-error-container/40 px-4 py-2 text-sm text-error" href={appRoutes.deleteConfirmation}>Delete</Link>
          </div>
        </div>
      </header>

      <main className="pb-24 md:pl-64 md:pb-12">
        <div className="mx-auto max-w-container-max px-margin-mobile py-gutter md:px-margin-desktop">
          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
            <div className="space-y-gutter lg:col-span-5">
              <section className="glass-morphism relative overflow-hidden rounded-3xl border border-white/40 p-gutter">
                <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
                <h3 className="mb-8 flex items-center gap-2 font-headline-md text-on-surface">
                  <span className="material-symbols-outlined text-primary">edit_note</span>
                  Category Details
                </h3>
                <div className="space-y-8">
                  <div>
                    <label className="ml-2 block text-[10px] font-label-sm uppercase tracking-widest text-on-surface-variant">Category Name</label>
                    <input className="mt-3 h-14 w-full rounded-2xl border border-outline-variant/40 bg-white/50 px-6 text-on-surface" defaultValue="Inorganic Elements" />
                  </div>
                  <div>
                    <label className="ml-2 block text-[10px] font-label-sm uppercase tracking-widest text-on-surface-variant">Assigned Icon</label>
                    <div className="mt-3 grid grid-cols-4 gap-4 rounded-2xl border border-outline-variant/20 bg-surface-container-low/40 p-5">
                      <div className="flex scale-105 flex-col items-center justify-center rounded-xl bg-primary p-3 text-on-primary shadow-lg ring-4 ring-primary/20">
                        <span className="material-symbols-outlined text-[32px]">flare</span>
                        <span className="mt-1 text-[8px] font-bold uppercase">Selected</span>
                      </div>
                      {['science', 'experiment', 'biotech'].map((icon) => (
                        <button key={icon} className="group flex items-center justify-center rounded-xl bg-white/40 p-3 text-on-surface-variant hover:bg-white">
                          <span className="material-symbols-outlined text-[32px] group-hover:text-primary">{icon}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 pt-4">
                    <button className="squishy-btn primary-glow h-16 w-full rounded-2xl border-b-4 border-black/20 bg-primary font-label-sm text-on-primary shadow-[0_4px_12px_rgba(0,88,190,0.3)]">Save Changes</button>
                    <button className="squishy-btn red-glass h-16 w-full rounded-2xl border border-error/30 font-label-sm text-error">Delete Category</button>
                  </div>
                </div>
              </section>

              <section className="relative overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm">
                <h4 className="mb-8 flex items-center gap-3 font-headline-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary">analytics</span>
                  Engagement Stats
                </h4>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-4 border-primary-fixed text-sm font-bold text-primary">75%</div>
                    <p className="text-[10px] uppercase text-outline">Active Rate</p>
                    <p className="text-2xl font-bold text-primary">1,248</p>
                  </div>
                  <div className="text-center">
                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-4 border-secondary-fixed text-sm font-bold text-secondary">88%</div>
                    <p className="text-[10px] uppercase text-outline">Avg Score</p>
                    <p className="text-2xl font-bold text-secondary">88%</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="lg:col-span-7">
              <section className="flex h-full flex-col overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface-container-lowest shadow-sm">
                <div className="flex items-center justify-between border-b border-outline-variant/10 bg-gradient-to-r from-surface-bright to-white p-8">
                  <div>
                    <h3 className="font-headline-md text-on-surface">Associated Lessons</h3>
                    <p className="font-label-sm text-on-surface-variant opacity-60">24 lessons currently active</p>
                  </div>
                  <button className="squishy-btn primary-glow flex items-center gap-2 rounded-2xl border-b-2 border-secondary/40 bg-secondary-container p-4 font-label-sm text-on-secondary-container shadow-md">
                    <span className="material-symbols-outlined">add</span>
                    New Lesson
                  </button>
                </div>
                <div className="custom-scrollbar grid max-h-[750px] flex-grow grid-cols-1 gap-6 overflow-y-auto p-8 sm:grid-cols-2">
                  {lessons.map(([name, level, time, icon]) => (
                    <article key={name} className="floating-tile group flex cursor-pointer items-center gap-5 rounded-2xl border border-outline-variant/10 bg-white p-5">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/5 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                        <span className="material-symbols-outlined text-2xl">{icon}</span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-label-sm text-on-surface transition-colors group-hover:text-primary">{name}</h4>
                        <div className="mt-1 flex items-center gap-2">
                          <span className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${level === 'Level 3' ? 'bg-error/10 text-error' : 'bg-secondary-container/30 text-secondary'}`}>{level}</span>
                          <span className="text-[11px] text-outline">{time}</span>
                        </div>
                      </div>
                      <span className="material-symbols-outlined text-outline/30 opacity-0 transition-all group-hover:opacity-100">drag_indicator</span>
                    </article>
                  ))}
                </div>
                <div className="border-t border-outline-variant/10 bg-surface-container-low/30 p-6 text-center">
                  <button className="text-xs font-bold uppercase tracking-tighter text-primary">Reorder Lessons List</button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
