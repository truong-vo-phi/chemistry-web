import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../config/site-routes';

export const metadata: Metadata = {
  title: 'Profile - ChemLab 3D',
};

export default function ProfileAchievementsPage() {
  return (
    <div className="bg-background text-on-background font-body-md text-body-md antialiased pb-[80px] md:pb-0 pt-[64px]">
      <div className="px-margin-mobile md:px-margin-desktop w-full max-w-[1296px] mx-auto z-50 relative">
        <header className="bg-surface rounded-lg mt-4 border-2 border-surface-variant shadow-sm flex justify-between items-center w-full px-gutter py-unit max-w-container-max mx-auto">
          <div className="flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
            <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center border-2 border-primary-fixed-variant shadow-[2px_2px_0px_0px_rgba(0,67,149,0.3)]">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
            </div>
            <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">ChemLab 3D</span>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-start ml-8 gap-8">
            <div className="relative w-64 group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
              <input className="w-full bg-surface-container-lowest border-2 border-surface-variant rounded-full py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary-fixed/30 transition-all shadow-sm" placeholder="Tìm kiếm..." type="text" />
            </div>
            <nav className="flex items-center gap-6">
              <Link className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200" href={appRoutes.home}>Khám phá</Link>
              <Link className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200" href={appRoutes.periodicTable}>Bảng Tuần Hoàn</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <Link className="hidden md:flex items-center gap-2 bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-full border-2 border-on-primary-fixed-variant shadow-[0px_4px_0px_0px_rgba(0,67,149,0.3)] hover:-translate-y-0.5 hover:shadow-[0px_6px_0px_0px_rgba(0,67,149,0.3)] active:translate-y-1 active:shadow-none transition-all" href={appRoutes.launch3dLab}>
              <span className="material-symbols-outlined">rocket_launch</span>
              Launch Lab
            </Link>
            <div className="w-10 h-10 rounded-full border-2 border-tertiary-fixed-dim overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 bg-tertiary-container flex items-center justify-center">
              <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgQmvnH1_rFKGeh7HaNGOq_r2kHTDT-T6c2xZjKdR5CCSGsH-Cc94gcSjbELVPnMTCQMSfNJcusg-XYiFREFQWrd3A5NjzApsp9g995Ag19JZr7Xq1m-Im06uMbPoShnn45_HuliJ-Wh6pWUwQSl1Pm41Akoa97fLlADH_wBaypg93J9Yk-KEzT86r-SPaW0hF1rsza3ptcLFcG9EWEqdPTuGs-G3QkYmmYfbj2ONRGTvvZBALxtZYUDTP-1y5QVzrNCJlvatM8jI" />
            </div>
          </div>
        </header>
      </div>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-gutter flex flex-col gap-gutter">
        <section className="flex flex-col md:flex-row gap-gutter items-center justify-between bg-surface-container-lowest rounded-xl p-6 md:p-8 border-2 border-primary/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary shadow-lg overflow-hidden shrink-0 bg-primary-container/20 relative">
              <img alt="Student Mascot Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDgQmvnH1_rFKGeh7HaNGOq_r2kHTDT-T6c2xZjKdR5CCSGsH-Cc94gcSjbELVPnMTCQMSfNJcusg-XYiFREFQWrd3A5NjzApsp9g995Ag19JZr7Xq1m-Im06uMbPoShnn45_HuliJ-Wh6pWUwQSl1Pm41Akoa97fLlADH_wBaypg93J9Yk-KEzT86r-SPaW0hF1rsza3ptcLFcG9EWEqdPTuGs-G3QkYmmYfbj2ONRGTvvZBALxtZYUDTP-1y5QVzrNCJlvatM8jI" />
            </div>
            <div className="text-center md:text-left flex flex-col gap-2">
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Alex Nova</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Level 12 Apprentice Chemist</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="material-symbols-outlined text-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="font-label-sm text-label-sm text-tertiary-container">4,500 EXP</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 flex flex-col gap-unit">
            <div className="flex justify-between font-label-sm text-label-sm"><span>Progress to Level 13</span><span>75%</span></div>
            <div className="w-full h-3 bg-surface-variant rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-secondary-container to-primary rounded-full" style={{ width: '75%' }} /></div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          <section className="md:col-span-2 bg-surface-container-lowest rounded-xl p-6 border-2 border-secondary/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>military_tech</span>Earned Badges</h2>
              <Link className="font-label-sm text-label-sm text-primary hover:text-primary-fixed-dim transition-colors" href={appRoutes.profileAchievements}>View All</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: 'local_fire_department', label: 'Fire Safety Hero', bg: 'bg-primary-container/20', color: 'text-primary' },
                { icon: 'water_drop', label: 'Master Mixer', bg: 'bg-secondary-container/30', color: 'text-secondary' },
                { icon: 'ac_unit', label: 'Cool Chemist', bg: 'bg-tertiary-container/20', color: 'text-tertiary' },
              ].map((badge) => (
                <div key={badge.label} className="flex flex-col items-center gap-2 p-4 bg-surface rounded-lg border-2 border-surface-variant shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                  <div className={`w-16 h-16 rounded-full ${badge.bg} flex items-center justify-center`}><span className={`material-symbols-outlined ${badge.color} text-3xl`}>{badge.icon}</span></div>
                  <span className="font-label-sm text-label-sm text-center">{badge.label}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2 p-4 bg-surface rounded-lg border-2 border-surface-variant shadow-sm hover:shadow-md hover:-translate-y-1 transition-all">
                <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center opacity-50 grayscale"><span className="material-symbols-outlined text-outline text-3xl">bolt</span></div>
                <span className="font-label-sm text-label-sm text-center text-outline">Energy Expert</span>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest rounded-xl p-6 border-2 border-tertiary/20 shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex flex-col gap-4">
            <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>bar_chart</span>Skill Levels</h2>
            <div className="flex-grow flex flex-col justify-center gap-4">
              {[
                { name: 'Safety Protocol', value: '90%', color: 'bg-secondary', width: '90%' },
                { name: 'Titration', value: '65%', color: 'bg-primary', width: '65%' },
                { name: 'Periodic Trends', value: '40%', color: 'bg-tertiary-container', width: '40%' },
              ].map((skill) => (
                <div key={skill.name} className="flex flex-col gap-1">
                  <div className="flex justify-between font-label-sm text-label-sm"><span>{skill.name}</span><span>{skill.value}</span></div>
                  <div className="w-full h-3 bg-surface-variant rounded-full overflow-hidden"><div className={`h-full ${skill.color} rounded-full`} style={{ width: skill.width }} /></div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="bg-surface-container-lowest rounded-xl p-6 border-2 border-surface-variant shadow-[0_4px_12px_rgba(0,0,0,0.1)] flex flex-col gap-4">
          <h2 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-on-surface-variant" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>Recent Labs</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container transition-colors cursor-pointer border-2 border-transparent hover:border-surface-variant">
              <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0"><span className="material-symbols-outlined">science</span></div>
              <div className="flex-grow flex flex-col"><span className="font-label-sm text-label-sm text-on-surface">Acid-Base Neutralization</span><span className="font-body-md text-body-md text-on-surface-variant text-sm">Completed 2 days ago</span></div>
              <div className="font-label-sm text-label-sm text-secondary-container bg-on-secondary-container px-3 py-1 rounded-full border-2 border-secondary-container">A+</div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface-container transition-colors cursor-pointer border-2 border-transparent hover:border-surface-variant">
              <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0"><span className="material-symbols-outlined">experiment</span></div>
              <div className="flex-grow flex flex-col"><span className="font-label-sm text-label-sm text-on-surface">Density Tower Experiment</span><span className="font-body-md text-body-md text-on-surface-variant text-sm">Completed 1 week ago</span></div>
              <div className="font-label-sm text-label-sm text-primary-container bg-on-primary-container px-3 py-1 rounded-full border-2 border-primary-container">B</div>
            </div>
          </div>
        </section>
      </main>

      <nav className="bg-surface-container-lowest shadow-[0_-4px_12px_rgba(0,0,0,0.06)] fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 rounded-t-xl md:hidden">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary" href={appRoutes.experimentLibrary}><span className="material-symbols-outlined text-2xl mb-1">science</span><span className="font-label-sm text-[10px]">Labs</span></Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary" href={appRoutes.learningPathway}><span className="material-symbols-outlined text-2xl mb-1">school</span><span className="font-label-sm text-[10px]">Learn</span></Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary" href={appRoutes.quizReview}><span className="material-symbols-outlined text-2xl mb-1">military_tech</span><span className="font-label-sm text-[10px]">Badges</span></Link>
        <Link className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-5 py-1.5 transition-all hover:text-primary" href={appRoutes.profileAchievements}><span className="material-symbols-outlined text-2xl mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>person</span><span className="font-label-sm text-[10px]">Profile</span></Link>
      </nav>
    </div>
  );
}
