import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Experiment Results',
};

export default function ExperimentResultsPage() {
  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col antialiased">
      <nav className="hidden md:flex justify-between items-center w-full px-gutter h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm fixed top-0 z-50">
        <div className="flex items-center gap-8">
          <div className="text-headline-md font-headline-md font-bold text-primary">ChemLab 3D</div>
          <div className="flex gap-6">
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm hover:bg-primary-container/20 px-3 py-2 rounded-lg" href={appRoutes.experimentLibrary}>Experiments</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm hover:bg-primary-container/20 px-3 py-2 rounded-lg" href={appRoutes.learningPathway}>Curriculum</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm hover:bg-primary-container/20 px-3 py-2 rounded-lg" href={appRoutes.learningCommunity}>Resources</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm hover:bg-primary-container/20 px-3 py-2 rounded-lg" href={appRoutes.settingsCustomization}>Support</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input className="pl-10 pr-4 py-2 bg-surface-container rounded-full border-2 border-transparent focus:border-primary focus:ring-0 text-body-md font-body-md w-64" placeholder="Search..." type="text" />
          </div>
          <button className="text-on-surface-variant hover:bg-primary-container/20 p-2 rounded-full transition-colors flex items-center justify-center"><span className="material-symbols-outlined">notifications</span></button>
          <button className="text-on-surface-variant hover:bg-primary-container/20 p-2 rounded-full transition-colors flex items-center justify-center"><span className="material-symbols-outlined">account_circle</span></button>
          <Link href={appRoutes.launch3dLab} className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-sm text-label-sm border-2 border-primary-container shadow-[0_4px_0_rgb(33,112,228)] hover:shadow-[0_6px_0_rgb(33,112,228)]">Launch Lab</Link>
        </div>
      </nav>

      <main className="flex-grow pt-24 pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-label-sm font-label-sm border-2 border-secondary font-bold">Experiment Complete</span>
              <span className="text-outline text-label-sm font-label-sm">Nov 14, 2024</span>
            </div>
            <h1 className="text-display-lg-mobile md:text-display-lg font-display-lg-mobile md:font-display-lg text-on-surface">Caffeine Extraction Analysis</h1>
          </div>
          <button className="bg-tertiary-container text-on-tertiary-container px-6 py-3 rounded-full font-label-sm text-label-sm border-2 border-tertiary shadow-[0_4px_0_rgb(130,81,0)] hover:shadow-[0_6px_0_rgb(130,81,0)] flex items-center gap-2">
            <span className="material-symbols-outlined">share</span>
            Share to Class
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-surface-container-lowest rounded-xl border-2 border-primary-fixed-dim shadow-[0_8px_24px_rgba(33,112,228,0.1)] p-6 relative overflow-hidden min-h-[400px] flex items-center justify-center">
              <div className="absolute top-4 left-4 flex gap-2">
                <div className="bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-lg border-2 border-surface-variant flex items-center gap-2 shadow-sm text-label-sm font-label-sm"><span className="w-3 h-3 rounded-full bg-[#E53E3E]"></span> Oxygen</div>
                <div className="bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-lg border-2 border-surface-variant flex items-center gap-2 shadow-sm text-label-sm font-label-sm"><span className="w-3 h-3 rounded-full bg-[#4A5568]"></span> Carbon</div>
                <div className="bg-surface/80 backdrop-blur-md px-3 py-1.5 rounded-lg border-2 border-surface-variant flex items-center gap-2 shadow-sm text-label-sm font-label-sm"><span className="w-3 h-3 rounded-full bg-[#3182CE]"></span> Nitrogen</div>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-surface border-2 border-outline-variant p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors shadow-sm"><span className="material-symbols-outlined">360</span></button>
                <button className="bg-surface border-2 border-outline-variant p-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors shadow-sm"><span className="material-symbols-outlined">zoom_in</span></button>
              </div>
              <img alt="A vibrant, cartoonish 3D rendering of a caffeine molecule floating in a bright, modern cream-colored space." className="w-full h-full object-contain max-h-[350px]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNCh3VKNGJ_pD3rQAETipuB8ve-wbyfmDOlWd7dbwUsPif9wVgFGlke6jF22x_J4YnhQCzw1mFroAcMd_Lio8gxMzhW9m4IDeavuQyXRPAVBke8IsTc8gFUAV1YcBswEfLvOOqkT-0QC_B7Mo7BCldiSxoDXRsPbroEPsGZKz7ci9EKUMSwUDgGm1gNkVMOtVjqLicPyhi_GFYVVFvi8S153C31mrptmvDx9cnPWZhJcircc3rv5JLWP1PqDuwtzoigCWINRzIqEk" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-surface-container-lowest rounded-xl border-2 border-secondary-container shadow-[0_4px_12px_rgba(0,113,77,0.05)] p-5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-secondary">check_circle</span><span className="font-label-sm text-label-sm">Accuracy</span></div>
                <div className="text-[36px] font-headline-md font-bold text-on-surface">94%</div>
                <div className="w-full bg-surface-variant h-3 rounded-full mt-2 border border-outline-variant/30"><div className="bg-secondary h-full rounded-full" style={{ width: '94%' }}></div></div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl border-2 border-primary-fixed shadow-[0_4px_12px_rgba(33,112,228,0.05)] p-5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-primary">timer</span><span className="font-label-sm text-label-sm">Time Taken</span></div>
                <div className="text-[36px] font-headline-md font-bold text-on-surface">12m 45s</div>
                <div className="text-label-sm font-label-sm text-secondary flex items-center gap-1 mt-2"><span className="material-symbols-outlined text-[16px]">arrow_downward</span> 2m faster than avg</div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl border-2 border-tertiary-fixed shadow-[0_4px_12px_rgba(163,103,0,0.05)] p-5 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-on-surface-variant"><span className="material-symbols-outlined text-tertiary">health_and_safety</span><span className="font-label-sm text-label-sm">Safety Score</span></div>
                <div className="text-[36px] font-headline-md font-bold text-on-surface">A+</div>
                <div className="text-label-sm font-label-sm text-on-surface-variant mt-2">Perfect PPE usage</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-surface-container-lowest rounded-xl border-2 border-outline-variant/50 shadow-[0_4px_12px_rgba(0,0,0,0.02)] p-6">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">forum</span> Instructor Notes</h3>
              <div className="flex gap-4">
                <img alt="Teacher avatar" className="w-12 h-12 rounded-full border-2 border-primary object-cover shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDt6O4PSu5jsaQky_6IR27cKSReCDBMmN2h3e0YggKlE83hci7Z5pIyl6kzNCxQ2EMke695e23rIiwKJf5h0pNZbs10PTyhSRz83riBjDUnWjiNloAF-03C3dVaaOtI83LcEJ7RDeqcMyCqA-yhH7womaqlhQusqr1B9eCtTyycoNHdt5IW-m8daMG8qq06kJCQfEhQOnL9YMuiIyGsx-ddG-I3PnxdYIsHAj0FPNu51xDzV7SD7QvMUNr0bIXn15FUK453isqODo0" />
                <div className="bg-surface-container-low p-4 rounded-2xl rounded-tl-none border-2 border-surface-variant relative">
                  <p className="text-body-md font-body-md text-on-surface mb-2">Excellent job isolating the compound! Your solvent extraction technique was very precise. Next time, try to be slightly more patient during the evaporation phase to yield larger crystals.</p>
                  <p className="text-label-sm font-label-sm text-on-surface-variant font-bold">— Dr. Aris</p>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-xl border-2 border-outline-variant/50 shadow-[0_4px_12px_rgba(0,0,0,0.02)] p-6 flex-grow">
              <h3 className="text-headline-md font-headline-md text-on-surface mb-6 flex items-center gap-2"><span className="material-symbols-outlined text-primary">analytics</span> Concept Mastery</h3>
              <div className="flex flex-col gap-5">
                <div>
                  <div className="flex justify-between text-label-sm font-label-sm mb-2"><span className="text-on-surface">Solvent Extraction</span><span className="text-primary font-bold">100%</span></div>
                  <div className="w-full bg-surface-variant h-3 rounded-full border border-outline-variant/30"><div className="bg-gradient-to-r from-secondary-container to-primary h-full rounded-full" style={{ width: '100%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-label-sm font-label-sm mb-2"><span className="text-on-surface">Filtration Technique</span><span className="text-primary font-bold">85%</span></div>
                  <div className="w-full bg-surface-variant h-3 rounded-full border border-outline-variant/30"><div className="bg-gradient-to-r from-secondary-container to-primary h-full rounded-full" style={{ width: '85%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-label-sm font-label-sm mb-2"><span className="text-on-surface">Crystallization</span><span className="text-tertiary font-bold">60%</span></div>
                  <div className="w-full bg-surface-variant h-3 rounded-full border border-outline-variant/30"><div className="bg-tertiary-fixed-dim h-full rounded-full" style={{ width: '60%' }}></div></div>
                </div>
              </div>
              <button className="w-full mt-8 bg-surface text-primary border-2 border-primary-fixed-dim py-3 rounded-full font-label-sm text-label-sm font-bold shadow-sm hover:bg-primary-container/10 transition-colors flex justify-center items-center gap-2">
                <span className="material-symbols-outlined">school</span> Review Crystallization
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="flex flex-col md:flex-row justify-between items-center py-8 px-margin-desktop mt-auto w-full bg-surface-container-highest border-t border-outline-variant">
        <div className="text-label-sm font-headline-md font-bold text-primary mb-4 md:mb-0">ChemLab 3D</div>
        <div className="flex gap-6 mb-4 md:mb-0">
          <Link className="text-on-surface-variant hover:text-primary hover:underline transition-all opacity-100 hover:opacity-80 text-label-sm font-label-sm" href={appRoutes.settingsCustomization}>Privacy Policy</Link>
          <Link className="text-on-surface-variant hover:text-primary hover:underline transition-all opacity-100 hover:opacity-80 text-label-sm font-label-sm" href={appRoutes.settingsCustomization}>Terms of Service</Link>
          <Link className="text-on-surface-variant hover:text-primary hover:underline transition-all opacity-100 hover:opacity-80 text-label-sm font-label-sm" href={appRoutes.settingsCustomization}>Safety Guidelines</Link>
          <Link className="text-on-surface-variant hover:text-primary hover:underline transition-all opacity-100 hover:opacity-80 text-label-sm font-label-sm" href={appRoutes.scienceNewsBlog}>Research Paper</Link>
        </div>
        <div className="text-label-sm font-label-sm text-on-surface-variant">© 2024 ChemLab 3D. All rights reserved. Molecular Learning Systems.</div>
      </footer>
    </div>
  );
}
