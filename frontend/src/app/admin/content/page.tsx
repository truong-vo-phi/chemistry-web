import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Content Management',
};

export default function ContentManagementPage() {
  return (
    <div className="font-body-md text-body-md antialiased pb-24 md:pb-0 bg-background text-on-background">
      <aside className="fixed left-0 top-0 h-screen w-64 md:w-72 bg-surface/70 backdrop-blur-xl border-r border-outline-variant z-50 flex-col p-6 hidden md:flex">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary">science</span>
          </div>
          <span className="text-xl font-bold text-primary">ChemLab 3D</span>
        </div>

        <nav className="flex-grow space-y-2">
          <Link href={appRoutes.teacherDashboard} className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="text-sm font-semibold">Dashboard</span>
          </Link>
          <Link href={appRoutes.userManagement} className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">people</span>
            <span className="text-sm font-semibold">User Management</span>
          </Link>
          <Link href={appRoutes.contentManagement} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-primary-container text-on-primary-container font-semibold">
            <span className="material-symbols-outlined">folder_open</span>
            <span className="text-sm">Content Manager</span>
          </Link>
          <Link href={appRoutes.settingsCustomization} className="flex items-center gap-3 px-4 py-3 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors">
            <span className="material-symbols-outlined">settings</span>
            <span className="text-sm font-semibold">Settings</span>
          </Link>
        </nav>

        <div className="mt-auto pt-6 border-t border-outline-variant flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
            <span className="material-symbols-outlined">person</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-on-surface">Dr. Aris</span>
            <span className="text-xs text-on-surface-variant">Lab Admin</span>
          </div>
        </div>
      </aside>

      <main className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto md:pl-72 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-gutter gap-4">
          <div>
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary mb-2">Content Manager</h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">Upload and manage 3D lab simulations, video lectures, and curriculum.</p>
          </div>
          <button className="bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-full border-2 border-primary-fixed shadow-[0_4px_0_theme('colors.primary-fixed')] hover:shadow-[0_6px_0_theme('colors.primary-fixed')] hover:-translate-y-0.5 active:shadow-none active:translate-y-1 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">add_circle</span>
            New Content
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-12">
          <div className="bg-surface-container-lowest p-6 rounded-DEFAULT border-2 border-secondary-container shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary border-2 border-secondary-container"><span className="material-symbols-outlined text-3xl">science</span></div>
            <div><p className="font-label-sm text-label-sm text-on-surface-variant">Total 3D Labs</p><p className="font-headline-md text-headline-md text-on-surface">42</p></div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-DEFAULT border-2 border-tertiary-fixed shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-tertiary-fixed/30 flex items-center justify-center text-tertiary border-2 border-tertiary-fixed"><span className="material-symbols-outlined text-3xl">video_library</span></div>
            <div><p className="font-label-sm text-label-sm text-on-surface-variant">Video Lectures</p><p className="font-headline-md text-headline-md text-on-surface">128</p></div>
          </div>
          <div className="bg-surface-container-lowest p-6 rounded-DEFAULT border-2 border-primary-fixed shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary-fixed/30 flex items-center justify-center text-primary border-2 border-primary-fixed"><span className="material-symbols-outlined text-3xl">description</span></div>
            <div><p className="font-label-sm text-label-sm text-on-surface-variant">Documents</p><p className="font-headline-md text-headline-md text-on-surface">315</p></div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 bg-surface-container-low p-4 rounded-DEFAULT border-2 border-outline-variant">
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <button className="px-4 py-2 bg-primary text-on-primary rounded-full font-label-sm text-label-sm border-2 border-primary-fixed shadow-[0_2px_0_theme('colors.primary-fixed')] whitespace-nowrap">All Content</button>
            <button className="px-4 py-2 bg-surface-container-lowest text-on-surface rounded-full font-label-sm text-label-sm border-2 border-outline-variant hover:bg-surface-container hover:shadow-[0_2px_0_theme('colors.outline-variant')] whitespace-nowrap transition-all">3D Simulations</button>
            <button className="px-4 py-2 bg-surface-container-lowest text-on-surface rounded-full font-label-sm text-label-sm border-2 border-outline-variant hover:bg-surface-container hover:shadow-[0_2px_0_theme('colors.outline-variant')] whitespace-nowrap transition-all">Videos</button>
            <button className="px-4 py-2 bg-surface-container-lowest text-on-surface rounded-full font-label-sm text-label-sm border-2 border-outline-variant hover:bg-surface-container hover:shadow-[0_2px_0_theme('colors.outline-variant')] whitespace-nowrap transition-all">Curriculum</button>
          </div>
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-outline">search</span>
            <input className="w-full pl-10 pr-4 py-2 rounded-full border-2 border-outline-variant bg-surface-container-lowest focus:border-primary focus:ring-0 focus:shadow-[0_0_0_3px_theme('colors.primary-fixed-dim')] transition-all font-body-md text-body-md text-on-surface" placeholder="Search content..." type="text" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          <div className="bg-surface-container-lowest rounded-[16px] border-2 border-secondary-container shadow-[0_2px_10px_rgba(0,0,0,0.05)] overflow-hidden group">
            <div className="h-48 relative overflow-hidden bg-surface-container">
              <img alt="Molecular structure" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV0jLczV-8_63dwsLe_EHHZj6pVstRZpLRZCucgiWF28DMEw-Pnd-WcUQOOKsljDBLpSLLCfGJUcmKHSIJlM-2id7mL1JbWukOW1e4QqVN2QYgkjCn03vFES4XOwbbjftfQs75i19ttAtuxU8_rlAeMdtrBm03xttC_qtLkaUV_wVnMwAFE3JUpUKWpqqDITU9wI5eDrtOTb9Ed87kYenoAuF8yeSs_eE3qRKcfttbiHaVOq8zAFBdGxuV6mWSMFzPUpxiaeZ7e9M" />
              <div className="absolute top-3 left-3 bg-secondary text-on-secondary px-3 py-1 rounded-full font-label-sm text-label-sm border-2 border-secondary-container flex items-center gap-1 shadow-sm"><span className="material-symbols-outlined text-sm">science</span> 3D Lab</div>
            </div>
            <div className="p-4">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-1">Molecular Geometry Explorer</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">Interactive 3D simulation allowing students to build and rotate simple molecules to understand VSEPR theory.</p>
              <div className="flex flex-wrap gap-2 mb-4"><span className="px-2 py-1 bg-surface-container text-on-surface-variant text-xs rounded-md border border-outline-variant font-label-sm">High School</span><span className="px-2 py-1 bg-surface-container text-on-surface-variant text-xs rounded-md border border-outline-variant font-label-sm">Chemistry 101</span></div>
              <div className="flex justify-between items-center border-t border-surface-variant pt-3 mt-auto"><div className="text-xs text-outline font-body-md">Updated: Oct 24, 2023</div><div className="flex gap-2"><button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-container/10 rounded-full transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button><button className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button></div></div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-[16px] border-2 border-primary-fixed shadow-[0_2px_10px_rgba(0,0,0,0.05)] overflow-hidden group">
            <div className="h-48 relative overflow-hidden bg-surface-container flex items-center justify-center">
              <span className="material-symbols-outlined text-7xl text-primary opacity-50">description</span>
              <div className="absolute top-3 left-3 bg-primary text-on-primary px-3 py-1 rounded-full font-label-sm text-label-sm border-2 border-primary-fixed-dim flex items-center gap-1 shadow-sm"><span className="material-symbols-outlined text-sm">description</span> Curriculum</div>
            </div>
            <div className="p-4">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-1">Acids &amp; Bases Lesson Plan</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">Comprehensive lesson plan covering pH scales, common household acids, and neutralization reactions.</p>
              <div className="flex flex-wrap gap-2 mb-4"><span className="px-2 py-1 bg-surface-container text-on-surface-variant text-xs rounded-md border border-outline-variant font-label-sm">Middle School</span><span className="px-2 py-1 bg-surface-container text-on-surface-variant text-xs rounded-md border border-outline-variant font-label-sm">Physical Science</span></div>
              <div className="flex justify-between items-center border-t border-surface-variant pt-3 mt-auto"><div className="text-xs text-outline font-body-md">Updated: Nov 02, 2023</div><div className="flex gap-2"><button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-container/10 rounded-full transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button><button className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button></div></div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-[16px] border-2 border-tertiary-fixed shadow-[0_2px_10px_rgba(0,0,0,0.05)] overflow-hidden group">
            <div className="h-48 relative overflow-hidden bg-surface-container">
              <img alt="Titration setup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtXjiUnXllSCBaMnXqTw3Belj3nlFnKTQjgYBch3p4T_jak4w-tZAxfTz0gIGAxaLiEp7120At0-CUFKI3csxId2hqfognZg_9fYyN4kIKjZ6qVTX_JCRG8vYQCya7aboR-oiL5i8Ho_ekJ3p7k9VUmcXIenWVQvzx4x5EpJ2Rv6W67pP1xF1hgzo4vI7RlaX3PpDqt0coPgdXa44QS4eGrenuW9cmIe51GKeh08oLhN-h8XrleDVk1a9oCt3v_WfAwmxcP4AlRTI" />
              <div className="absolute top-3 left-3 bg-tertiary text-on-tertiary px-3 py-1 rounded-full font-label-sm text-label-sm border-2 border-tertiary-fixed flex items-center gap-1 shadow-sm"><span className="material-symbols-outlined text-sm">video_library</span> Video Lecture</div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-on-background/20"><span className="material-symbols-outlined text-5xl text-surface-container-lowest drop-shadow-md">play_circle</span></div>
            </div>
            <div className="p-4">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-1">Introduction to Titration</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4 line-clamp-2">A 15-minute video lecture demonstrating the proper technique for performing an acid-base titration.</p>
              <div className="flex flex-wrap gap-2 mb-4"><span className="px-2 py-1 bg-surface-container text-on-surface-variant text-xs rounded-md border border-outline-variant font-label-sm">High School</span><span className="px-2 py-1 bg-surface-container text-on-surface-variant text-xs rounded-md border border-outline-variant font-label-sm">AP Chem</span></div>
              <div className="flex justify-between items-center border-t border-surface-variant pt-3 mt-auto"><div className="text-xs text-outline font-body-md">Updated: Sep 15, 2023</div><div className="flex gap-2"><button className="p-1.5 text-on-surface-variant hover:text-primary hover:bg-primary-container/10 rounded-full transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button><button className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error-container/20 rounded-full transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button></div></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
