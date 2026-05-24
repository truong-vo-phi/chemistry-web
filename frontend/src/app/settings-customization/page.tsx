import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'Settings - ChemLab 3D',
  description: 'Customize your ChemLab 3D profile, theme, notifications, and integrations.',
};

export default function SettingsCustomizationPage() {
  return (
    <div className="min-h-screen bg-background text-on-background font-body-md antialiased">
      <nav className="fixed top-0 z-50 hidden h-16 w-full items-center justify-between border-b border-outline-variant/30 bg-surface/80 px-gutter backdrop-blur-xl shadow-sm md:flex">
        <div className="flex items-center gap-8">
          <span className="text-headline-md font-headline-md font-bold text-primary">ChemLab 3D</span>
          <div className="flex items-center gap-6">
            <Link className="rounded-lg px-3 py-2 text-label-sm text-on-surface-variant transition-colors hover:bg-primary-container/20 hover:text-primary" href={appRoutes.experimentLibrary}>Experiments</Link>
            <Link className="rounded-lg px-3 py-2 text-label-sm text-on-surface-variant transition-colors hover:bg-primary-container/20 hover:text-primary" href={appRoutes.theoryCourseLibrary}>Curriculum</Link>
            <Link className="rounded-lg px-3 py-2 text-label-sm text-on-surface-variant transition-colors hover:bg-primary-container/20 hover:text-primary" href={appRoutes.periodicTable}>Resources</Link>
            <Link className="rounded-lg px-3 py-2 text-label-sm text-on-surface-variant transition-colors hover:bg-primary-container/20 hover:text-primary" href={appRoutes.learningCommunity}>Support</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-primary-container/20 hover:text-primary" type="button">
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button className="rounded-full p-2 text-on-surface-variant transition-colors hover:bg-primary-container/20 hover:text-primary" type="button">
            <span className="material-symbols-outlined">account_circle</span>
          </button>
          <Link className="rounded-full border-2 border-primary-container bg-primary px-4 py-2 font-label-sm text-on-primary transition-all active:scale-95 hover:shadow-md" href={appRoutes.launch3dLab}>
            Launch Lab
          </Link>
        </div>
      </nav>

      <div className="flex flex-1 pb-24 pt-16 md:pb-0">
        <aside className="fixed left-0 top-0 z-40 m-4 mt-20 hidden h-[calc(100vh-32px)] w-64 flex-col rounded-xl border border-white/20 bg-surface/90 py-2 shadow-[0px_10px_30px_rgba(59,132,246,0.08)] backdrop-blur-2xl md:flex">
          <div className="flex items-center gap-4 border-b border-outline-variant/30 px-6 py-4">
            <img
              alt="User Profile"
              className="h-10 w-10 rounded-full border-2 border-primary"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDia3kflrmynUf6lfl9ZHy2QSBaDZY-e-d6UaBA666vaORocjFgVyp_L9oK1TGavHc9PAo7UfD1vsQFtKBWMJQYNCZJ7QaUku_srt-Ap6_cbuRbJ_dTF8d_pzqGPHQ87LxR2KhrHxMUPNPLQXwOgGrV0lJra9ib8PfpMZv1lEBohBYGFdtmGhN1_HtgzKzugzf-bwdTjYHcyZXuFk9oJTk2gjNkBXPocRU62PvRzHF1VSdI04aJJtRTg17ucoranO9TX2xgxUIkajk"
            />
            <div>
              <h2 className="text-sm font-headline-md font-bold text-primary">ChemLab 3D</h2>
              <p className="text-xs font-label-sm text-on-surface-variant">Active Session</p>
            </div>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto py-4">
            <Link className="mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-label-sm text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-high" href={appRoutes.teacherDashboard}>
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </Link>
            <Link className="mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-label-sm text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-high" href={appRoutes.experimentLibrary}>
              <span className="material-symbols-outlined">science</span>
              Experiment Lab
            </Link>
            <Link className="mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-label-sm text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-high" href={appRoutes.classManagementDetailed}>
              <span className="material-symbols-outlined">groups</span>
              Classroom
            </Link>
            <Link className="mx-2 my-1 flex items-center gap-3 rounded-lg px-4 py-3 text-label-sm text-on-surface-variant transition-all hover:scale-[1.02] hover:bg-surface-container-high" href={appRoutes.userManagement}>
              <span className="material-symbols-outlined">leaderboard</span>
              Analytics
            </Link>
            <Link className="mx-2 my-1 flex translate-x-1 items-center gap-3 rounded-lg bg-primary-container px-4 py-3 font-semibold text-label-sm text-on-primary-container" href={appRoutes.settingsCustomization}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
              Settings
            </Link>
          </nav>
          <div className="mt-auto flex flex-col gap-2 border-t border-outline-variant/30 px-4 py-4">
            <Link className="w-full rounded-full border-2 border-secondary-container bg-secondary py-2 text-center font-label-sm text-on-secondary transition-all hover:shadow-md active:scale-95" href={appRoutes.launch3dLab}>
              Start Reaction
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-4 py-2 text-label-sm text-on-surface-variant transition-all hover:bg-surface-container-highest/50" href={appRoutes.learningCommunity}>
              <span className="material-symbols-outlined text-sm">help</span> Help
            </Link>
            <Link className="flex items-center gap-3 rounded-lg px-4 py-2 text-label-sm text-on-surface-variant transition-all hover:bg-surface-container-highest/50" href={appRoutes.home}>
              <span className="material-symbols-outlined text-sm">logout</span> Sign Out
            </Link>
          </div>
        </aside>

        <main className="mx-auto w-full max-w-container-max flex-1 px-margin-mobile py-8 md:ml-[280px] md:px-margin-desktop">
          <header className="mb-8">
            <h1 className="mb-2 text-display-lg-mobile font-display-lg-mobile text-primary md:text-display-lg md:font-display-lg">System Settings &amp; Profile</h1>
            <p className="text-body-lg font-body-lg text-on-surface-variant">Customize your 3D Academy experience.</p>
          </header>

          <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
            <section className="flex flex-col items-center rounded-xl border-2 border-primary-fixed-dim bg-surface-container-lowest p-6 text-center shadow-sm lg:col-span-1">
              <div className="group relative mb-4 h-32 w-32 cursor-pointer">
                <img
                  alt="Avatar"
                  className="h-full w-full rounded-full border-4 border-surface-container-lowest object-cover shadow-md"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBXAkP2fLC9Zw7cD110c-Sopu8YSBCQ9cUd-EOGmvF7I0pDtI7X21co8gCEZMMyqymk_V8_oahlsULusnvD97aRwsyg0ZV4zLkyK57JI3Ah0M7WfHbHFAPkzjnUu1VGUHocc7NbzEKYyzLiv4Dns5o03ipt7QrOKoy5C2-LMEIEXXh7yIq8NB4jFx0RdK0NOhS_ORl0LANArfhy1y1yuMPd_FYdcowgSJMGvnFkObGX1WirVgAZKcc_3px37ReXwW4on9iIGhf8Lo"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="material-symbols-outlined text-3xl text-on-primary">edit</span>
                </div>
              </div>
              <h3 className="mb-1 text-headline-md font-headline-md text-on-surface">Alex Student</h3>
              <p className="mb-6 text-body-md font-body-md text-on-surface-variant">Year 2 Alchemist</p>
              <button className="mb-4 w-full rounded-full border-2 border-primary-fixed-dim bg-surface px-4 py-2 font-label-sm text-primary shadow-sm transition-colors hover:bg-primary-fixed active:translate-y-px active:shadow-none" type="button">
                Edit 3D Mascot
              </button>
              <div className="w-full text-left">
                <label className="ml-2 mb-2 block text-label-sm font-label-sm text-on-surface-variant">Display Name</label>
                <input
                  className="w-full rounded-full border-2 border-outline-variant bg-surface px-4 py-2 text-body-md font-body-md transition-all focus:border-primary focus:outline-none focus:ring-0 focus:shadow-[0_0_0_3px_rgba(0,88,190,0.2)]"
                  defaultValue="Alex Student"
                  type="text"
                />
              </div>
            </section>

            <section className="grid grid-cols-1 gap-gutter md:grid-cols-2 lg:col-span-2">
              <div className="col-span-1 rounded-xl border-2 border-secondary-fixed-dim bg-surface-container-lowest p-6 shadow-sm md:col-span-2">
                <div className="mb-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>palette</span>
                  <h3 className="text-headline-md font-headline-md text-on-surface">Lab Environment Theme</h3>
                </div>
                <p className="mb-4 text-body-md font-body-md text-on-surface-variant">Select the ambiance for your 3D workspace.</p>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="group cursor-pointer">
                    <div className="relative mb-2 h-24 w-full overflow-hidden rounded-xl border-2 border-primary bg-primary-fixed shadow-[0_4px_0_0_#adc6ff] transition-all active:translate-y-1 active:shadow-none">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-container/30 to-transparent" />
                      <span className="material-symbols-outlined absolute bottom-2 right-2 text-xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                    <p className="text-center text-label-sm font-label-sm text-primary">Classic Cream</p>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="relative mb-2 h-24 w-full overflow-hidden rounded-xl border-2 border-outline-variant bg-surface-container-low shadow-sm transition-all hover:border-secondary">
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary-container/20 to-transparent" />
                    </div>
                    <p className="text-center text-label-sm font-label-sm text-on-surface-variant group-hover:text-secondary">Neon Flask</p>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="relative mb-2 h-24 w-full overflow-hidden rounded-xl border-2 border-outline-variant bg-surface-dim shadow-sm transition-all hover:border-tertiary">
                      <div className="absolute inset-0 bg-gradient-to-br from-tertiary-container/20 to-transparent" />
                    </div>
                    <p className="text-center text-label-sm font-label-sm text-on-surface-variant group-hover:text-tertiary">Midnight Magma</p>
                  </div>

                  <div className="group cursor-pointer">
                    <div className="relative mb-2 h-24 w-full overflow-hidden rounded-xl border-2 border-outline-variant bg-inverse-on-surface shadow-sm transition-all hover:border-on-surface">
                      <div className="absolute inset-0 bg-gradient-to-br from-outline/20 to-transparent" />
                    </div>
                    <p className="text-center text-label-sm font-label-sm text-on-surface-variant group-hover:text-on-surface">Crystal Cave</p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border-2 border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-primary">notifications_active</span>
                  <h3 className="text-lg font-headline-md text-on-surface">Notifications</h3>
                </div>
                <div className="space-y-4">
                  {['Experiment Completion', 'New Curriculum Unlock', 'Weekly Lab Reports'].map((item, idx) => (
                    <label key={item} className="group flex cursor-pointer items-center justify-between">
                      <span className="text-body-md font-body-md text-on-surface">{item}</span>
                      <div className="relative">
                        <input className="peer sr-only" defaultChecked={idx < 2} type="checkbox" />
                        <div className="h-6 w-11 rounded-full bg-surface-variant after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-outline-variant after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white" />
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border-2 border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
                <div className="mb-4 flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl text-tertiary">extension</span>
                  <h3 className="text-lg font-headline-md text-on-surface">Integrations</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border-2 border-surface-variant bg-surface p-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-on-surface-variant">school</span>
                      <span className="text-body-md font-body-md text-on-surface">Google Classroom</span>
                    </div>
                    <button className="text-label-sm font-label-sm text-primary hover:underline" type="button">Connect</button>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border-2 border-secondary-fixed bg-surface p-3">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      <span className="text-body-md font-body-md text-on-surface">Canvas LMS</span>
                    </div>
                    <button className="text-label-sm font-label-sm text-error hover:underline" type="button">Disconnect</button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            <button className="rounded-full border-2 border-outline-variant bg-surface px-6 py-2 font-label-sm text-on-surface-variant shadow-sm transition-colors hover:bg-surface-variant active:translate-y-px active:shadow-none" type="button">
              Cancel
            </button>
            <button className="rounded-full border-2 border-primary-container bg-primary px-6 py-2 font-label-sm text-on-primary shadow-sm transition-all hover:shadow-md active:translate-y-px active:shadow-none" type="button">
              Save Changes
            </button>
          </div>
        </main>
      </div>

      <footer className="relative z-50 mt-auto flex w-full flex-col items-center justify-between border-t border-outline-variant bg-surface-container-highest px-gutter py-10 md:flex-row">
        <div className="mb-4 text-center md:mb-0 md:text-left">
          <span className="font-headline-md text-primary">ChemLab 3D</span>
          <p className="mt-1 text-sm text-on-surface-variant">© 2024 ChemLab 3D. All rights reserved. Molecular Learning Systems.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <Link className="text-label-sm text-on-surface-variant transition-all hover:text-primary hover:underline" href={appRoutes.home}>Privacy Policy</Link>
          <Link className="text-label-sm text-on-surface-variant transition-all hover:text-primary hover:underline" href={appRoutes.home}>Terms of Service</Link>
          <Link className="text-label-sm text-on-surface-variant transition-all hover:text-primary hover:underline" href={appRoutes.home}>Safety Guidelines</Link>
          <Link className="text-label-sm text-on-surface-variant transition-all hover:text-primary hover:underline" href={appRoutes.home}>Research Paper</Link>
        </div>
      </footer>
    </div>
  );
}
