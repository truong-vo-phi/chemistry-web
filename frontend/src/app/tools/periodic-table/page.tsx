import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Interactive Periodic Table',
};

export default function PeriodicTablePage() {
  return (
    <div className="bg-background text-on-background min-h-screen font-body-md">
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
              <input className="w-full bg-surface-container-lowest border-2 border-surface-variant rounded-full py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary-fixed/30 transition-all shadow-sm" placeholder="Tìm kiếm bài học..." type="text" />
            </div>
            <nav className="flex items-center gap-6">
              <Link className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200" href={appRoutes.home}>Khám phá</Link>
              <Link className="text-primary font-bold font-body-md text-body-md border-b-2 border-primary" href={appRoutes.periodicTable}>Bảng Tuần Hoàn</Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer hover:scale-[1.02] active:scale-[0.98] relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <Link href={appRoutes.launch3dLab} className="hidden md:flex items-center gap-2 bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-full border-2 border-on-primary-fixed-variant shadow-[0px_4px_0px_0px_rgba(0,67,149,0.3)] hover:-translate-y-0.5 hover:shadow-[0px_6px_0px_0px_rgba(0,67,149,0.3)] active:translate-y-1 active:shadow-none transition-all">
              <span className="material-symbols-outlined">rocket_launch</span>
              Launch Lab
            </Link>
            <div className="w-10 h-10 rounded-full border-2 border-tertiary-fixed-dim overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 bg-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-container">person</span>
            </div>
          </div>
        </header>
      </div>

      <main className="pb-[100px] md:pb-gutter px-margin-mobile md:px-margin-desktop max-w-[1600px] mx-auto min-h-screen flex flex-col gap-gutter pt-8">
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 bg-surface-container-lowest p-gutter rounded-[2rem] border-2 border-primary/20 shadow-sm">
          <div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-2">The Periodic Table</h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl">Explore the building blocks of the universe. Tap any element to view its 3D atomic structure and properties.</p>
          </div>
          <div className="flex flex-wrap gap-2 md:max-w-md justify-end">
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border-2 border-outline/30 font-label-sm text-label-sm"><div className="w-3 h-3 rounded-full bg-[#ffdad6] border border-[#ba1a1a]"></div> Alkali Metals</div>
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border-2 border-outline/30 font-label-sm text-label-sm"><div className="w-3 h-3 rounded-full bg-[#d8e2ff] border border-[#0058be]"></div> Transition Metals</div>
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border-2 border-outline/30 font-label-sm text-label-sm"><div className="w-3 h-3 rounded-full bg-[#adc6ff] border border-[#004395]"></div> Noble Gases</div>
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-container rounded-full border-2 border-outline/30 font-label-sm text-label-sm"><div className="w-3 h-3 rounded-full bg-[#6cf8bb] border border-[#006c49]"></div> Metalloids</div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter h-full flex-grow">
          <section className="lg:col-span-8 xl:col-span-9 bg-surface-container-lowest rounded-[2rem] border-2 border-surface-variant shadow-sm p-unit overflow-x-auto">
            <div className="min-w-[800px] grid grid-cols-18 gap-1 auto-rows-fr">
              <div className="col-start-1 bg-[#f5f4ec] border-2 border-[#424754] rounded-xl p-1 flex flex-col items-center justify-center cursor-pointer aspect-square relative">
                <span className="absolute top-1 left-1 text-[10px] font-bold opacity-70">1</span><span className="font-headline-md text-headline-md leading-none">H</span><span className="text-[10px] truncate w-full text-center mt-1">Hydrogen</span>
              </div>
              <div className="col-start-18 bg-[#adc6ff] border-2 border-[#004395] rounded-xl p-1 flex flex-col items-center justify-center cursor-pointer aspect-square relative">
                <span className="absolute top-1 left-1 text-[10px] font-bold opacity-70">2</span><span className="font-headline-md text-headline-md leading-none">He</span><span className="text-[10px] truncate w-full text-center mt-1">Helium</span>
              </div>
              <div className="col-start-1 bg-[#ffdad6] border-2 border-[#ba1a1a] rounded-xl p-1 flex flex-col items-center justify-center cursor-pointer aspect-square relative">
                <span className="absolute top-1 left-1 text-[10px] font-bold opacity-70">3</span><span className="font-headline-md text-headline-md leading-none">Li</span><span className="text-[10px] truncate w-full text-center mt-1">Lithium</span>
              </div>
              <div className="col-start-2 bg-[#ffddb8] border-2 border-[#a36700] rounded-xl p-1 flex flex-col items-center justify-center cursor-pointer aspect-square relative">
                <span className="absolute top-1 left-1 text-[10px] font-bold opacity-70">4</span><span className="font-headline-md text-headline-md leading-none">Be</span><span className="text-[10px] truncate w-full text-center mt-1">Beryllium</span>
              </div>
              <div className="col-start-13 bg-[#6cf8bb] border-2 border-[#006c49] rounded-xl p-1 flex flex-col items-center justify-center cursor-pointer aspect-square relative">
                <span className="absolute top-1 left-1 text-[10px] font-bold opacity-70">5</span><span className="font-headline-md text-headline-md leading-none">B</span><span className="text-[10px] truncate w-full text-center mt-1">Boron</span>
              </div>
              <div className="col-start-14 bg-[#f5f4ec] border-2 border-[#424754] rounded-xl p-1 flex flex-col items-center justify-center cursor-pointer aspect-square relative ring-4 ring-primary ring-offset-2 scale-105 z-10">
                <span className="absolute top-1 left-1 text-[10px] font-bold opacity-70">6</span><span className="font-headline-md text-headline-md leading-none font-bold">C</span><span className="text-[10px] truncate w-full text-center mt-1 font-bold">Carbon</span>
              </div>
              <div className="col-start-15 bg-[#f5f4ec] border-2 border-[#424754] rounded-xl p-1 flex flex-col items-center justify-center cursor-pointer aspect-square relative">
                <span className="absolute top-1 left-1 text-[10px] font-bold opacity-70">7</span><span className="font-headline-md text-headline-md leading-none">N</span><span className="text-[10px] truncate w-full text-center mt-1">Nitrogen</span>
              </div>
              <div className="col-start-16 bg-[#f5f4ec] border-2 border-[#424754] rounded-xl p-1 flex flex-col items-center justify-center cursor-pointer aspect-square relative">
                <span className="absolute top-1 left-1 text-[10px] font-bold opacity-70">8</span><span className="font-headline-md text-headline-md leading-none">O</span><span className="text-[10px] truncate w-full text-center mt-1">Oxygen</span>
              </div>
              <div className="col-start-17 bg-[#f5f4ec] border-2 border-[#424754] rounded-xl p-1 flex flex-col items-center justify-center cursor-pointer aspect-square relative">
                <span className="absolute top-1 left-1 text-[10px] font-bold opacity-70">9</span><span className="font-headline-md text-headline-md leading-none">F</span><span className="text-[10px] truncate w-full text-center mt-1">Fluorine</span>
              </div>
              <div className="col-start-18 bg-[#adc6ff] border-2 border-[#004395] rounded-xl p-1 flex flex-col items-center justify-center cursor-pointer aspect-square relative">
                <span className="absolute top-1 left-1 text-[10px] font-bold opacity-70">10</span><span className="font-headline-md text-headline-md leading-none">Ne</span><span className="text-[10px] truncate w-full text-center mt-1">Neon</span>
              </div>
              <div className="col-span-18 h-8 flex items-center justify-center text-outline/50 font-label-sm text-label-sm my-4 border-t-2 border-dashed border-outline/20">Scroll or pinch to zoom. More elements below...</div>
            </div>
          </section>

          <aside className="lg:col-span-4 xl:col-span-3 bg-surface-container-lowest rounded-[2rem] border-2 border-surface-variant shadow-sm p-gutter flex flex-col gap-unit">
            <div className="flex items-start justify-between">
              <div><div className="font-headline-md text-headline-md text-on-surface">Carbon</div><div className="font-label-sm text-label-sm text-on-surface-variant">Reactive Nonmetal</div></div>
              <div className="w-12 h-12 bg-[#f5f4ec] border-2 border-[#424754] rounded-xl flex items-center justify-center font-headline-md text-headline-md font-bold">C</div>
            </div>
            <div className="w-full aspect-square bg-surface-container rounded-2xl border-2 border-outline/20 my-4 relative overflow-hidden flex items-center justify-center group cursor-pointer">
              <img alt="Carbon atom" className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXgP8UeTuyA0rsUopeDMKp2Eqwa3DC6xhVo1Rm7u74Py5X4pUuUzsGyGP8Ibz4zBaVXzRhSjnr8-gNlo4q0Tz34ILFmWQ1xvFhVUcjypSSELAAVWRwrb_IyXlQ51GIw6FBUjv6lYn1ja4cKwqTLAmMVeKu20KF4-YHc6pZUQaASgRS7X5JTlLHGHOngH-PoijtQen6DoejmGlhf5BQqcF6fjp56YI7VuyWi-Pj2EjKFU5R8grDx6vq9n84DGzqwxNc9T0B6RWR6kQ" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container/80 to-transparent"></div>
              <button className="z-10 bg-surface text-primary rounded-full p-3 shadow-md border-2 border-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>360</span></button>
              <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full font-label-sm text-label-sm border border-outline/20 text-on-surface flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">rotate_right</span>Interact</div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="bg-surface-container-low p-3 rounded-xl border border-outline/10"><div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mb-1"><span className="material-symbols-outlined text-[14px]">tag</span> Atomic Number</div><div className="font-body-lg text-body-lg font-bold">6</div></div>
              <div className="bg-surface-container-low p-3 rounded-xl border border-outline/10"><div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mb-1"><span className="material-symbols-outlined text-[14px]">scale</span> Atomic Mass</div><div className="font-body-lg text-body-lg font-bold">12.011</div></div>
              <div className="bg-surface-container-low p-3 rounded-xl border border-outline/10 col-span-2"><div className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mb-1"><span className="material-symbols-outlined text-[14px]">blur_on</span> Electron Configuration</div><div className="font-body-lg text-body-lg">[He] 2s² 2p²</div></div>
            </div>
            <div className="mt-auto pt-4 flex gap-2">
              <Link href={appRoutes.launch3dLab} className="flex-1 bg-primary text-on-primary font-label-sm text-label-sm py-3 px-4 rounded-full border-2 border-primary-fixed-dim flex items-center justify-center gap-2"><span className="material-symbols-outlined">play_arrow</span>Start Lab</Link>
              <button className="bg-secondary-container text-on-secondary-container font-label-sm text-label-sm py-3 px-4 rounded-full border-2 border-secondary flex items-center justify-center"><span className="material-symbols-outlined">bookmark_add</span></button>
            </div>
          </aside>
        </div>
      </main>

      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 py-3 bg-surface shadow-[0_-4px_12px_rgba(0,0,0,0.06)] rounded-t-xl md:hidden">
        <Link className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-5 py-1.5 transition-all scale-90 duration-200" href={appRoutes.experimentLibrary}><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>science</span><span className="font-label-sm text-[12px] font-bold mt-1">Labs</span></Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary" href={appRoutes.learningPathway}><span className="material-symbols-outlined">school</span><span className="font-label-sm text-[12px] mt-1">Learn</span></Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary" href={appRoutes.quizReview}><span className="material-symbols-outlined">military_tech</span><span className="font-label-sm text-[12px] mt-1">Badges</span></Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant p-2 hover:text-primary" href={appRoutes.profileAchievements}><span className="material-symbols-outlined">person</span><span className="font-label-sm text-[12px] mt-1">Profile</span></Link>
      </nav>
    </div>
  );
}
