import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Game Launcher',
};

export default function Launch3DLabPage() {
  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md text-body-md overflow-x-hidden">
      <header className="fixed w-full top-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-sm justify-between items-center px-gutter h-16 hidden md:flex">
        <div className="flex items-center gap-8">
          <span className="text-headline-md font-headline-md font-bold text-primary">ChemLab 3D</span>
          <nav className="flex gap-4">
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm hover:bg-primary-container/20 px-3 py-2 rounded-lg" href={appRoutes.experimentLibrary}>Experiments</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm hover:bg-primary-container/20 px-3 py-2 rounded-lg" href={appRoutes.learningPathway}>Curriculum</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm hover:bg-primary-container/20 px-3 py-2 rounded-lg" href={appRoutes.learningCommunity}>Resources</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors text-label-sm font-label-sm hover:bg-primary-container/20 px-3 py-2 rounded-lg" href={appRoutes.settingsCustomization}>Support</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary-container/20 transition-colors"><span className="material-symbols-outlined">notifications</span></button>
            <button className="p-2 rounded-full text-on-surface-variant hover:text-primary hover:bg-primary-container/20 transition-colors"><span className="material-symbols-outlined">account_circle</span></button>
          </div>
          <button className="bg-primary text-on-primary font-bold px-6 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-primary-container transition-all active:shadow-none active:translate-y-0.5 border-2 border-[#004395]">Launch Lab</button>
        </div>
      </header>

      <main className="flex-grow pt-[80px] px-margin-mobile md:px-margin-desktop pb-margin-desktop flex flex-col relative z-10">
        <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida/ADBb0uhYcj7vchTdsItU-QmNZj2vEfdW0-itZ5I8lzFFoXq0s2p34RkAGpTTYgbMJ1uOVmwfpMQ4isIHKdf7fmbey4ASa9YdscPMCr87J1gdxTdn5K-dAMiM0v3F5cyHJ1jxCV3n3cTHK8UmNqBvwaeVt4w0M52NlcTDXZXFVdKa-lPSuq2p6tR3-Ajl9uEVy68IrGFx56g6oXeVWe4uNx1kNv-U-xwmzcLCSo_AeBHf328FRdZAwcu8AYeJNw')", backgroundSize: 'cover', backgroundPosition: 'center', filter: 'blur(20px)' }} />

        <div className="w-full max-w-container-max mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-bright rounded-xl border-2 border-outline-variant/30 shadow-[0_4px_12px_rgba(0,88,190,0.08)] p-6 relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary-fixed rounded-full blur-3xl opacity-50"></div>
              <h2 className="text-headline-md font-headline-md text-on-surface mb-4">Lab Partner</h2>
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full border-4 border-primary-container bg-surface-container overflow-hidden shadow-lg relative cursor-pointer hover:scale-105 transition-transform duration-300">
                  <img alt="Alex Rivera Mascot" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/ADBb0uiEo1xYqDY6XTbyk3Ddr3acHYsnPqbG19d0lofldJDsc9MfWTvZgaGdBE712W37zCfOtqa13esl-G-KLD_1nIKSFszG2LMcd1eQ8C1vZ7QcQMkdFQffoCzDg2WftR0UyAuv3Z793pu9oB0M_UOxTkKSesRycblPwNhgaMQWj9hVe0bcdpX40mIkPJ8qVQR4YoFWMQCOUruXfIZ95LlVB27dIRXrCIx8beG4H4GjFqRglByrH_QM1xbXLHI" />
                </div>
                <div className="text-center">
                  <h3 className="text-body-lg font-body-lg text-on-surface font-bold">Alex Rivera</h3>
                  <p className="text-on-surface-variant text-label-sm font-label-sm">Level 12 Chemist</p>
                </div>
                <button className="w-full mt-2 py-2 px-4 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary-container hover:text-on-primary-container transition-colors">Change Partner</button>
              </div>
            </div>

            <div className="bg-surface-bright rounded-xl border-2 border-outline-variant/30 shadow-[0_4px_12px_rgba(0,88,190,0.08)] p-6 flex flex-col h-full max-h-[400px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-headline-md font-headline-md text-on-surface">Patch Notes</h2>
                <span className="bg-secondary-container text-on-secondary-container text-label-sm font-label-sm px-2 py-1 rounded-full border-2 border-secondary font-bold">v2.4.1</span>
              </div>
              <div className="overflow-y-auto pr-2 space-y-4 flex-grow custom-scrollbar">
                <div className="pb-3 border-b border-outline-variant/30">
                  <h4 className="text-body-md font-body-md font-bold text-on-surface mb-1">New: Polymerization Lab</h4>
                  <p className="text-on-surface-variant text-sm">Explore the creation of synthetic polymers with new interactive 3D elements.</p>
                </div>
                <div className="pb-3 border-b border-outline-variant/30">
                  <h4 className="text-body-md font-body-md font-bold text-on-surface mb-1">Updated Physics Engine</h4>
                  <p className="text-on-surface-variant text-sm">Liquid dynamics have been improved for more realistic mixing simulations.</p>
                </div>
                <div className="pb-3">
                  <h4 className="text-body-md font-body-md font-bold text-on-surface mb-1">Bug Fixes</h4>
                  <ul className="list-disc pl-4 text-on-surface-variant text-sm space-y-1">
                    <li>Fixed issue with Bunsen burner clipping.</li>
                    <li>Resolved UI overlap in the periodic table view.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col justify-end gap-6 h-full min-h-[600px]">
            <div className="flex-grow flex items-center justify-center relative">
              <div className="absolute w-64 h-64 bg-secondary-fixed rounded-full blur-[80px] opacity-40 animate-pulse"></div>
              <div className="absolute w-48 h-48 bg-primary-fixed rounded-full blur-[60px] opacity-50 translate-x-10 -translate-y-10"></div>
              <button className="relative z-10 group flex flex-col items-center justify-center gap-4 bg-primary text-on-primary rounded-xl w-64 h-64 border-4 border-[#004395] shadow-[0_12px_24px_rgba(0,88,190,0.4)] hover:shadow-[0_16px_32px_rgba(0,88,190,0.6)] hover:-translate-y-2 active:translate-y-1 active:shadow-none transition-all duration-300">
                <span className="material-symbols-outlined text-[80px] group-hover:scale-110 transition-transform duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
                <span className="text-headline-md font-headline-md font-bold tracking-wide uppercase">Enter 3D Lab</span>
              </button>
            </div>

            <div className="bg-surface-bright rounded-xl border-2 border-outline-variant/30 shadow-[0_4px_12px_rgba(0,88,190,0.08)] p-6">
              <div className="flex justify-between items-end mb-3">
                <div>
                  <h3 className="text-body-md font-body-md font-bold text-on-surface">Downloading Assets...</h3>
                  <p className="text-label-sm font-label-sm text-on-surface-variant">Organic Chemistry Module - 450MB / 1.2GB</p>
                </div>
                <span className="text-body-lg font-body-lg font-bold text-primary">38%</span>
              </div>
              <div className="h-3 w-full bg-surface-variant rounded-full overflow-hidden border border-outline-variant/20">
                <div className="h-full bg-gradient-to-r from-secondary-fixed-dim to-primary rounded-full relative w-[38%]">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-white/30 rounded-t-full"></div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-4">
                  <button className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-variant"><span className="material-symbols-outlined">pause</span></button>
                  <button className="text-on-surface-variant hover:text-error transition-colors p-2 rounded-full hover:bg-error-container"><span className="material-symbols-outlined">close</span></button>
                </div>
                <div className="text-label-sm font-label-sm text-on-surface-variant flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">speed</span>12 MB/s</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="w-full relative bottom-0 bg-surface-container-highest border-t border-outline-variant flex flex-col md:flex-row justify-between items-center py-[48px] px-gutter mt-auto z-20">
        <div className="text-label-sm font-headline-md font-bold text-primary mb-4 md:mb-0">ChemLab 3D</div>
        <div className="flex gap-6 mb-4 md:mb-0">
          <Link className="text-on-surface-variant hover:text-primary hover:underline transition-all text-label-sm font-label-sm" href={appRoutes.settingsCustomization}>Privacy Policy</Link>
          <Link className="text-on-surface-variant hover:text-primary hover:underline transition-all text-label-sm font-label-sm" href={appRoutes.settingsCustomization}>Terms of Service</Link>
          <Link className="text-on-surface-variant hover:text-primary hover:underline transition-all text-label-sm font-label-sm" href={appRoutes.settingsCustomization}>Safety Guidelines</Link>
          <Link className="text-on-surface-variant hover:text-primary hover:underline transition-all text-label-sm font-label-sm" href={appRoutes.scienceNewsBlog}>Research Paper</Link>
        </div>
        <div className="text-on-surface-variant text-label-sm font-label-sm">© 2024 ChemLab 3D. All rights reserved. Molecular Learning Systems.</div>
      </footer>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #e4e3db; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c2c6d6; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #727785; }
      `}</style>
    </div>
  );
}
