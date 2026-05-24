import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Lesson Interface',
  description: 'Giao diện bài học dạng full view với outline chương và vùng nội dung chính.',
};

export default function LessonInterfacePage() {
  return (
    <div className="relative flex h-full min-h-screen flex-col overflow-hidden bg-surface text-on-surface md:flex-row">
      <div className="magical-float pointer-events-none absolute right-20 top-20 hidden text-primary opacity-20 md:block">
        <span className="material-symbols-outlined" style={{ fontSize: 64 }}>science</span>
      </div>
      <div className="magical-float-delayed pointer-events-none absolute bottom-40 left-80 hidden text-secondary opacity-20 md:block">
        <span className="material-symbols-outlined" style={{ fontSize: 48 }}>auto_awesome</span>
      </div>

      <nav id="course-outline" className="layer-1-card z-20 flex h-auto w-full flex-shrink-0 flex-col rounded-r-xl border-r-2 border-primary/10 bg-surface-container-lowest md:h-full md:w-80">
        <div className="flex items-center justify-between border-b-2 border-surface-variant bg-surface/50 p-6 backdrop-blur-sm">
          <div>
            <h2 className="font-headline-md text-headline-md text-primary">Periodic Trends</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Chapter 3 • 40% Complete</p>
          </div>
          <button className="p-2 text-on-surface-variant md:hidden">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6 h-3 w-full overflow-hidden rounded-full border-2 border-surface-variant bg-surface-variant">
            <div className="h-full rounded-full bg-gradient-to-r from-secondary-container to-primary-container" style={{ width: '40%' }} />
          </div>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto px-4 pb-6">
          <div className="cursor-pointer rounded-lg border-2 border-transparent p-3 text-on-surface-variant hover:bg-surface-variant">
            <span className="flex items-center gap-3"><span className="material-symbols-outlined text-secondary">check_circle</span>Introduction to Trends</span>
          </div>
          <div className="layer-1-card cursor-pointer rounded-lg border-2 border-primary/30 bg-primary-container/10 p-3 text-primary">
            <span className="flex items-center gap-3">
              <span className="material-symbols-outlined">play_circle</span>
              <span className="font-label-sm text-label-sm">Atomic Radius</span>
              <span className="ml-auto h-2 w-2 animate-pulse rounded-full bg-primary" />
            </span>
          </div>
          <div className="cursor-not-allowed rounded-lg p-3 text-outline"><span className="flex items-center gap-3"><span className="material-symbols-outlined">lock</span>Ionization Energy</span></div>
          <div className="cursor-not-allowed rounded-lg p-3 text-outline"><span className="flex items-center gap-3"><span className="material-symbols-outlined">lock</span>Electronegativity</span></div>
          <div className="cursor-not-allowed rounded-lg p-3 text-outline"><span className="flex items-center gap-3"><span className="material-symbols-outlined">lock</span>Chapter Quiz</span></div>
        </div>

        <div className="border-t-2 border-surface-variant bg-surface/50 p-4">
          <Link href={appRoutes.home} className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-transparent p-3 font-label-sm text-label-sm text-on-surface-variant hover:border-error/20 hover:bg-error-container hover:text-on-error-container">
            <span className="material-symbols-outlined">logout</span>
            Exit to Lab
          </Link>
        </div>
      </nav>

      <main className="relative flex h-full flex-1 flex-col overflow-y-auto bg-surface">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-surface/90 p-margin-mobile backdrop-blur-md md:px-margin-desktop md:py-6">
          <div className="flex items-center gap-4">
            <button className="rounded-full border-2 border-primary/20 bg-surface-container p-2 text-primary md:hidden">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="hidden items-center gap-2 font-label-sm text-label-sm text-on-surface-variant md:flex">
              <span className="material-symbols-outlined text-outline">book</span>
              <span>Lesson 2 of 5</span>
            </div>
          </div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary md:hidden">Atomic Radius</h1>
          <button className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-surface-variant bg-surface-container text-on-surface">
            <span className="material-symbols-outlined">help_outline</span>
          </button>
        </header>

        <div className="mx-auto flex w-full max-w-container-max flex-1 flex-col justify-center px-margin-mobile pb-24 md:px-margin-desktop">
          <section className="layer-1-card relative mb-8 overflow-hidden rounded-xl bg-surface-container-lowest p-6 md:p-10">
            <div className="absolute left-0 right-0 top-0 h-2 bg-gradient-to-r from-primary to-secondary-container" />
            <h1 className="mb-6 hidden font-display-lg text-display-lg text-on-background md:block">Atomic Radius</h1>
            <p className="mb-8 max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
              The atomic radius is a measure of the size of its atoms, usually the mean distance from the center of the nucleus to the surrounding shells of electrons.
            </p>
            <div className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-primary/20 bg-surface-container">
              <img
                alt="Atomic structure visual"
                className="absolute inset-0 h-full w-full object-cover opacity-80 mix-blend-multiply"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUgeOsCr07P5TBRa21ffkMtngDtG-Q3BJSwlsjyKXiBriU47rAXngf9-gKbBWOfy_a407hufjKAZMhdkPQVPlnuFO8NgclqjZsr0bk1FuVf3FoZHvAdpZ9taTEamSEZPJpZHxV89rcCezllUG5xjnTkfWe2GAV_nD51nmSAwV_SkxKSuFzzEfe2vZbvL5kpcAWLvDmMfnh9YGkYTof7YVilCbspRc-Lc1YUjD4dWgRBZgn1BuFRDE8kPqgP9l9g1941PNoLwvULMI"
              />
              <div className="absolute inset-0 bg-primary/10 transition-colors group-hover:bg-primary/20" />
              <button className="layer-1-card z-10 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-lowest text-primary shadow-primary squishy-btn">
                <span className="material-symbols-outlined" style={{ fontSize: 40, fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
              </button>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 rounded-full border-2 border-primary-fixed-dim bg-surface px-4 py-2 font-label-sm text-label-sm text-primary">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>lightbulb</span>Key Concept
              </div>
              <div className="flex items-center gap-2 rounded-full border-2 border-secondary-fixed-dim bg-surface px-4 py-2 font-label-sm text-label-sm text-secondary">
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>trending_down</span>Decreases left to right
              </div>
            </div>
          </section>
        </div>

        <div className="sticky bottom-0 z-10 w-full border-t-2 border-surface-variant bg-surface-container-lowest p-4 md:p-6">
          <div className="mx-auto flex max-w-container-max items-center justify-between gap-4">
            <button className="squishy-btn flex items-center gap-2 rounded-full border-2 border-outline-variant bg-surface px-6 py-3 font-label-sm text-label-sm text-on-surface-variant shadow-outline">
              <span className="material-symbols-outlined">arrow_back</span>
              <span className="hidden md:inline">Previous</span>
            </button>
            <button className="squishy-btn flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-primary-container bg-primary px-8 py-3 font-label-sm text-label-sm font-bold text-on-primary shadow-primary md:flex-none">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              Mark as Complete
            </button>
            <button className="squishy-btn flex cursor-not-allowed items-center gap-2 rounded-full border-2 border-primary/20 bg-surface-container px-6 py-3 font-label-sm text-label-sm text-primary opacity-50 shadow-primary">
              <span className="hidden md:inline">Next</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
