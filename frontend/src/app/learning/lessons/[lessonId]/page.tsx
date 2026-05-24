import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Lesson Interface',
};

export default function LessonInterfacePage() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col pt-16 pl-0 md:pl-72">
      <nav className="hidden md:flex fixed w-full top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm justify-between items-center px-gutter h-16 left-0">
        <div className="flex items-center gap-4"><span className="text-headline-md font-headline-md font-bold text-primary">ChemLab 3D</span></div>
        <div className="flex gap-8">
          <Link className="text-on-surface-variant hover:text-primary" href={appRoutes.experimentLibrary}>Experiments</Link>
          <Link className="text-primary font-bold border-b-2 border-primary" href={appRoutes.learningPathway}>Curriculum</Link>
          <Link className="text-on-surface-variant hover:text-primary" href={appRoutes.learningCommunity}>Resources</Link>
          <Link className="text-on-surface-variant hover:text-primary" href={appRoutes.settingsCustomization}>Support</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-on-surface-variant hover:text-primary hover:bg-primary-container/20 p-2 rounded-full"><span className="material-symbols-outlined">notifications</span></button>
          <button className="text-on-surface-variant hover:text-primary hover:bg-primary-container/20 p-2 rounded-full"><span className="material-symbols-outlined">account_circle</span></button>
          <Link href={appRoutes.launch3dLab} className="bg-primary text-on-primary px-6 py-2 rounded-full shadow-sm hover:shadow-md text-label-sm font-label-sm">Launch Lab</Link>
        </div>
      </nav>

      <nav className="hidden md:flex flex-col h-[calc(100vh-32px)] w-64 m-4 rounded-xl fixed left-0 top-16 z-40 bg-surface/90 backdrop-blur-2xl shadow-xl border border-white/20 py-4">
        <div className="px-6 py-4 mb-4"><h2 className="text-headline-md font-headline-md font-bold text-primary">ChemLab 3D</h2><p className="text-body-md font-body-md text-on-surface-variant mt-1">Active Session</p></div>
        <div className="flex-1 flex flex-col gap-1 overflow-y-auto px-2">
          <Link className="text-on-surface-variant hover:bg-surface-container-highest/50 rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3" href={appRoutes.studentDashboard}><span className="material-symbols-outlined">dashboard</span>Dashboard</Link>
          <Link className="text-on-surface-variant hover:bg-surface-container-highest/50 rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3" href={appRoutes.launch3dLab}><span className="material-symbols-outlined">science</span>Experiment Lab</Link>
          <Link className="bg-primary-container text-on-primary-container font-semibold rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3 translate-x-1" href={appRoutes.learningPathway}><span className="material-symbols-outlined">groups</span>Classroom</Link>
          <Link className="text-on-surface-variant hover:bg-surface-container-highest/50 rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3" href={appRoutes.teacherDashboard}><span className="material-symbols-outlined">leaderboard</span>Analytics</Link>
          <Link className="text-on-surface-variant hover:bg-surface-container-highest/50 rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3" href={appRoutes.settingsCustomization}><span className="material-symbols-outlined">settings</span>Settings</Link>
        </div>
        <div className="mt-auto px-4 mb-4"><Link href={appRoutes.launch3dLab} className="w-full bg-secondary text-on-secondary py-3 rounded-full text-label-sm font-label-sm font-bold shadow-md block text-center">Start Reaction</Link></div>
        <div className="border-t border-outline-variant/30 pt-2 px-2 pb-4 flex flex-col gap-1">
          <Link className="text-on-surface-variant hover:bg-surface-container-highest/50 rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3" href={appRoutes.learningCommunity}><span className="material-symbols-outlined">help</span>Help</Link>
          <Link className="text-on-surface-variant hover:bg-surface-container-highest/50 rounded-lg mx-2 my-1 px-4 py-3 flex items-center gap-3" href={appRoutes.home}><span className="material-symbols-outlined">logout</span>Sign Out</Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col p-margin-mobile md:p-margin-desktop overflow-x-hidden relative">
        <header className="mb-8">
          <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-primary mb-2">Curriculum Journey</h1>
          <p className="text-body-lg font-body-lg text-on-surface-variant max-w-2xl">Master the elements of chemistry through interactive modules. Follow the pathway to unlock new reactions and theories.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 flex-1">
          <div className="flex-1 bg-surface-container-lowest rounded-xl border-2 border-outline-variant/30 shadow-sm p-8 relative overflow-hidden flex flex-col items-center min-h-[600px]">
            <svg className="absolute top-0 left-0 w-full h-full text-surface-container-high z-0" fill="none" preserveAspectRatio="none" stroke="currentColor" strokeDasharray="24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="12" viewBox="0 0 1000 800"><path d="M 100 100 Q 300 200 500 400 T 900 700" /></svg>
            <div className="relative z-10 w-full h-full flex flex-col gap-16 items-center pt-8">
              <div className="relative flex flex-col items-center group cursor-pointer self-start ml-24"><div className="w-24 h-24 bg-surface rounded-full border-4 border-secondary shadow-[0_4px_12px_rgba(0,108,73,0.2)] flex items-center justify-center mb-4 z-10 relative"><div className="w-16 h-16 rounded-full bg-secondary-container flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-on-secondary-container" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span></div><div className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary rounded-full border-2 border-surface flex items-center justify-center"><span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span></div></div><div className="bg-surface-container-lowest px-4 py-2 rounded-lg border-2 border-secondary/30 shadow-sm text-center"><h3 className="text-label-sm font-label-sm font-bold text-on-surface">Basics</h3><p className="text-body-md font-body-md text-on-surface-variant text-xs">Completed</p></div></div>
              <div className="relative flex flex-col items-center group cursor-pointer self-center"><div className="w-32 h-32 bg-surface rounded-full border-4 border-primary shadow-[0_8px_24px_rgba(33,112,228,0.4)] flex items-center justify-center mb-4 z-10 relative"><div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-5xl text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>science</span></div></div><div className="bg-primary-container px-6 py-3 rounded-lg shadow-md text-center"><h3 className="text-label-sm font-label-sm font-bold text-on-primary-container">Organic Chem</h3><p className="text-body-md font-body-md text-primary-fixed-dim text-xs">Current Focus</p></div></div>
              <div className="relative flex flex-col items-center group cursor-not-allowed self-end mr-24"><div className="w-24 h-24 bg-surface-variant rounded-full border-4 border-outline/30 flex items-center justify-center mb-4 opacity-70 z-10 relative"><div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-outline" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span></div></div><div className="bg-surface-container px-4 py-2 rounded-lg border-2 border-outline-variant/30 text-center opacity-70"><h3 className="text-label-sm font-label-sm font-bold text-on-surface-variant">Thermodynamics</h3><p className="text-body-md font-body-md text-outline text-xs">Locked</p></div></div>
            </div>
          </div>

          <aside className="w-full lg:w-96 flex flex-col gap-6">
            <div className="bg-surface-container-lowest rounded-xl border-2 border-primary/20 shadow-[0_4px_16px_rgba(33,112,228,0.1)] p-6 flex flex-col">
              <div className="flex items-center gap-4 mb-4"><div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center"><span className="material-symbols-outlined text-on-primary-container">science</span></div><div><h2 className="text-headline-md font-headline-md text-on-surface">Organic Chem</h2><p className="text-body-md font-body-md text-primary">Module 2</p></div></div>
              <p className="text-body-md font-body-md text-on-surface-variant mb-6">Dive into the world of carbon compounds. Learn about molecular structures, bonding, and foundational reactions.</p>
              <div className="mb-6"><div className="flex justify-between mb-2"><span className="text-label-sm font-label-sm text-on-surface">Progress</span><span className="text-label-sm font-label-sm text-primary font-bold">45%</span></div><div className="h-3 w-full bg-surface-variant rounded-full overflow-hidden"><div className="h-full bg-primary rounded-full w-[45%]" /></div></div>
              <button className="w-full bg-primary text-on-primary py-3 rounded-full transition-colors shadow-md text-label-sm font-label-sm font-bold mt-auto border-2 border-surface-tint border-b-4 active:border-b-2 active:translate-y-[2px]">Resume Module</button>
            </div>
            <div className="bg-surface-container-lowest rounded-xl border-2 border-outline-variant/30 shadow-sm p-6 flex-1"><h3 className="text-headline-md font-headline-md text-on-surface mb-4">Lessons</h3><ul className="flex flex-col gap-3"><li className="flex items-center gap-3 p-3 rounded-lg bg-surface-container-high border-2 border-outline-variant/20"><span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span><span className="text-body-md font-body-md text-on-surface line-through opacity-70">Hydrocarbons Intro</span></li><li className="flex items-center gap-3 p-3 rounded-lg bg-primary-container/10 border-2 border-primary border-l-4"><span className="material-symbols-outlined text-primary animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span><span className="text-body-md font-body-md text-on-surface font-bold">Alkanes &amp; Alkenes</span></li><li className="flex items-center gap-3 p-3 rounded-lg bg-surface border-2 border-outline-variant/20 opacity-50"><span className="material-symbols-outlined text-outline">lock</span><span className="text-body-md font-body-md text-on-surface">Aromatic Compounds</span></li></ul></div>
          </aside>
        </div>
      </main>

      <footer className="mt-auto w-full bg-surface-container-highest border-t border-outline-variant flex flex-col md:flex-row justify-between items-center py-6 px-gutter z-10 md:pl-72">
        <div className="mb-4 md:mb-0"><span className="text-label-md font-headline-md font-bold text-primary">ChemLab 3D</span><p className="text-body-md font-body-md text-on-surface-variant mt-1 text-sm">© 2024 ChemLab 3D. All rights reserved. Molecular Learning Systems.</p></div>
        <div className="flex gap-6">
          <Link className="text-on-surface-variant hover:text-primary hover:underline opacity-80 hover:opacity-100 text-label-sm font-label-sm" href={appRoutes.settingsCustomization}>Privacy Policy</Link>
          <Link className="text-on-surface-variant hover:text-primary hover:underline opacity-80 hover:opacity-100 text-label-sm font-label-sm" href={appRoutes.settingsCustomization}>Terms of Service</Link>
          <Link className="text-on-surface-variant hover:text-primary hover:underline opacity-80 hover:opacity-100 text-label-sm font-label-sm" href={appRoutes.learningLessons}>Safety Guidelines</Link>
          <Link className="text-on-surface-variant hover:text-primary hover:underline opacity-80 hover:opacity-100 text-label-sm font-label-sm" href={appRoutes.scienceNewsBlog}>Research Paper</Link>
        </div>
      </footer>
    </div>
  );
}
