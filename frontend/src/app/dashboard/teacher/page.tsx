import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../config/site-routes';

export const metadata: Metadata = {
  title: 'Teacher Dashboard - ChemLab 3D',
  description: 'Bảng điều khiển giáo viên: tổng quan lớp, tiến độ học sinh và hành động giảng dạy.',
};

const students = [
  { name: 'Emma Thompson', status: 'Online', note: 'Lab: Polymer Synthesis', tone: 'secondary' },
  { name: 'James Wilson', status: 'Needs Help', note: 'Stuck on Step 4', tone: 'error' },
  { name: 'Liam Davis', status: 'Offline', note: 'Last seen 2 hrs ago', tone: 'outline' },
] as const;

export default function TeacherDashboardPage() {
  return (
    <div className="flex min-h-screen bg-surface text-on-surface antialiased">
      <nav className="fixed left-0 top-0 z-20 my-6 ml-margin-desktop flex h-[calc(100vh-48px)] w-64 flex-col overflow-hidden rounded-lg border-2 border-surface-variant bg-surface p-gutter shadow-sm">
        <img
          alt=""
          className="pointer-events-none absolute -left-8 bottom-20 w-48 object-contain opacity-[0.15]"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp28mxKIHXIF6IZVtY5G_poZ7YTohMowFsesR3iD_9ADtgdXGFfhpy0sfx6Bft76QUfqkIn4ug46_pC2wJoix5bbhNKGvTXCmEcfnipwyzkvEGAdvprvU3fO7nuue3wkzN6aIjXJubwkA8IIKNKGBkKrZQ4O9cVJrSlPCqrR-NdD69KoiFzjR419FpCd8fmd9PV6KM6v-pbl0bEEbLuhQBvvX81FNVaBMyQxEljG_ldMulAjhVzP0271fMyLJFfRqz3Dx2etki_Ns"
        />

        <div className="relative z-10 mb-8 flex items-center gap-4">
          <img
            alt="Professor Proton avatar"
            className="h-12 w-12 rounded-full border-2 border-primary bg-surface-container-lowest object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJYlt_5BrveOZq0PZSvI0NUqzIVpHlkq5k99zz7k4IEXTG6n5MYiMDFzl40eZBX9spDI8aV2lwqpTojAnd4wNiec3A5F_LUNt08xxOJ57Uh4SpGuLd6hduIRmg1QBN89RWejXectbbrGGUlojDoBjqVcRPwQ20DvG733BXU1Khr7PZQUJy2WX4jYUlnQyuZiy_BU4KGsMmKQJ5KW6x-ZGjIsFOKTi7iSoUlJNDQS7qiNaOsZpFHS3KH9-NfX5mGuk9Q5g6dRUkLBo"
          />
          <div>
            <h2 className="w-32 truncate font-headline-md text-headline-md text-primary">Professor Proton</h2>
            <p className="text-sm text-on-surface-variant opacity-80">Lead Researcher</p>
          </div>
        </div>

        <div className="relative z-10 flex flex-1 flex-col gap-2">
          <Link className="mb-2 flex items-center gap-4 rounded-lg p-4 text-on-surface-variant transition-all duration-200 hover:scale-[1.03] hover:bg-surface-container-low" href={appRoutes.launch3dLab}><span className="material-symbols-outlined">science</span><span>Lab Bench</span></Link>
          <Link className="mb-2 flex items-center gap-4 rounded-lg p-4 text-on-surface-variant transition-all duration-200 hover:scale-[1.03] hover:bg-surface-container-low" href={appRoutes.periodicTable}><span className="material-symbols-outlined">apps</span><span>Periodic Table</span></Link>
          <Link className="mb-2 flex items-center gap-4 rounded-lg p-4 text-on-surface-variant transition-all duration-200 hover:scale-[1.03] hover:bg-surface-container-low" href={appRoutes.theoryCourseLibrary}><span className="material-symbols-outlined">menu_book</span><span>Formula Book</span></Link>
          <Link className="mb-2 flex items-center gap-4 rounded-lg border-2 border-secondary bg-secondary-container p-4 text-on-secondary-container shadow-[4px_4px_0px_0px_rgba(0,108,73,0.2)] transition-all duration-200 hover:scale-[1.03]" href={appRoutes.teacherDashboard}><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span><span>My Progress</span></Link>
        </div>

        <Link href={appRoutes.experimentLibrary} className="squishy-btn relative z-10 mt-auto flex items-center justify-center gap-2 rounded-full border-2 border-primary-fixed-variant bg-primary px-4 py-3 font-label-sm text-label-sm text-on-primary shadow-[0_4px_0_0_rgba(0,67,149,1)]">
          <span className="material-symbols-outlined">add</span>
          New Experiment
        </Link>
      </nav>

      <main className="relative mx-auto my-6 ml-[calc(256px+48px+24px)] mr-margin-desktop flex max-w-container-max flex-1 flex-col gap-gutter">
        <header className="sticky top-6 z-10 flex w-full items-center justify-between rounded-lg border-2 border-surface-variant bg-surface px-gutter py-unit shadow-sm">
          <div className="w-1/3">
            <div className="relative w-full max-w-xs">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="w-full rounded-full border-2 border-outline-variant bg-surface-container-low py-2 pl-10 pr-4" placeholder="Search student or lab..." type="text" />
            </div>
          </div>
          <div className="font-headline-md text-headline-md font-bold tracking-tight text-primary">ChemLab 3D</div>
          <div className="flex w-1/3 items-center justify-end gap-4">
            <Link href={appRoutes.learningCommunity} className="flex items-center gap-2 text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">notifications</span></Link>
            <Link href={appRoutes.launch3dLab} className="rounded-full border-2 border-primary/20 bg-primary-container px-4 py-2 font-label-sm text-label-sm text-on-primary-container">Launch Lab</Link>
            <img
              alt="Professor Proton avatar"
              className="h-10 w-10 cursor-pointer rounded-full border-2 border-secondary bg-surface-container-lowest object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJYlt_5BrveOZq0PZSvI0NUqzIVpHlkq5k99zz7k4IEXTG6n5MYiMDFzl40eZBX9spDI8aV2lwqpTojAnd4wNiec3A5F_LUNt08xxOJ57Uh4SpGuLd6hduIRmg1QBN89RWejXectbbrGGUlojDoBjqVcRPwQ20DvG733BXU1Khr7PZQUJy2WX4jYUlnQyuZiy_BU4KGsMmKQJ5KW6x-ZGjIsFOKTi7iSoUlJNDQS7qiNaOsZpFHS3KH9-NfX5mGuk9Q5g6dRUkLBo"
            />
          </div>
        </header>

        <div className="mt-4 flex flex-col gap-8">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-display-lg text-display-lg text-on-surface">Class Overview</h1>
              <p className="mt-2 font-body-lg text-body-lg text-on-surface-variant">Section A - Introduction to Polymers</p>
            </div>
            <Link href={appRoutes.createContent} className="squishy-btn flex items-center gap-2 rounded-full border-2 border-tertiary bg-tertiary-container px-6 py-3 font-label-sm text-label-sm text-on-tertiary-container shadow-[0_4px_0_0_rgba(130,81,0,1)]">
              <span className="material-symbols-outlined">assignment_add</span>
              Giao bài mới
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="bento-card relative flex h-48 flex-col justify-between overflow-hidden rounded border-2 border-primary/30 bg-surface-container-lowest p-6 shadow-sm">
              <img alt="" className="pointer-events-none absolute -bottom-6 -right-6 w-32 object-contain opacity-[0.15]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp28mxKIHXIF6IZVtY5G_poZ7YTohMowFsesR3iD_9ADtgdXGFfhpy0sfx6Bft76QUfqkIn4ug46_pC2wJoix5bbhNKGvTXCmEcfnipwyzkvEGAdvprvU3fO7nuue3wkzN6aIjXJubwkA8IIKNKGBkKrZQ4O9cVJrSlPCqrR-NdD69KoiFzjR419FpCd8fmd9PV6KM6v-pbl0bEEbLuhQBvvX81FNVaBMyQxEljG_ldMulAjhVzP0271fMyLJFfRqz3Dx2etki_Ns" />
              <div>
                <h3 className="flex items-center gap-2 font-headline-md text-headline-md"><span className="material-symbols-outlined text-primary">analytics</span>Class Average</h3>
                <p className="mt-1 font-body-md text-body-md text-on-surface-variant">Overall Lab Score</p>
              </div>
              <div className="flex items-baseline gap-2"><span className="font-display-lg text-display-lg text-primary">87</span><span className="font-body-lg text-body-lg text-on-surface-variant">%</span></div>
              <div className="mt-2 h-3 w-full rounded-full bg-surface-variant"><div className="h-full w-[87%] rounded-full bg-gradient-to-r from-secondary-container to-primary" /></div>
            </div>

            <div className="bento-card relative flex h-48 flex-col justify-between overflow-hidden rounded border-2 border-secondary/30 bg-surface-container-lowest p-6 shadow-sm">
              <img alt="" className="pointer-events-none absolute -bottom-6 -right-6 w-32 object-contain opacity-[0.15]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp28mxKIHXIF6IZVtY5G_poZ7YTohMowFsesR3iD_9ADtgdXGFfhpy0sfx6Bft76QUfqkIn4ug46_pC2wJoix5bbhNKGvTXCmEcfnipwyzkvEGAdvprvU3fO7nuue3wkzN6aIjXJubwkA8IIKNKGBkKrZQ4O9cVJrSlPCqrR-NdD69KoiFzjR419FpCd8fmd9PV6KM6v-pbl0bEEbLuhQBvvX81FNVaBMyQxEljG_ldMulAjhVzP0271fMyLJFfRqz3Dx2etki_Ns" />
              <div>
                <h3 className="flex items-center gap-2 font-headline-md text-headline-md"><span className="material-symbols-outlined text-secondary">group</span>Active Now</h3>
                <p className="mt-1 font-body-md text-body-md text-on-surface-variant">Working on labs</p>
              </div>
              <div className="flex items-baseline gap-2"><span className="font-display-lg text-display-lg text-secondary">24</span><span className="font-body-lg text-body-lg text-on-surface-variant">/ 30</span></div>
              <div className="mt-2 flex gap-1"><div className="mt-auto h-4 flex-1 rounded-t bg-secondary-container/50" /><div className="mt-auto h-8 flex-1 rounded-t bg-secondary-container/70" /><div className="mt-auto h-12 flex-1 rounded-t bg-secondary-fixed" /><div className="mt-auto h-6 flex-1 rounded-t bg-secondary" /><div className="mt-auto h-10 flex-1 rounded-t bg-secondary-fixed-dim" /></div>
            </div>

            <div className="bento-card relative flex h-48 flex-col justify-between overflow-hidden rounded border-2 border-error-container bg-surface-container-lowest p-6 shadow-sm">
              <img alt="" className="pointer-events-none absolute -bottom-6 -right-6 w-32 object-contain opacity-[0.15]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp28mxKIHXIF6IZVtY5G_poZ7YTohMowFsesR3iD_9ADtgdXGFfhpy0sfx6Bft76QUfqkIn4ug46_pC2wJoix5bbhNKGvTXCmEcfnipwyzkvEGAdvprvU3fO7nuue3wkzN6aIjXJubwkA8IIKNKGBkKrZQ4O9cVJrSlPCqrR-NdD69KoiFzjR419FpCd8fmd9PV6KM6v-pbl0bEEbLuhQBvvX81FNVaBMyQxEljG_ldMulAjhVzP0271fMyLJFfRqz3Dx2etki_Ns" />
              <div className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface-container-lowest bg-error font-label-sm text-xs text-on-error">12</div>
              <div>
                <h3 className="flex items-center gap-2 font-headline-md text-headline-md"><span className="material-symbols-outlined text-error">assignment_late</span>Action Required</h3>
                <p className="mt-1 font-body-md text-body-md text-on-surface-variant">Pending review</p>
              </div>
              <div>
                <h4 className="font-headline-md text-headline-md text-error">Bài nộp cần chấm</h4>
                <Link href={appRoutes.contentManagement} className="mt-4 flex items-center gap-1 font-label-sm text-label-sm text-primary hover:underline">Review Now <span className="material-symbols-outlined text-sm">arrow_forward</span></Link>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded border-2 border-outline-variant bg-surface-container-lowest p-6 shadow-sm">
            <div className="flex items-center justify-between border-b-2 border-surface-variant pb-4">
              <h2 className="flex items-center gap-2 font-headline-md text-headline-md"><span className="material-symbols-outlined">emoji_people</span>Student Status</h2>
              <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary"><span className="material-symbols-outlined">filter_list</span> Filter</button>
            </div>

            <div className="flex flex-col gap-3">
              {students.map((s) => (
                <div key={s.name} className={`flex items-center justify-between rounded-lg border-2 border-transparent p-3 transition-colors hover:border-surface-variant hover:bg-surface-container-low ${s.tone === 'outline' ? 'opacity-70' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-12 rounded-full border-2 ${s.tone === 'secondary' ? 'border-secondary' : s.tone === 'error' ? 'border-error' : 'border-outline-variant'} ${s.tone === 'outline' ? 'grayscale' : ''} bg-surface-variant`} />
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface">{s.name}</p>
                      <p className="text-sm text-on-surface-variant">{s.note}</p>
                    </div>
                  </div>
                  {s.tone === 'secondary' ? (
                    <div className="flex items-center gap-1 rounded-full border-2 border-secondary bg-secondary-container px-3 py-1 font-label-sm text-xs text-on-secondary-container"><span className="h-2 w-2 rounded-full bg-secondary" />Online</div>
                  ) : s.tone === 'error' ? (
                    <div className="flex items-center gap-1 rounded-full border-2 border-error bg-error-container px-3 py-1 font-label-sm text-xs text-on-error-container shadow-[2px_2px_0px_0px_rgba(186,26,26,0.2)]"><span className="material-symbols-outlined text-sm">front_hand</span>Needs Help</div>
                  ) : (
                    <div className="flex items-center gap-1 rounded-full border-2 border-outline-variant bg-surface-variant px-3 py-1 font-label-sm text-xs text-on-surface-variant"><span className="material-symbols-outlined text-sm">cloud_off</span>Offline</div>
                  )}
                </div>
              ))}

              <Link href={appRoutes.classManagementDetailed} className="mt-2 w-full rounded py-3 text-center font-label-sm text-label-sm text-primary transition-colors hover:bg-surface-container-low">
                View All 30 Students
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
