import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../../config/site-routes';

export const metadata: Metadata = {
  title: 'Quizzes & Review | ChemLab 3D',
};

export default function QuizReviewDetailPage() {
  return (
    <div className="bg-background min-h-screen text-on-background font-body-md text-body-md pb-24 md:pb-0">
      <nav className="hidden md:flex justify-between items-center w-full px-margin-desktop py-2 max-w-container-max mx-auto rounded-full my-4 border-2 border-primary/20 bg-surface/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="font-headline-md text-headline-md font-bold text-primary">ChemLab 3D</div>
        <div className="flex space-x-6 items-center">
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href={appRoutes.studentDashboard}>Dashboard</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href={appRoutes.experimentLibrary}>Experiments</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href={appRoutes.learningPathway}>Curriculum</Link>
          <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href={appRoutes.learningCommunity}>Resources</Link>
          <Link className="text-primary font-bold border-b-2 border-primary pb-1 font-label-sm text-label-sm" href={appRoutes.quizReview}>Support</Link>
        </div>
        <div>
          <Link
            className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm text-label-sm border-2 border-[#004395] shadow-[0_4px_0_0_rgba(0,67,149,0.3)] active:shadow-none active:translate-y-1 transition-all"
            href={appRoutes.launch3dLab}
          >
            Launch Lab
          </Link>
        </div>
      </nav>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-8 md:pt-12">
        <header className="mb-12">
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background mb-2">Quizzes &amp; Review</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Test your knowledge, review past experiments, and conquer the weekly chemical challenges. Let&apos;s make some reactions happen!
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
          <section className="md:col-span-8 bg-surface-container-lowest rounded-[2rem] border-2 border-primary/20 shadow-sm p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="inline-flex items-center gap-2 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full font-label-sm text-label-sm mb-4">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
                Weekly Challenge
              </div>
              <h2 className="font-headline-md text-headline-md text-on-background mb-4">The Stoichiometry Sprint</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md">
                Balance 5 complex equations in under 3 minutes to earn the &apos;Alchemist&apos; badge and 500 lab points.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-sm text-label-sm border-2 border-[#004395] shadow-[0_4px_0_0_rgba(0,67,149,0.3)] active:shadow-none active:translate-y-1 transition-all inline-flex items-center gap-2">
                Start Challenge
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <span className="text-on-surface-variant font-label-sm text-label-sm">Ends in 2 days</span>
            </div>
            <img
              alt="Abstract 3D rendering of chemical compounds glowing in soft lighting"
              className="absolute -right-8 -bottom-8 w-64 h-64 object-cover rounded-full opacity-50 pointer-events-none hidden md:block"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBonbWcyypdgCwr2qX9-J98kHB6_Ea2pYoHwHyXqL1YE6RVW7YR3XkFmqXJksCTSibhdovFGEMOefeImO8bndlzPO-bv9e6r4IyaTGpyFPhJRgkgUFLOo-QtivrqWO48NeW48R3lIcT3vq0GNfqz19H2vynK7rVxH0L4DZ8uqIXx-tY7bXtllSS-O60KiBjENe6S6AEt2IG1Jt3uFPNl6mE6h2AtkB9F3nonC3bHtnH75dW5-NqYz9pcmd9WEkbcnv8DN3ZINvcSpg"
            />
          </section>

          <section className="md:col-span-4 bg-surface-container-lowest rounded-[2rem] border-2 border-outline-variant shadow-sm p-6 flex flex-col">
            <h3 className="font-headline-md text-headline-md text-on-background mb-6">Performance</h3>
            <div className="space-y-6 flex-1">
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Atomic Knowledge</span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">85%</span>
                </div>
                <div className="w-full bg-surface-variant h-3 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-secondary-container to-primary h-full rounded-full w-[85%]" /></div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Molecular Precision</span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">62%</span>
                </div>
                <div className="w-full bg-surface-variant h-3 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-tertiary-container to-tertiary h-full rounded-full w-[62%]" /></div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Lab Safety</span>
                  <span className="font-label-sm text-label-sm text-primary font-bold">98%</span>
                </div>
                <div className="w-full bg-surface-variant h-3 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-secondary to-secondary-container h-full rounded-full w-[98%]" /></div>
              </div>
            </div>
          </section>

          <div className="md:col-span-12 mt-8 mb-4">
            <h2 className="font-headline-md text-headline-md text-on-background flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">quiz</span>
              Active Quizzes
            </h2>
          </div>

          <div className="md:col-span-4 bg-surface-container-lowest rounded-[1rem] border-2 border-[#adc6ff] shadow-sm p-6 hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-primary-container/20 flex items-center justify-center mb-4 group-hover:bg-primary-container/30 transition-colors"><span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>science</span></div>
            <h3 className="font-label-sm text-label-sm text-on-background font-bold mb-1">Acids &amp; Bases</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 text-sm">Identify pH levels and common household reactions.</p>
            <div className="flex items-center justify-between mt-auto"><span className="text-xs font-label-sm text-outline px-2 py-1 bg-surface-variant rounded-md">15 Questions</span><span className="material-symbols-outlined text-primary">arrow_forward</span></div>
          </div>

          <div className="md:col-span-4 bg-surface-container-lowest rounded-[1rem] border-2 border-[#ffb95f] shadow-sm p-6 hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-tertiary-container/20 flex items-center justify-center mb-4 group-hover:bg-tertiary-container/30 transition-colors"><span className="material-symbols-outlined text-tertiary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>view_in_ar</span></div>
            <h3 className="font-label-sm text-label-sm text-on-background font-bold mb-1">Covalent Bonds</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 text-sm">Master the sharing of electron pairs between atoms.</p>
            <div className="flex items-center justify-between mt-auto"><span className="text-xs font-label-sm text-outline px-2 py-1 bg-surface-variant rounded-md">10 Questions</span><span className="material-symbols-outlined text-tertiary">arrow_forward</span></div>
          </div>

          <div className="md:col-span-4 bg-surface-container-lowest rounded-[1rem] border-2 border-[#6cf8bb] shadow-sm p-6 hover:-translate-y-1 transition-transform cursor-pointer group">
            <div className="w-16 h-16 rounded-full bg-secondary-container/30 flex items-center justify-center mb-4 group-hover:bg-secondary-container/50 transition-colors"><span className="material-symbols-outlined text-secondary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span></div>
            <h3 className="font-label-sm text-label-sm text-on-background font-bold mb-1">Organic Chemistry I</h3>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4 text-sm">Carbon structures, nomenclature, and basic functional groups.</p>
            <div className="flex items-center justify-between mt-auto"><span className="text-xs font-label-sm text-outline px-2 py-1 bg-surface-variant rounded-md">20 Questions</span><span className="material-symbols-outlined text-secondary">arrow_forward</span></div>
          </div>
        </div>
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 rounded-t-lg bg-surface border-t-2 border-surface-variant shadow-[0_-4px_12px_0_rgba(0,0,0,0.05)] flex justify-around items-center h-16 px-margin-mobile">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all" href={appRoutes.studentDashboard}>
          <span className="material-symbols-outlined text-xl mb-1">dashboard</span>
          <span className="font-label-sm text-label-sm text-[10px]">Home</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all" href={appRoutes.experimentLibrary}>
          <span className="material-symbols-outlined text-xl mb-1">science</span>
          <span className="font-label-sm text-label-sm text-[10px]">Labs</span>
        </Link>
        <Link className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 hover:bg-surface-container-high transition-all scale-90 duration-100" href={appRoutes.quizReview}>
          <span className="material-symbols-outlined text-xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
          <span className="font-label-sm text-label-sm text-[10px]">Study</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all" href={appRoutes.learningPathway}>
          <span className="material-symbols-outlined text-xl mb-1">folder_open</span>
          <span className="font-label-sm text-label-sm text-[10px]">Files</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high transition-all" href={appRoutes.learningCommunity}>
          <span className="material-symbols-outlined text-xl mb-1">support_agent</span>
          <span className="font-label-sm text-label-sm text-[10px]">Help</span>
        </Link>
      </nav>
    </div>
  );
}
