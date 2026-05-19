import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Student Dashboard',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-surface text-on-surface font-body-md text-body-md antialiased flex flex-col md:flex-row">
      <header className="md:hidden flex justify-between items-center w-full px-margin-mobile py-unit bg-surface shadow-sm border-b-2 border-surface-variant z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">ChemLab 3D</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href={appRoutes.learningCommunity} className="material-symbols-outlined text-primary">notifications</Link>
          <img alt="User" className="w-10 h-10 rounded-full border-2 border-primary object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcORfX44B8cMyte0k5PobHsIONZ8vkJCu1w2hmD3hF4YlpsGX5-7mLHdxwEtuIsWZgEvjWH33dGhvzlnv-KA4TF64Bm3JDG8ohB2iTDS_DySklZzJHddbYtXyJjNnEhOybW1N3qkO3VzbxIw5pedtcKBU95xeeTnVOdJ7h4DUFBZIBi0TiWtTt1D2J-6gzBTeiUCX1rOxBXG6iUErjK6oOUDMGirZHcxFyz12Gzi1lTDnTnKStRYXdZeRQp8xTSlL4wY516IIeFqA"/>
        </div>
      </header>

      <nav className="hidden md:flex flex-col w-64 p-gutter fixed left-0 top-0 h-full bg-surface z-10 border-r-2 border-surface-variant shadow-sm overflow-y-auto">
        <div className="mb-8">
          <div className="font-headline-md text-headline-md text-primary font-bold tracking-tight mb-6">ChemLab 3D</div>
          <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-surface-variant shadow-sm bg-surface-container-lowest">
            <img alt="Professor" className="w-12 h-12 rounded-full border-2 border-secondary object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVgueEGuKu0Sw7Qp8m_fyl1myGFkJO-XlAw0f3jMFVgz6j4-NxignP_hjBC6E57fQTasmigANRdxr1j28cuS3F4JSxcLA7lSQvr8jjnSI_PovLviviGKon4XRMeVmGv1CXAmj2pVcMn9_yDiVrER5Mj3J2bY8SVtTlFWUH_NdtcOHBPIhSn7kn7QBqIzVGM8qJFN4bmjxq3dtrztCex6efTxyxZZnr2dmfVyAY-nW0pkg46htNZftxPXQyAI8-m7IlonMPVrVqCuI"/>
            <div>
              <div className="font-label-sm text-label-sm text-on-surface">Professor Proton</div>
              <div className="font-body-md text-body-md text-on-surface-variant text-sm">Lead Researcher</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <Link className="flex items-center gap-4 p-4 mb-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low" href={appRoutes.launch3dLab}><span className="material-symbols-outlined">science</span><span className="font-label-sm text-label-sm">Lab Bench</span></Link>
          <Link className="flex items-center gap-4 p-4 mb-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low" href={appRoutes.periodicTable}><span className="material-symbols-outlined">apps</span><span className="font-label-sm text-label-sm">Periodic Table</span></Link>
          <Link className="flex items-center gap-4 p-4 mb-2 rounded-lg text-on-surface-variant hover:bg-surface-container-low" href={appRoutes.theoryCourseLibrary}><span className="material-symbols-outlined">menu_book</span><span className="font-label-sm text-label-sm">Formula Book</span></Link>
          <Link className="flex items-center gap-4 p-4 mb-2 rounded-lg bg-secondary-container text-on-secondary-container border-2 border-secondary shadow-[4px_4px_0px_0px_rgba(0,108,73,0.2)]" href={appRoutes.studentDashboard}><span className="material-symbols-outlined">star</span><span className="font-label-sm text-label-sm">My Progress</span></Link>
        </div>
        <Link href={appRoutes.experimentLibrary} className="mt-8 bg-primary text-on-primary py-3 px-6 rounded-full font-label-sm text-label-sm border-2 border-on-primary-fixed-variant shadow-[0_4px_0_0_rgba(0,67,149,0.3)] text-center">New Experiment</Link>
      </nav>

      <main className="flex-grow md:ml-64 p-margin-mobile md:p-margin-desktop w-full max-w-container-max mx-auto flex flex-col gap-gutter overflow-x-hidden">
        <section className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-primary-fixed rounded-full flex items-center justify-center border-4 border-primary shadow-sm flex-shrink-0 relative overflow-hidden">
              <img alt="Mascot" className="absolute inset-0 w-full h-full object-cover animate-bounce" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqXDD2GeRKw7Ptxanso8Vnn4cH8PjIKwOzOGXCvo5NS6SEh4_UFMhabVmmJsPdsZ2G-J2m5sTdiC4tffNf1s7OoUKyzixqwdBIrcfGDT7EKoMTDrufOTTyhF33rGhao78MA2Yp2Qtcqe384nQkC1HB3BVbJncWT3XBTTyf388X8-JSLk5z3HbgM-fADdSnP8EWmMzGJEMNPMvBgSjUhMbUn_DEkaRSZcANaX2H5EPCHkdHwVt_mzGrf74kXXCBtvBJUX7dvpMYw7Q" />
            </div>
            <div>
              <h1 className="font-display-lg-mobile md:font-display-lg text-on-surface">Chào Nhà nghiên cứu Nhí!</h1>
              <p className="font-body-lg text-on-surface-variant mt-2">Ready to discover something new today?</p>
            </div>
          </div>
          <div className="flex gap-4 w-full lg:w-auto">
            <div className="bg-surface-container-lowest border-2 border-tertiary-fixed-dim rounded-xl p-4 flex items-center gap-3 shadow-[0_4px_0_0_rgba(255,185,95,0.2)] flex-1 md:flex-none">
              <div className="bg-tertiary-container text-on-tertiary-container rounded-full w-10 h-10 flex items-center justify-center"><span className="material-symbols-outlined">local_fire_department</span></div>
              <div><div className="font-label-sm text-label-sm text-on-surface-variant">Streak</div><div className="font-headline-md text-headline-md text-tertiary font-bold">5 Days</div></div>
            </div>
            <div className="bg-surface-container-lowest border-2 border-primary-fixed-dim rounded-xl p-4 flex items-center gap-3 shadow-[0_4px_0_0_rgba(173,198,255,0.2)] flex-1 md:flex-none">
              <div className="bg-primary-container text-on-primary-container rounded-full w-10 h-10 flex items-center justify-center"><span className="material-symbols-outlined">flag</span></div>
              <div><div className="font-label-sm text-label-sm text-on-surface-variant">Daily Goal</div><div className="font-headline-md text-headline-md text-primary font-bold">2/3 Labs</div></div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
          <div className="lg:col-span-2 flex flex-col gap-gutter">
            <div className="bg-surface-container-lowest border-2 border-secondary-fixed-dim rounded-xl p-6 shadow-[0_8px_0_0_rgba(78,222,163,0.2)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container rounded-bl-full opacity-50 -mr-10 -mt-10"></div>
              <div className="flex flex-col md:flex-row gap-6 relative z-10">
                <div className="w-full md:w-1/3 aspect-square rounded-xl bg-surface-variant border-2 border-outline-variant relative overflow-hidden">
                  <img alt="Molecule" className="absolute inset-0 w-full h-full object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi8qIkJgz8JorkMo5HbxZgZoGmJUrVfHlbfS6hZzYEAj_QBG_otEgiygVsNwwDsCSxbNR6aDh5vTsoRu4RSkTTHDldzVZg2s1w9kfcvusYRemmwrHHqk2lK8vl5urpZFETS_NjcqToejAf2tAwkcXzWEBx6pGluvT_JXF9C1bw4CNqm4lCipG6PPrJ7izBEyNq-GN-OXrWFdLfuciLAlL43Uoy4TqJ8-uHRHZTN4V2-OnEqjc_IYKRMOjMAvKtFwdn4tmEI2DMCaU"/>
                </div>
                <div className="w-full md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 bg-primary-fixed rounded-full font-label-sm text-label-sm text-on-primary-fixed mb-3 border-2 border-primary-fixed-dim">Module 4</div>
                    <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Hóa học Phân tử</h2>
                    <p className="text-on-surface-variant font-body-md mb-6">Explore the building blocks of the universe! Discover how atoms bond to create everything around us.</p>
                  </div>
                  <div>
                    <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant mb-2"><span>Progress</span><span>65%</span></div>
                    <div className="h-4 bg-surface-variant rounded-full mb-6 border-2 border-outline-variant overflow-hidden"><div className="h-full bg-gradient-to-r from-secondary-fixed-dim to-primary rounded-full w-[65%]"></div></div>
                    <Link href={appRoutes.learningLessons} className="w-full md:w-auto bg-primary text-on-primary py-3 px-8 rounded-full font-label-sm text-label-sm border-2 border-on-primary-fixed-variant shadow-[0_4px_0_0_rgba(0,67,149,0.3)] inline-flex items-center justify-center gap-2">Tiếp tục học<span className="material-symbols-outlined">arrow_forward</span></Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest border-2 border-surface-variant rounded-xl p-6 shadow-sm flex-grow">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-tertiary">map</span>Hành trình của bạn</h3>
              <div className="relative py-12 px-4 flex justify-between items-center w-full overflow-x-auto min-w-[600px]">
                <div className="absolute top-1/2 left-8 right-8 h-4 bg-surface-variant rounded-full -translate-y-1/2 z-0 border-2 border-outline-variant border-dashed"></div>
                <div className="absolute top-1/2 left-8 w-[60%] h-4 bg-secondary-container rounded-full -translate-y-1/2 z-0 border-2 border-secondary-fixed-dim"></div>
                {['Basics','Liquids','Molecules','Reactions','Final Lab'].map((n,i)=><div key={n} className={`relative z-10 flex flex-col items-center gap-2 ${i%2? 'translate-y-4':'-translate-y-4'} ${i>2?'opacity-60':''}`}><div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center ${i===2?'w-20 h-20 bg-primary-container border-primary':'bg-surface-variant border-outline'}`}><span className="material-symbols-outlined">{i<2?'check_circle':i===2?'science':i===3?'lock':'emoji_events'}</span></div><span className="font-label-sm text-[12px] bg-surface-container-lowest px-2 py-1 rounded-md border border-surface-variant">{n}</span></div>)}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-gutter">
            <div className="bg-surface-container-lowest border-2 border-surface-variant rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4"><h3 className="font-headline-md text-headline-md text-on-surface">Achievements</h3><Link className="text-primary font-label-sm text-label-sm hover:underline" href={appRoutes.profileAchievements}>View All</Link></div>
              <div className="grid grid-cols-2 gap-4">
                {['First Mix','Liquid Master','Observer','Locked'].map((b,idx)=><div key={b} className={`flex flex-col items-center gap-2 p-3 bg-surface border-2 rounded-lg ${idx===0?'border-tertiary-fixed-dim':idx===1?'border-primary-fixed-dim':idx===2?'border-secondary-fixed-dim':'border-surface-variant border-dashed opacity-60'}`}><div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center"><span className="material-symbols-outlined">{idx===0?'workspace_premium':idx===1?'water_drop':idx===2?'bug_report':'lock'}</span></div><span className="font-label-sm text-center text-xs">{b}</span></div>)}
              </div>
            </div>

            <div className="bg-surface-container-lowest border-2 border-surface-variant rounded-xl p-6 shadow-sm flex-grow">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">groups</span>Class Board</h3>
              <ul className="flex flex-col gap-4">
                <li className="flex items-start gap-3 p-3 bg-surface rounded-lg border-2 border-surface-variant"><div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center flex-shrink-0 mt-1"><span className="material-symbols-outlined text-sm text-on-secondary-container">campaign</span></div><div><p className="font-label-sm text-label-sm text-on-surface">New Challenge Available!</p><p className="text-on-surface-variant text-sm mt-1">Try the &apos;Volcano Eruption&apos; mini-lab today.</p></div></li>
                <li className="flex items-start gap-3 p-3 bg-surface rounded-lg border-2 border-surface-variant"><div className="w-8 h-8 rounded-full bg-tertiary-container flex items-center justify-center flex-shrink-0 mt-1"><span className="material-symbols-outlined text-sm text-on-tertiary-container">star</span></div><div><p className="font-label-sm text-label-sm text-on-surface">Top Scorer this week</p><p className="text-on-surface-variant text-sm mt-1">Congrats to Team Alpha for completing 10 labs.</p></div></li>
              </ul>
              <Link href={appRoutes.learningCommunity} className="w-full mt-4 py-2 bg-surface text-primary border-2 border-primary rounded-full font-label-sm text-label-sm text-center block">View All Announcements</Link>
            </div>
          </div>
        </div>
      </main>

      <nav className="md:hidden flex justify-between items-center w-full px-margin-mobile py-unit bg-surface border-t-2 border-surface-variant z-10 sticky bottom-0 mt-auto">
        <Link className="flex flex-col items-center p-2 text-on-surface-variant" href={appRoutes.launch3dLab}><span className="material-symbols-outlined">science</span><span className="font-label-sm text-[10px]">Bench</span></Link>
        <Link className="flex flex-col items-center p-2 text-on-surface-variant" href={appRoutes.periodicTable}><span className="material-symbols-outlined">apps</span><span className="font-label-sm text-[10px]">Table</span></Link>
        <Link className="flex flex-col items-center p-2 text-primary font-bold" href={appRoutes.studentDashboard}><div className="bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 mb-1 border-2 border-secondary"><span className="material-symbols-outlined">star</span></div><span className="font-label-sm text-[10px]">Progress</span></Link>
        <Link className="flex flex-col items-center p-2 text-on-surface-variant" href={appRoutes.theoryCourseLibrary}><span className="material-symbols-outlined">menu_book</span><span className="font-label-sm text-[10px]">Book</span></Link>
      </nav>
    </div>
  );
}
