import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Partner Dashboard',
  description: 'School portal dashboard for administrators and partner institutions.',
};

export default function SchoolPortalPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface font-body-md text-body-md text-on-surface">
      <nav className="fixed top-0 z-50 flex h-16 w-full items-center justify-between border-b border-outline-variant/30 bg-surface/80 px-gutter backdrop-blur-xl shadow-sm">
        <div className="flex items-center gap-8">
          <span className="font-headline-md text-headline-md font-bold text-primary">ChemLab 3D</span>
          <div className="hidden gap-6 md:flex">
            <Link className="text-on-surface-variant hover:text-primary" href={appRoutes.experimentLibrary}>Experiments</Link>
            <Link className="text-on-surface-variant hover:text-primary" href={appRoutes.theoryCourseLibrary}>Curriculum</Link>
            <Link className="text-on-surface-variant hover:text-primary" href={appRoutes.learningCommunity}>Resources</Link>
            <Link className="text-on-surface-variant hover:text-primary" href={appRoutes.settingsCustomization}>Support</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-2 md:flex">
            <button className="rounded-full p-2 text-on-surface-variant hover:bg-primary-container/20"><span className="material-symbols-outlined">notifications</span></button>
            <button className="rounded-full p-2 text-on-surface-variant hover:bg-primary-container/20"><span className="material-symbols-outlined">account_circle</span></button>
          </div>
          <Link href={appRoutes.launch3dLab} className="squishy-button rounded-full border-2 border-primary-container bg-primary px-6 py-2 font-label-sm text-label-sm text-on-primary shadow-[0_4px_0_rgba(33,112,228,1)]">Launch Lab</Link>
        </div>
      </nav>

      <aside className="fixed left-0 top-0 z-40 mt-20 hidden h-[calc(100vh-32px)] w-64 flex-col rounded-xl border border-white/20 bg-surface/90 py-8 shadow-[0px_10px_30px_rgba(59,132,246,0.08)] backdrop-blur-2xl md:flex">
        <div className="mb-8 flex items-center gap-4 px-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary-container bg-primary-container/20">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          </div>
          <div>
            <h2 className="text-lg font-headline-md font-bold text-primary">ChemLab 3D</h2>
            <p className="font-label-sm text-on-surface-variant">Active Session</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          <nav className="flex flex-col gap-2">
            <Link className="mx-2 my-1 translate-x-1 rounded-lg bg-primary-container px-4 py-3 font-semibold text-on-primary-container" href={appRoutes.schoolDashboard}><span className="material-symbols-outlined mr-3 align-middle" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>Dashboard</Link>
            <Link className="mx-2 my-1 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-high" href={appRoutes.launch3dLab}><span className="material-symbols-outlined mr-3 align-middle">science</span>Experiment Lab</Link>
            <Link className="mx-2 my-1 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-high" href={appRoutes.classManagementDetailed}><span className="material-symbols-outlined mr-3 align-middle">groups</span>Classroom</Link>
            <Link className="mx-2 my-1 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-high" href={appRoutes.teacherDashboard}><span className="material-symbols-outlined mr-3 align-middle">leaderboard</span>Analytics</Link>
            <Link className="mx-2 my-1 rounded-lg px-4 py-3 text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-high" href={appRoutes.settingsCustomization}><span className="material-symbols-outlined mr-3 align-middle">settings</span>Settings</Link>
          </nav>
        </div>

        <div className="mt-auto px-4 pb-4">
          <Link href={appRoutes.launch3dLab} className="squishy-button mb-6 block w-full rounded-full border-2 border-secondary bg-secondary-container py-3 text-center font-label-sm text-label-sm text-on-secondary-container shadow-[0_4px_0_rgba(0,108,73,0.3)]">Start Reaction</Link>
          <div className="flex flex-col gap-2 border-t border-outline-variant/30 pt-4">
            <Link className="rounded-lg px-4 py-2 text-label-sm text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-highest/50" href={appRoutes.learningCommunity}><span className="material-symbols-outlined mr-3 align-middle">help</span>Help</Link>
            <Link className="rounded-lg px-4 py-2 text-label-sm text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-highest/50" href={appRoutes.home}><span className="material-symbols-outlined mr-3 align-middle">logout</span>Sign Out</Link>
          </div>
        </div>
      </aside>

      <main className="mx-auto w-full max-w-container-max flex-1 px-margin-mobile pb-12 pt-24 md:ml-[280px] md:px-margin-desktop">
        <header className="mb-8">
          <h1 className="mb-2 font-display-lg-mobile text-display-lg-mobile text-primary md:font-display-lg md:text-display-lg">Partner Dashboard</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Welcome back, Administrator. Here&apos;s a snapshot of your academy&apos;s performance today.</p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="card-shadow relative overflow-hidden rounded-[16px] border-2 border-primary-fixed-dim bg-surface-container-lowest p-6 md:col-span-4">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary-fixed opacity-20" />
            <div className="relative z-10 mb-4 flex items-start justify-between">
              <div className="rounded-xl border-2 border-primary-fixed-dim bg-primary-container/10 p-3"><span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>face</span></div>
              <span className="rounded-full border border-secondary bg-secondary-container px-2 py-1 text-xs font-bold text-on-secondary-container">+12%</span>
            </div>
            <div className="relative z-10">
              <h3 className="mb-1 text-label-sm uppercase tracking-wider text-on-surface-variant">Total Active Students</h3>
              <p className="text-4xl font-headline-md font-bold text-on-primary-fixed">1,248</p>
            </div>
          </div>

          <div className="card-shadow relative overflow-hidden rounded-[16px] border-2 border-tertiary-fixed-dim bg-surface-container-lowest p-6 md:col-span-4">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-tertiary-fixed opacity-20" />
            <div className="relative z-10 mb-4 rounded-xl border-2 border-tertiary-fixed-dim bg-tertiary-container/10 p-3 w-fit"><span className="material-symbols-outlined text-3xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>timer</span></div>
            <div className="relative z-10">
              <h3 className="mb-1 text-label-sm uppercase tracking-wider text-on-surface-variant">Lab Hours Completed</h3>
              <p className="text-4xl font-headline-md font-bold text-tertiary-container">8,405</p>
            </div>
          </div>

          <div className="card-shadow relative overflow-hidden rounded-[16px] border-2 border-secondary-fixed-dim bg-surface-container-lowest p-6 md:col-span-4">
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-secondary-fixed opacity-20" />
            <div className="relative z-10 mb-4 rounded-xl border-2 border-secondary-fixed-dim bg-secondary-container/20 p-3 w-fit"><span className="material-symbols-outlined text-3xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>school</span></div>
            <div className="relative z-10">
              <h3 className="mb-2 text-label-sm uppercase tracking-wider text-on-surface-variant">Curriculum Progress</h3>
              <div className="mb-2 flex items-center justify-between"><span className="text-2xl font-headline-md font-bold text-secondary">68%</span></div>
              <div className="h-3 w-full rounded-full bg-surface-variant"><div className="h-3 w-[68%] rounded-full bg-gradient-to-r from-secondary-fixed-dim to-primary" /></div>
            </div>
          </div>

          <div className="card-shadow rounded-[16px] border-2 border-outline-variant/50 bg-surface-container-lowest p-6 md:col-span-8">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-headline-md text-headline-md text-on-surface">School Performance</h2>
              <Link href={appRoutes.teacherDashboard} className="rounded-full border border-primary-fixed px-3 py-1 text-label-sm text-primary hover:bg-primary-fixed/50">View Full Report</Link>
            </div>

            <div className="mt-8 flex h-64 items-end gap-2 sm:gap-4">
              {[['Mon', '40%','h-[40%]'], ['Tue','60%','h-[60%]'], ['Wed','85%','h-[85%]'], ['Thu','50%','h-[50%]'], ['Fri','70%','h-[70%]']].map(([d,p,h],idx) => (
                <div key={d} className="group flex flex-1 flex-col items-center gap-2">
                  <div className={`relative w-full rounded-t-lg ${idx===2 ? 'border-2 border-primary bg-primary-container shadow-[0_0_15px_rgba(33,112,228,0.3)]' : 'bg-primary-fixed group-hover:bg-primary'} ${h}`}>
                    <span className={`absolute -top-8 left-1/2 -translate-x-1/2 text-label-sm font-label-sm font-bold ${idx===2 ? 'text-primary' : 'text-primary opacity-0 transition-opacity group-hover:opacity-100'}`}>{p}</span>
                  </div>
                  <span className={`text-label-sm ${idx===2 ? 'font-bold text-primary' : 'text-on-surface-variant'}`}>{d}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-shadow flex flex-col rounded-[16px] border-2 border-outline-variant/50 bg-surface-container-lowest p-6 md:col-span-4">
            <h2 className="mb-6 font-headline-md text-headline-md text-on-surface">Recent Achievements</h2>
            <div className="flex flex-1 flex-col gap-4">
              {[
                ['workspace_premium','Master Alchemist','Class 10A reached level 5','bg-secondary-container border-secondary text-secondary'],
                ['science','100 Labs Completed','Institution Milestone','bg-tertiary-fixed border-tertiary-container text-tertiary-container'],
                ['local_fire_department','7 Day Streak','Consistent Engagement','bg-primary-fixed border-primary-container text-primary-container']
              ].map(([icon,title,desc,styles]) => (
                <div key={title} className="group flex cursor-pointer items-center gap-4 rounded-xl border-2 border-surface-container p-3 transition-colors hover:bg-surface-bright">
                  <div className={`h-12 w-12 shrink-0 rounded-full border-2 flex items-center justify-center group-hover:scale-110 transition-transform ${styles}`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{icon}</span>
                  </div>
                  <div>
                    <h4 className="font-label-sm font-bold text-on-surface">{title}</h4>
                    <p className="text-xs text-on-surface-variant">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href={appRoutes.profileAchievements} className="mt-4 w-full rounded-full border-2 border-primary-fixed py-2 text-center font-label-sm text-label-sm text-primary transition-colors hover:bg-primary-fixed/30">View All Trophies</Link>
          </div>
        </div>
      </main>

      <footer className="mt-auto flex w-full flex-col items-center justify-between gap-4 border-t border-outline-variant bg-surface-container-highest px-gutter py-8 md:flex-row">
        <div>
          <span className="font-headline-md font-bold text-primary">ChemLab 3D</span>
          <p className="mt-1 text-label-sm text-on-surface-variant">© 2024 ChemLab 3D. All rights reserved. Molecular Learning Systems.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          <Link className="text-label-sm text-on-surface-variant transition-all hover:text-primary hover:underline" href={appRoutes.settingsCustomization}>Privacy Policy</Link>
          <Link className="text-label-sm text-on-surface-variant transition-all hover:text-primary hover:underline" href={appRoutes.settingsCustomization}>Terms of Service</Link>
          <Link className="text-label-sm text-on-surface-variant transition-all hover:text-primary hover:underline" href={appRoutes.lessonInterface}>Safety Guidelines</Link>
          <Link className="text-label-sm text-on-surface-variant transition-all hover:text-primary hover:underline" href={appRoutes.scienceNewsBlog}>Research Paper</Link>
        </div>
      </footer>
    </div>
  );
}
