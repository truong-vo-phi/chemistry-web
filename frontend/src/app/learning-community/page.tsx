import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Classroom Forum',
  description: 'Collaborate, discover, and ask questions with your fellow alchemists.',
};

export default function LearningCommunityPage() {
  return (
    <div className="min-h-screen bg-background text-on-background">
      <nav className="fixed top-0 z-50 hidden h-16 w-full items-center justify-between border-b border-outline-variant/30 bg-surface/80 px-[48px] shadow-sm backdrop-blur-xl md:flex">
        <div className="flex items-center gap-[24px]">
          <div className="text-headline-md font-headline-md font-bold text-primary">ChemLab 3D</div>
          <div className="flex gap-[16px]">
            <Link className="rounded-lg px-3 py-2 text-label-sm text-on-surface-variant transition-colors hover:bg-primary-container/20 hover:text-primary" href={appRoutes.experimentLibrary}>Experiments</Link>
            <Link className="rounded-lg border-b-2 border-primary px-3 py-2 text-label-sm font-bold text-primary transition-all duration-150 ease-in-out active:scale-95 hover:bg-primary-container/20" href={appRoutes.theoryCourseLibrary}>Curriculum</Link>
            <Link className="rounded-lg px-3 py-2 text-label-sm text-on-surface-variant transition-colors hover:bg-primary-container/20 hover:text-primary" href={appRoutes.periodicTable}>Resources</Link>
            <Link className="rounded-lg px-3 py-2 text-label-sm text-on-surface-variant transition-colors hover:bg-primary-container/20 hover:text-primary" href={appRoutes.learningCommunity}>Support</Link>
          </div>
        </div>
        <div className="flex items-center gap-[16px]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined cursor-pointer text-outline hover:text-primary">notifications</span>
            <span className="material-symbols-outlined cursor-pointer text-outline hover:text-primary">account_circle</span>
          </div>
          <Link className="flex items-center gap-2 rounded-full border-2 border-primary-container bg-primary px-4 py-2 font-label-sm text-on-primary shadow-[0_4px_0_rgba(33,112,228,0.3)] transition-all active:translate-y-[2px] active:shadow-none" href={appRoutes.launch3dLab}>
            Launch Lab
          </Link>
        </div>
      </nav>

      <div className="flex flex-1 pt-16 md:pt-0">
        <aside className="fixed left-0 top-0 z-40 m-4 hidden h-[calc(100vh-32px)] w-64 flex-col rounded-xl border border-white/20 bg-surface/90 py-[8px] shadow-xl backdrop-blur-2xl md:flex">
          <div className="mb-[16px] flex flex-col items-center border-b border-outline-variant/20 px-[16px] py-[24px]">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container/20 text-headline-md font-headline-md text-primary">C</div>
            <div className="text-center text-headline-md font-headline-md font-bold text-primary">ChemLab 3D</div>
            <div className="mt-1 text-center text-label-sm font-label-sm text-outline">Active Session</div>
          </div>

          <div className="flex-1 overflow-y-auto px-[8px]">
            <Link className="mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-label-sm text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-highest/50" href={appRoutes.teacherDashboard}>
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </Link>
            <Link className="mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-label-sm text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-highest/50" href={appRoutes.experimentLibrary}>
              <span className="material-symbols-outlined">science</span>
              Experiment Lab
            </Link>
            <Link className="mx-2 my-1 flex items-center gap-3 rounded-lg bg-primary-container px-4 py-3 text-label-sm font-semibold text-on-primary-container transition-transform duration-200 active:translate-x-1" href={appRoutes.learningCommunity}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              Classroom
            </Link>
            <Link className="mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-label-sm text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-highest/50" href={appRoutes.userManagement}>
              <span className="material-symbols-outlined">leaderboard</span>
              Analytics
            </Link>
            <Link className="mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-label-sm text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-highest/50" href={appRoutes.settingsCustomization}>
              <span className="material-symbols-outlined">settings</span>
              Settings
            </Link>
          </div>

          <div className="px-[16px] py-[16px]">
            <Link className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-secondary bg-secondary-container px-4 py-3 font-label-sm text-on-secondary-container shadow-[0_4px_0_rgba(0,108,73,0.2)] transition-all active:translate-y-[2px] active:shadow-none" href={appRoutes.launch3dLab}>
              <span className="material-symbols-outlined">play_arrow</span>
              Start Reaction
            </Link>
          </div>

          <div className="mt-auto border-t border-outline-variant/20 px-[8px] pt-[8px]">
            <Link className="mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-label-sm text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-highest/50" href={appRoutes.learningCommunity}>
              <span className="material-symbols-outlined">help</span>
              Help
            </Link>
            <Link className="mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-label-sm text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-highest/50" href={appRoutes.home}>
              <span className="material-symbols-outlined">logout</span>
              Sign Out
            </Link>
          </div>
        </aside>

        <main className="mx-auto w-full max-w-[1200px] flex-1 p-[16px] md:ml-[280px] md:p-[48px]">
          <header className="mb-[24px] flex flex-col items-start justify-between gap-[16px] md:flex-row md:items-center">
            <div>
              <h1 className="text-display-lg-mobile font-display-lg-mobile text-primary md:text-display-lg md:font-display-lg">Classroom Forum</h1>
              <p className="mt-[8px] text-body-lg font-body-lg text-outline">Collaborate, discover, and ask questions with your fellow alchemists.</p>
            </div>
            <button className="flex items-center gap-2 rounded-full border-2 border-primary bg-primary-container px-6 py-3 font-label-sm text-on-primary-container shadow-[0_4px_0_rgba(0,88,190,0.3)] transition-all active:translate-y-[2px] active:shadow-none" type="button">
              <span className="material-symbols-outlined">edit_square</span>
              Post New Question
            </button>
          </header>

          <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-3">
            <div className="space-y-[16px] lg:col-span-2">
              <div className="flex items-center gap-[8px] rounded-[1rem] border-[2px] border-surface-variant bg-surface-container-lowest p-[8px] shadow-sm">
                <span className="material-symbols-outlined pl-[8px] text-outline">search</span>
                <input className="w-full border-none bg-transparent text-body-md text-on-surface placeholder:text-outline/70 focus:ring-0" placeholder="Search magical reactions..." type="text" />
                <div className="flex gap-[8px] pr-[8px]">
                  <button className="rounded-full border-[2px] border-secondary-fixed-dim bg-secondary-fixed px-[12px] py-[4px] text-label-sm text-on-secondary-fixed" type="button">All</button>
                  <button className="rounded-full border-[2px] border-surface-variant bg-surface px-[12px] py-[4px] text-label-sm text-outline transition-colors hover:bg-surface-variant" type="button">Help</button>
                  <button className="rounded-full border-[2px] border-surface-variant bg-surface px-[12px] py-[4px] text-label-sm text-outline transition-colors hover:bg-surface-variant" type="button">Discovery</button>
                </div>
              </div>

              <div className="space-y-[16px]">
                <div className="group relative rounded-[1rem] border-[2px] border-primary-fixed-dim bg-surface-container-lowest p-[24px] shadow-[0_2px_8px_rgba(33,112,228,0.1)] transition-all hover:shadow-[0_4px_12px_rgba(33,112,228,0.15)]">
                  <div className="mb-[16px] flex items-start justify-between">
                    <div className="flex items-center gap-[16px]">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-[2px] border-tertiary-fixed-dim bg-tertiary-fixed">
                        <img alt="Student Avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANXxdFmIHwyTt6bzT5PNvIFMw8BKp8mtOtl4Bje3r_SbS6TBdoSbRcZ-wqJKvnUsBrkOX48hu-t05bT16t01rZ_U3wDeJXBIC_bkhOlGzco7UJuVVJxfVeRBA7oSkYCOQ0jecdmbrwhXIqJlfxJCp6R1q6HALG6G1WSggAzbZPuS0hJfXU-K6X3bb2dx2jKBMnEHNZ44MyqB2WbTshX3VEHLbUZmkqNk8yjdpiSOJxmhBins_z9mghkmDYV6QRtCl-bAg18qfda6A" />
                      </div>
                      <div>
                        <div className="flex items-center gap-[8px]">
                          <span className="text-label-sm font-bold text-on-surface">Leo Sparks</span>
                          <span className="flex items-center gap-[4px] rounded-full bg-tertiary-container px-[8px] py-[2px] text-[10px] font-bold uppercase tracking-wider text-on-tertiary-container">
                            <span className="material-symbols-outlined" style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}>star</span>
                            Lvl 4
                          </span>
                        </div>
                        <span className="text-sm text-outline">2 hours ago</span>
                      </div>
                    </div>
                    <span className="rounded-full border-[2px] border-secondary-fixed bg-secondary-container px-[12px] py-[4px] text-label-sm text-on-secondary-container shadow-[0_2px_0_rgba(0,108,73,0.1)]">Discovery</span>
                  </div>

                  <h3 className="mb-[8px] text-headline-md font-headline-md text-primary">Unexpected crystallization in Exothermic Lab 4?</h3>
                  <p className="mb-[16px] line-clamp-2 text-body-md text-on-surface-variant">I was running the standard sodium acetate reaction and instead of a smooth liquid, I got these wild, spiky purple crystals. Has anyone else encountered this variant?</p>

                  <div className="mt-[16px] flex items-center justify-between border-t border-outline-variant/30 pt-[16px]">
                    <div className="flex items-center gap-[16px]">
                      <button className="flex items-center gap-[4px] text-outline transition-colors hover:text-primary" type="button">
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        <span className="text-label-sm">24</span>
                      </button>
                      <button className="flex items-center gap-[4px] text-outline transition-colors hover:text-primary" type="button">
                        <span className="material-symbols-outlined">forum</span>
                        <span className="text-label-sm">8 replies</span>
                      </button>
                    </div>
                    <button className="text-label-sm font-bold text-primary hover:underline" type="button">View Thread</button>
                  </div>
                </div>

                <div className="group relative rounded-[1rem] border-[2px] border-error-container bg-surface-container-lowest p-[24px] shadow-[0_2px_8px_rgba(186,26,26,0.05)] transition-all hover:shadow-[0_4px_12px_rgba(186,26,26,0.1)]">
                  <div className="mb-[16px] flex items-start justify-between">
                    <div className="flex items-center gap-[16px]">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border-[2px] border-primary-fixed-dim bg-primary-fixed">
                        <img alt="Student Avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD65Ba0zLctB1Lv9e1_6K2gSJeVsk0B0wiEIuaAhpb2tvLpW0XlcurRU_rOexe_cvsuV9va_-uUMLRCw3CZuL6JLHhsNJAbKRwG0-ToxTcig5HEND6TImyDCnwXx5yIFpqYBHMI4fAJY7JA6TCJBKaW_6oeNnqEMqJN4hRRJXNIt-SGrKTa-p7akBqF5m4FbnGvT08dvipzmt6q93rDcjAYRScUsYvx8MPb4P91d_W5lIB6kEV7pLoui0JduscMVhHB8FPHIoI4rd4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-[8px]">
                          <span className="text-label-sm font-bold text-on-surface">Maya Chen</span>
                          <span className="flex items-center gap-[4px] rounded-full bg-primary-container px-[8px] py-[2px] text-[10px] font-bold uppercase tracking-wider text-on-primary-container">
                            <span className="material-symbols-outlined" style={{ fontSize: '12px', fontVariationSettings: "'FILL' 1" }}>science</span>
                            Lvl 2
                          </span>
                        </div>
                        <span className="text-sm text-outline">5 hours ago</span>
                      </div>
                    </div>
                    <span className="rounded-full border-[2px] border-error/20 bg-error-container px-[12px] py-[4px] text-label-sm text-on-error-container shadow-[0_2px_0_rgba(186,26,26,0.1)]">Help</span>
                  </div>

                  <h3 className="mb-[8px] text-headline-md font-headline-md text-primary">Stuck on balancing the combustion equation</h3>
                  <p className="mb-[16px] line-clamp-2 text-body-md text-on-surface-variant">I keep ending up with fractional oxygen molecules. Is there a trick to balancing the butane combustion reaction without losing my mind?</p>

                  <div className="mt-[16px] flex items-center justify-between border-t border-outline-variant/30 pt-[16px]">
                    <div className="flex items-center gap-[16px]">
                      <button className="flex items-center gap-[4px] text-outline transition-colors hover:text-error" type="button">
                        <span className="material-symbols-outlined">favorite</span>
                        <span className="text-label-sm">12</span>
                      </button>
                      <button className="flex items-center gap-[4px] text-outline transition-colors hover:text-primary" type="button">
                        <span className="material-symbols-outlined">forum</span>
                        <span className="text-label-sm">3 replies</span>
                      </button>
                    </div>
                    <button className="text-label-sm font-bold text-primary hover:underline" type="button">Help Maya</button>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-[24px]">
              <div className="relative overflow-hidden rounded-[1rem] border-[3px] border-tertiary-fixed-dim bg-gradient-to-br from-tertiary-fixed to-surface-container-lowest p-[24px] shadow-[0_4px_16px_rgba(255,185,95,0.2)]">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/40 blur-xl" />
                <div className="relative z-10 mb-[16px] flex items-center gap-[8px]">
                  <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>emoji_events</span>
                  <h3 className="text-label-sm font-bold uppercase tracking-wider text-tertiary">Top Researcher</h3>
                </div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-[12px] h-24 w-24 overflow-hidden rounded-full border-[4px] border-white shadow-md">
                    <img alt="Top Student" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjoa0M7gAKYZULDTS9MCHEXcK58INxLIHs2R1QygVwyiZIsSMejQ7ff2ym_NSPiWbxOAMbZwejBWS9M5gTUPg6cons_CEG-9gSFJJZQgPqxm2uoXEEQgUDVwQrUfdXQnLv1S_EWqwwYhB3-K4HRYWYjOWCtxaZTziAz9BGOkdSv-Nh3TzU04kvo1B_dTuTZEfGEucXREFThGMMOtcuIP-gxeNvN9oYS5dwVpEzrO81SG6Rv5lgqgS6qY3vpg_uJ_ivLhDVZkyoyP0" />
                  </div>
                  <h4 className="mb-[4px] text-headline-md font-headline-md text-on-surface">Alex Rivera</h4>
                  <p className="mb-[16px] text-body-md text-tertiary-container">Master of Solutions</p>
                  <div className="flex gap-[8px]">
                    <span className="rounded-full border border-tertiary/20 bg-white/60 px-[12px] py-[4px] text-label-sm text-tertiary">42 Solutions</span>
                    <span className="rounded-full border border-tertiary/20 bg-white/60 px-[12px] py-[4px] text-label-sm text-tertiary">Lvl 9</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[1rem] border-[2px] border-surface-variant bg-surface-container-lowest p-[24px] shadow-sm">
                <h3 className="mb-[16px] flex items-center gap-[8px] text-label-sm font-bold text-on-surface">
                  <span className="material-symbols-outlined text-primary">local_offer</span>
                  Trending Elements
                </h3>
                <div className="flex flex-wrap gap-[8px]">
                  <span className="cursor-pointer rounded-full border-[2px] border-primary/20 bg-surface px-[12px] py-[6px] text-label-sm text-primary shadow-[0_2px_0_rgba(0,88,190,0.1)] transition-transform hover:-translate-y-1">#Exothermic</span>
                  <span className="cursor-pointer rounded-full border-[2px] border-secondary/20 bg-surface px-[12px] py-[6px] text-label-sm text-secondary shadow-[0_2px_0_rgba(0,108,73,0.1)] transition-transform hover:-translate-y-1">#AcidsAndBases</span>
                  <span className="cursor-pointer rounded-full border-[2px] border-tertiary/20 bg-surface px-[12px] py-[6px] text-label-sm text-tertiary shadow-[0_2px_0_rgba(130,81,0,0.1)] transition-transform hover:-translate-y-1">#Crystals</span>
                  <span className="cursor-pointer rounded-full border-[2px] border-outline-variant/50 bg-surface px-[12px] py-[6px] text-label-sm text-on-surface-variant shadow-[0_2px_0_rgba(194,198,214,0.3)] transition-transform hover:-translate-y-1">#LabSafety</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="relative bottom-0 mt-auto flex w-full flex-col items-center justify-between gap-4 border-t border-outline-variant bg-surface-container-highest px-[48px] py-[24px] md:flex-row">
        <div className="text-label-md font-headline-md font-bold text-primary">ChemLab 3D</div>
        <p className="text-center text-body-md text-on-surface-variant">© 2024 ChemLab 3D. All rights reserved. Molecular Learning Systems.</p>
        <div className="flex gap-[16px] text-label-sm">
          <Link className="text-on-surface-variant transition-all hover:text-primary hover:underline" href={appRoutes.home}>Privacy Policy</Link>
          <Link className="text-on-surface-variant transition-all hover:text-primary hover:underline" href={appRoutes.home}>Terms of Service</Link>
          <Link className="text-on-surface-variant transition-all hover:text-primary hover:underline" href={appRoutes.home}>Safety Guidelines</Link>
          <Link className="text-on-surface-variant transition-all hover:text-primary hover:underline" href={appRoutes.home}>Research Paper</Link>
        </div>
      </footer>
    </div>
  );
}
