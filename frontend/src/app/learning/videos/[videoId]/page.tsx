import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Video Lecture',
};

export default function VideoLectureDetailPage() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen pb-24 md:pb-0">
      <nav className="hidden md:flex flex-col bg-surface/80 backdrop-blur-md shadow-sm rounded-full my-4 mx-auto max-w-[95%] border-2 border-primary/20 sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-desktop py-2 max-w-container-max mx-auto">
          <div className="font-headline-md text-headline-md font-bold text-primary">ChemLab 3D</div>
          <ul className="flex space-x-6 items-center">
            <li><Link className="font-label-sm text-on-surface-variant hover:text-primary px-3 py-1 rounded-full" href={appRoutes.studentDashboard}>Dashboard</Link></li>
            <li><Link className="font-label-sm text-on-surface-variant hover:text-primary px-3 py-1 rounded-full" href={appRoutes.experimentLibrary}>Experiments</Link></li>
            <li><Link className="font-label-sm text-primary font-bold border-b-2 border-primary pb-1 px-3 py-1" href={appRoutes.learningPathway}>Curriculum</Link></li>
            <li><Link className="font-label-sm text-on-surface-variant hover:text-primary px-3 py-1 rounded-full" href={appRoutes.learningCommunity}>Resources</Link></li>
            <li><Link className="font-label-sm text-on-surface-variant hover:text-primary px-3 py-1 rounded-full" href={appRoutes.settingsCustomization}>Support</Link></li>
          </ul>
          <div className="flex items-center gap-4">
            <Link href={appRoutes.launch3dLab} className="bg-primary text-on-primary font-label-sm rounded-full px-6 py-2 border-2 border-surface-tint shadow-[0_4px_12px_rgba(0,0,0,0.1)]">Launch Lab</Link>
            <img alt="Student" className="w-10 h-10 rounded-full border-2 border-primary-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuArZo-PD7kC4VtxLj8Wn_97K4fl4wMCqGHgYy8mNteRCGvyq8fyfhGWpXafKJmBfpyBDR8HXkRIqd4SWu1EhkU64hjeU0sBv84Yt7S5nU1mX__BvAaNaotWk4vlVqB5PjGIXOoRqZc11dHkMwAH70csFvDZhQqK0A7fIFl8AP-_Te7Ry0aRQKOtyZ_9LK5Asrzjf7Uy9TkM67Ouof4kL1vj0c83TG1X6duwQQRgwKwa7n4EpT9D75NL1mq7S_S0v4VgBnU5MDP3aEM"/>
          </div>
        </div>
      </nav>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-6 md:pt-8 grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-8 space-y-6">
          <div className="mb-4">
            <div className="flex items-center gap-2 text-on-surface-variant font-label-sm mb-2">
              <Link className="hover:text-primary" href={appRoutes.learningPathway}>Curriculum</Link>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <Link className="hover:text-primary" href={appRoutes.learningPathway}>Module 3: Reactions</Link>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              <span className="text-on-surface">Covalent Bonds</span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-2">Understanding Covalent Bonds</h1>
            <p className="font-body-md text-on-surface-variant">Professor Al Chemist • 45 min • Interactive Lecture</p>
          </div>

          <div className="relative bg-surface-container rounded-xl border-2 border-outline-variant shadow-md overflow-hidden group">
            <div className="aspect-video w-full bg-surface-dim relative">
              <img alt="Video thumbnail" className="w-full h-full object-cover opacity-90" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeeEVx2nUT9vMdLaOtLeFptz7yVOff9e3wmOzTlNZmgXSuxl9sjTgjFemrZpNAoJLB1c5m7iHhW_cR1jum4JbJ6-eQu74Szk8soPaMxnZ-siLgOFTNCW_vLBSSyNnB0ytYOlo1XeRRVPbhwplPB9ZPA1M4kWd_uW0RjG5l__k3Iy5JfqKzOZHOVUVn5fh0pKfdZScdIDJBlDmLkf36cMU2V1qmgWCY70FP4uv5-eSJsbv7uirYqzG3S40XFdO4G8D5Jh01LS6J8qM"/>
              <div className="absolute inset-0 flex items-center justify-center bg-inverse-surface/20">
                <button className="w-20 h-20 bg-surface/90 rounded-full flex items-center justify-center border-4 border-primary text-primary shadow-lg">
                  <span className="material-symbols-outlined text-[48px] ml-2" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                </button>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <span className="bg-surface text-on-surface font-label-sm px-3 py-1 rounded-full border-2 border-outline-variant shadow-sm flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">360</span> 3D View</span>
              </div>
            </div>
            <div className="p-4 bg-surface flex flex-col gap-3 border-t-2 border-outline-variant">
              <div className="flex items-center gap-3">
                <span className="font-label-sm text-on-surface-variant w-10 text-right">12:34</span>
                <div className="flex-grow h-3 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/30"><div className="h-full bg-gradient-to-r from-secondary-container to-primary w-1/3 rounded-full relative"><div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-surface border-2 border-primary rounded-full shadow-sm"></div></div></div>
                <span className="font-label-sm text-on-surface-variant w-10">45:00</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-2"><button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span></button><button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"><span className="material-symbols-outlined">volume_up</span></button></div>
                <div className="flex gap-2"><button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"><span className="material-symbols-outlined">subtitles</span></button><button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"><span className="material-symbols-outlined">settings</span></button><button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"><span className="material-symbols-outlined">fullscreen</span></button></div>
              </div>
            </div>
          </div>

          <section className="bg-surface rounded-xl border-2 border-outline-variant shadow-sm p-6">
            <h2 className="font-headline-md text-headline-md text-primary mb-4 flex items-center gap-2"><span className="material-symbols-outlined">forum</span> Class Discussion</h2>
            <div className="flex gap-4 mb-6">
              <img alt="Your avatar" className="w-12 h-12 rounded-full border-2 border-primary-container object-cover shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB2YC0YxzppXvo1VmtLZt-cEoJRdzHCCT_HytByieGpMhxZQlVVdlimhlc6575ok1ROuE9cs9FYG4b7yXUb9am40-sGSl3J6qMmtFvRxawpa0TBFDqg5L_85aQMnBgnavSICPWCCQx4BJGLu17FcK9QrcxmXpaGTCnvg6ZaDli12PCoYaPDd1OjgyrYzRC7SEdTS6PJuxpoxJFGeaUgOI-EMhJaK3ZgWTyROUOyA29Xm5zFCL1gYwIzecofy4tNjrpTeepE7BUrZ0"/>
              <div className="flex-grow">
                <textarea className="w-full bg-surface-container border-2 border-outline-variant rounded-xl p-4" placeholder="Ask a question or share a thought..." rows={3}></textarea>
                <div className="flex justify-end mt-2"><button className="bg-primary text-on-primary font-label-sm rounded-full px-6 py-2 border-2 border-surface-tint shadow-[0_4px_12px_rgba(0,0,0,0.1)]">Post</button></div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex gap-4">
                <img alt="Student" className="w-10 h-10 rounded-full border-2 border-secondary-container object-cover shrink-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR9yFKZTUakb5YXc5Uc71dFQ_nxPdZjfPQE_zxSmDBNaLiwQJdmAP7PXrgAwpG-yFEezV1vJf1Q3WFjvQean-l90_hb3L62mCoOrYxp2UX7ZUAjt6na76RQipw1tE1_jjcJy4wBCIadPmTShedgouDWGwvK2BII8HlbHAiLemIpdySk92B5HhviPUKxLQO1CHej6v7o7Ih_7PQVaerXZb37jAfww-71AgDh0MENM8cdcuV5qHIH5037IEKy9wPfX8bA445Y300ULo"/>
                <div>
                  <div className="flex items-baseline gap-2 mb-1"><span className="font-label-sm font-bold text-on-surface">Jamie L.</span><span className="text-[12px] text-on-surface-variant">2 hours ago</span></div>
                  <p className="font-body-md text-on-surface mb-2">At 12:34, when the electrons are shared, does the orbit shape change immediately or gradually?</p>
                  <div className="flex gap-4 items-center">
                    <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary text-sm font-label-sm"><span className="material-symbols-outlined text-[16px]">thumb_up</span> 12</button>
                    <button className="flex items-center gap-1 text-on-surface-variant hover:text-primary text-sm font-label-sm"><span className="material-symbols-outlined text-[16px]">reply</span> Reply</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-surface rounded-xl border-2 border-primary/30 shadow-sm p-6 relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-24 h-24 bg-primary-container/10 rounded-full blur-xl"></div>
            <h3 className="font-headline-md text-[20px] text-primary mb-4 flex items-center gap-2 relative z-10"><span className="material-symbols-outlined">inventory_2</span> Lab Materials</h3>
            <div className="space-y-3 relative z-10">
              <Link className="flex items-center gap-3 p-3 bg-surface-container rounded-lg border-2 border-transparent hover:border-primary/50 transition-colors group" href={appRoutes.learningPathway}>
                <div className="bg-error-container text-on-error-container p-2 rounded-lg shrink-0"><span className="material-symbols-outlined">picture_as_pdf</span></div>
                <div className="flex-grow"><p className="font-label-sm text-on-surface">Lecture Slides</p><p className="text-[12px] text-on-surface-variant">2.4 MB • PDF</p></div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">download</span>
              </Link>
              <Link className="flex items-center gap-3 p-3 bg-surface-container rounded-lg border-2 border-transparent hover:border-primary/50 transition-colors group" href={appRoutes.learningPathway}>
                <div className="bg-secondary-container text-on-secondary-container p-2 rounded-lg shrink-0"><span className="material-symbols-outlined">science</span></div>
                <div className="flex-grow"><p className="font-label-sm text-on-surface">Bonding Simulation Data</p><p className="text-[12px] text-on-surface-variant">150 KB • CSV</p></div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">download</span>
              </Link>
            </div>
          </div>

          <div className="bg-surface-bright rounded-xl border-2 border-secondary/20 shadow-sm p-6 relative">
            <div className="absolute top-0 right-0 w-8 h-8 bg-secondary-container rounded-bl-xl border-l-2 border-b-2 border-secondary/20 flex items-center justify-center"><span className="material-symbols-outlined text-on-secondary-container text-[16px]">push_pin</span></div>
            <h3 className="font-headline-md text-[20px] text-secondary mb-3">Key Takeaways</h3>
            <ul className="space-y-2 font-body-md text-on-surface">
              <li className="flex items-start gap-2"><span className="material-symbols-outlined text-secondary shrink-0 text-[20px] mt-0.5">check_circle</span><span>Covalent bonds involve the sharing of electron pairs.</span></li>
              <li className="flex items-start gap-2"><span className="material-symbols-outlined text-secondary shrink-0 text-[20px] mt-0.5">check_circle</span><span>Typically occur between nonmetal atoms.</span></li>
            </ul>
            <button className="mt-4 w-full py-2 bg-surface text-secondary font-label-sm border-2 border-secondary rounded-full hover:bg-secondary-container transition-colors shadow-sm">View Full Notes</button>
          </div>

          <div className="bg-surface rounded-xl border-2 border-outline-variant shadow-sm p-6">
            <h3 className="font-headline-md text-[20px] text-on-surface mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">experiment</span> Up Next</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link className="relative bg-surface-container-low rounded-xl border-2 border-outline-variant overflow-hidden group hover:border-primary transition-colors" href="/learning/lessons/build-a-molecule">
                <img alt="Lab preview" className="h-24 w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLINMpHrRc0bpWa6fae2J8enSxykwmWdKzbpMThaStVY_y82PMaCBISOaEcsrSR6YeVRJDuvbx1j81lERD4WfTWfe4cLG3RVQVGpULfKDz1wgMVwNdZ26YeBDbkTirAIJK45iW3dZVBnGQ9VEdc0MqX-3YaQ_GssNW0agKSNbsXu1t8Un4b5keC9cAA_7YWk7wqd2GRSaHyo5rqsSPPo3ytwPbIFpX48KyhxdZvO7jkOJvQkiiXmHOZt8ZSIVcv7t2MnMmf37Cpv8"/>
                <div className="p-3"><span className="inline-block bg-primary-container text-on-primary-container font-label-sm text-[10px] px-2 py-0.5 rounded-full mb-1 uppercase tracking-wider">Interactive Lab</span><p className="font-label-sm text-on-surface line-clamp-1">Build a Molecule</p></div>
              </Link>
            </div>
          </div>
        </aside>
      </main>

      <nav className="md:hidden flex flex-col justify-around items-center w-full h-16 px-margin-mobile bg-surface border-t-2 border-surface-variant fixed bottom-0 left-0 z-50 rounded-t-lg">
        <div className="flex justify-around items-center w-full">
          <Link className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high rounded-full" href={appRoutes.studentDashboard}><span className="material-symbols-outlined">dashboard</span><span className="font-label-sm text-[10px] mt-1">Home</span></Link>
          <Link className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high rounded-full" href={appRoutes.experimentLibrary}><span className="material-symbols-outlined">science</span><span className="font-label-sm text-[10px] mt-1">Labs</span></Link>
          <Link className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 scale-90 shadow-sm" href={appRoutes.learningPathway}><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span><span className="font-label-sm text-[10px] mt-1 font-bold">Study</span></Link>
          <Link className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high rounded-full" href={appRoutes.learningPathway}><span className="material-symbols-outlined">folder_open</span><span className="font-label-sm text-[10px] mt-1">Files</span></Link>
          <Link className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-high rounded-full" href={appRoutes.learningCommunity}><span className="material-symbols-outlined">support_agent</span><span className="font-label-sm text-[10px] mt-1">Help</span></Link>
        </div>
      </nav>
    </div>
  );
}
