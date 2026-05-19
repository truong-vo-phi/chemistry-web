import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../../config/site-routes';

export const metadata: Metadata = {
  title: 'Teacher Dashboard - ChemLab 3D',
};

export default function ClassManagementDetailedPage() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col">
      <header className="bg-surface-bright border-b-2 border-surface-variant shadow-sm sticky top-0 z-50">
        <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop py-4">
          <div className="flex items-center gap-4">
            <h1 className="font-headline-md text-headline-md text-primary font-bold">ChemLab 3D</h1>
            <div className="hidden md:flex gap-6 ml-8">
              <Link className="text-primary font-bold border-b-2 border-primary pb-1 font-body-md" href={appRoutes.classManagementDetailed}>Classes</Link>
              <Link className="text-on-surface-variant font-medium hover:text-secondary transition-colors duration-200 font-body-md" href={appRoutes.learningPathway}>Curriculum</Link>
              <Link className="text-on-surface-variant font-medium hover:text-secondary transition-colors duration-200 font-body-md" href={appRoutes.experimentLibrary}>Inventory</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex bg-surface-container-high rounded-full px-4 py-2 border-2 border-surface-variant">
              <span className="material-symbols-outlined text-on-surface-variant mr-2">search</span>
              <input className="bg-transparent border-none focus:ring-0 text-sm w-48" placeholder="Search spells or students..." type="text" />
            </div>
            <button className="text-on-surface-variant hover:text-primary transition-colors"><span className="material-symbols-outlined">notifications</span></button>
            <div className="h-10 w-10 rounded-full border-2 border-primary overflow-hidden">
              <img alt="User profile avatar" className="h-full w-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAdT-ryvwWbsuSSpXgGuTwHyMe-X2541cy19Ar2LBIyUYz1uzM2NwCz-I0xLBH_sIGaPSGnKzCrCOxamkKRJklekbmPBCRDhZTqcAze-Uhu8jtMbongWRugJnATf_DsBqrmWfpt7FeFVci6BpWc8h6qzO_KGUErUe9ag-oHOKILscAEoe91ur2XiN-u85QEotcpf5Ep5k2Afzy11wuWRyV1clVghMrT14d0xjvkoP19w-MS1aDeFNaiMiCsd_5FFV4xloES7I5N47w" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="hidden md:flex flex-col h-[calc(100vh-80px)] w-64 bg-surface-container border-r-2 border-surface-variant p-4 gap-4 overflow-y-auto">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-10 h-10 bg-primary-container rounded-lg flex items-center justify-center border-2 border-primary">
              <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            </div>
            <div>
              <p className="font-bold text-on-surface leading-tight">Magical Academy</p>
              <p className="text-xs text-on-surface-variant">Chemistry Master</p>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            <Link className="flex items-center gap-3 bg-primary-container text-on-primary-container rounded-lg px-4 py-3 border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,88,190,1)] transition-all" href={appRoutes.experimentLibrary}>
              <span className="material-symbols-outlined">experiment</span><span className="font-body-lg">Alchemy Lab</span>
            </Link>
            <Link className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-surface-variant rounded-lg transition-all hover:translate-x-1" href={appRoutes.learningPathway}><span className="material-symbols-outlined">auto_stories</span><span className="font-body-lg">Knowledge Base</span></Link>
            <Link className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-surface-variant rounded-lg transition-all hover:translate-x-1" href={appRoutes.quizReview}><span className="material-symbols-outlined">military_tech</span><span className="font-body-lg">Quests</span></Link>
            <Link className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-surface-variant rounded-lg transition-all hover:translate-x-1" href={appRoutes.experimentResults}><span className="material-symbols-outlined">precision_manufacturing</span><span className="font-body-lg">Equipment</span></Link>
            <Link className="flex items-center gap-3 text-on-surface-variant px-4 py-3 hover:bg-surface-variant rounded-lg transition-all hover:translate-x-1" href={appRoutes.teacherDashboard}><span className="material-symbols-outlined">emoji_events</span><span className="font-body-lg">Leaderboard</span></Link>
          </nav>
          <div className="mt-auto p-4 bg-tertiary-container rounded-xl border-2 border-tertiary text-on-tertiary-container">
            <p className="text-xs font-bold mb-2">QUICK ACTION</p>
            <button className="w-full bg-surface-bright py-2 rounded-lg text-tertiary font-bold shadow-[2px_2px_0px_0px_rgba(130,81,0,1)] hover:translate-y-0.5 active:shadow-none transition-all">Start New Experiment</button>
          </div>
        </aside>

        <main className="flex-1 p-margin-mobile md:p-margin-desktop overflow-y-auto">
          <div className="max-w-container-max mx-auto space-y-8">
            <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface">Class Management</h2>
                <p className="text-on-surface-variant font-body-lg">Oversee your apprentices and their alchemical progress.</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-surface-bright border-2 border-secondary text-secondary font-bold px-6 py-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,108,73,1)] flex items-center gap-2"><span className="material-symbols-outlined">group_add</span>Add Student</button>
                <button className="bg-secondary text-on-secondary font-bold px-6 py-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,33,19,1)] flex items-center gap-2"><span className="material-symbols-outlined">add_circle</span>Create Class</button>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
              <div className="lg:col-span-8 space-y-gutter">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                  <div className="bg-surface-container-lowest p-6 rounded-lg border-2 border-surface-variant shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-12 w-12 bg-primary-container rounded-xl flex items-center justify-center border-2 border-primary"><span className="material-symbols-outlined text-on-primary-container text-3xl">biotech</span></div>
                      <span className="bg-primary-container/10 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/20">Class 10A</span>
                    </div>
                    <h3 className="font-headline-md text-on-surface mb-1">Intro to Molecules</h3>
                    <p className="text-sm text-on-surface-variant mb-4">24 Active Students • 86% Avg. Progress</p>
                    <div className="w-full bg-surface-variant h-3 rounded-full overflow-hidden mb-6"><div className="bg-gradient-to-r from-secondary-fixed-dim to-primary h-full w-[86%] rounded-full"></div></div>
                    <button className="w-full border-2 border-primary text-primary py-2 rounded-lg font-bold hover:bg-primary-container hover:text-white transition-all">View Roster</button>
                  </div>
                  <div className="bg-surface-container-lowest p-6 rounded-lg border-2 border-surface-variant shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div className="h-12 w-12 bg-secondary-container rounded-xl flex items-center justify-center border-2 border-secondary"><span className="material-symbols-outlined text-on-secondary-container text-3xl">science</span></div>
                      <span className="bg-secondary-container/10 text-secondary px-3 py-1 rounded-full text-xs font-bold border border-secondary/20">Class 11B</span>
                    </div>
                    <h3 className="font-headline-md text-on-surface mb-1">Organic Mastery</h3>
                    <p className="text-sm text-on-surface-variant mb-4">18 Active Students • 62% Avg. Progress</p>
                    <div className="w-full bg-surface-variant h-3 rounded-full overflow-hidden mb-6"><div className="bg-gradient-to-r from-secondary-fixed-dim to-primary h-full w-[62%] rounded-full"></div></div>
                    <button className="w-full border-2 border-primary text-primary py-2 rounded-lg font-bold hover:bg-primary-container hover:text-white transition-all">View Roster</button>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-lg border-2 border-surface-variant shadow-sm overflow-hidden">
                  <div className="p-6 border-b-2 border-surface-variant bg-surface-container-low flex justify-between items-center">
                    <h3 className="font-headline-md text-on-surface">Student Roster: Class 10A</h3>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-surface-variant rounded-lg transition-colors"><span className="material-symbols-outlined">filter_list</span></button>
                      <button className="p-2 hover:bg-surface-variant rounded-lg transition-colors"><span className="material-symbols-outlined">sort</span></button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-surface-bright">
                        <tr>
                          <th className="px-6 py-4 font-label-sm text-on-surface-variant border-b border-surface-variant">Apprentice</th>
                          <th className="px-6 py-4 font-label-sm text-on-surface-variant border-b border-surface-variant">Element Mastery</th>
                          <th className="px-6 py-4 font-label-sm text-on-surface-variant border-b border-surface-variant">Last Quest</th>
                          <th className="px-6 py-4 font-label-sm text-on-surface-variant border-b border-surface-variant text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-variant">
                        {[
                          ['Felix Shadowgrove', 'Lvl 14 Alchemist', '92%', 'Bonding Basics', '2 mins ago', 'https://lh3.googleusercontent.com/aida-public/AB6AXuA5PyuoP_0-Rwkxpzq3FkWUYKQinapVjG_wL2iYGq_LEUOvj1QAOX9y_g7UTVUIp07cWpF6WklDr_eymU_lFj58PpD1OlyhcUTEXk5QWKGacQNjyejDv8BVbDKTDo7ni5lmF_zMe7R4xF2l2GGYaYDPAV-eUtktoS4rq0P5hxap3DvN1-0UsYFZ0_6MRF85ajC0keNMjI1H0fZDFRCwGBV7D1vm0Ws5XggmmH0l1l-dCTOSXpvzCl1YauzojOSNq7DxlaG-nLBblf8'],
                          ['Luna Silverleaf', 'Lvl 12 Potioneer', '78%', 'Acidic Reactions', '1 hour ago', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCRFtv6OkIf5FcK3Um_QZxk3GXAdms7K2o0QPBn0x911-OxscxomIXIATsjy9Vfc4STndDaw7-Fn9ksYQQjo1P_IQ7lRNurZ6g59eT4PK6WQDQDa4djMeWobATXBGdvHsHKe5f2315lMdTGHchA-gCX4vnCNNv7kmUCFeaM9hIFD01vHpMHXk7-GRA4sG8sRNmicuq2EcPudljJqi_lYj47CjUEDZ8m68wMnC9MHxMSUYgCJYXsD4anYc_-mwCB8_K0TFdbUlRsW2k'],
                          ['Leo Ironheart', 'Lvl 11 Transmuter', '45%', 'Noble Gases Quest', '5 hours ago', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVMUKYQ9wp-F0ry25jpbLGEqyIo1f6quXKv1Sv50MjYhSnnbf2ivYwh6j8l0_s3RrnRin1Oz1ZWYT0eexFjolSh62qWgG51neuELfJIhepbT41o41KApx8k-TD6QrRM3fNdcrD49N15kgHg8xXmB_syKhzvqKa_IpQKozvdPTbW4CQqDHBIWj2ttLbGjfvigoMeRukM27hoYGRs5l19spJr0h5GtFiV0p57hkgfOruzFupHSvcniecLZRxPsJE5uAxq_5NptPCmh4'],
                        ].map(([name, lvl, mastery, quest, time, img]) => (
                          <tr key={name} className="hover:bg-surface-container-low transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <img alt={`${name} avatar`} className="h-10 w-10 rounded-full border-2 border-primary/20" src={img} />
                                <div><p className="font-bold text-on-surface">{name}</p><p className="text-xs text-on-surface-variant">{lvl}</p></div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex-1 bg-surface-variant h-2 rounded-full min-w-[80px]"><div className={`${mastery === '45%' ? 'bg-primary' : 'bg-secondary-fixed-dim'} h-full rounded-full`} style={{ width: mastery }}></div></div>
                                <span className={`${mastery === '45%' ? 'text-primary' : 'text-secondary'} text-xs font-bold`}>{mastery}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4"><p className="text-sm font-medium">{quest}</p><p className="text-xs text-on-surface-variant">{time}</p></td>
                            <td className="px-6 py-4 text-right"><button className="text-primary hover:bg-primary-container/10 p-2 rounded-lg transition-colors"><span className="material-symbols-outlined">monitoring</span></button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 space-y-gutter">
                <div className="bg-surface-container-lowest p-6 rounded-lg border-2 border-surface-variant shadow-sm sticky top-[104px]">
                  <div className="flex items-center gap-2 mb-6"><span className="material-symbols-outlined text-tertiary">history</span><h3 className="font-headline-md text-on-surface">Recent Lab Activity</h3></div>
                  <div className="space-y-6">
                    {[
                      ['Felix Shadowgrove', 'Completed "Covalent Spells" with 100% accuracy!', 'NEW ACHIEVEMENT', 'text-secondary', 'star', 'bg-secondary-container border-secondary', 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNhhiu9Ik-TIAg9aDYoUPsuRHLkwL7gq6zjVT8mGLzGSflsJoJHWW570tVo8yWAW00p7-__WVLT7HqJhnWbT6ALdMneean0wJLQj8hmBfXbZZ5dzfspZ_TCWcGLDuw77u54CiDFVEzbVQq7yQ8BO4dNe2TqxxPNAfbB8DpLxOAOUw2TpB8UCtuodzT16yaM0BAwQd535A8cGG3mNXXM1tegpISmAoe1gZlCivaRve3Viu_SGmdRCHzP4LRRc49ghs4f7Dehdqt83c'],
                      ['Leo Ironheart', 'Started a new experiment: Periodic Potions.', 'ACTIVITY', 'text-on-surface-variant', 'science', 'bg-primary-container border-primary', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9gkvi2Kbbb09piEDwbb_ZzfsjgZYTx_upIYXj1CIgQnsbqbid6yq-6Oq3GGl1ywIy0-i7ErMODzcEjmil9L8Xt4GsPLM1JNfLDERPk55-wiTOyahXeUADpJqB2Ko0iyXz3DbwSWtDyNLSMNTY_Rr8ViUPzuNhKIBd3LY9UBFUhMm4JiIEucKIWMYSYjcoz_WMKKBcYn3p61ywont1Nj4sJ-Xg-fRFIBdd4YDZgOL40XJ7Z44C06k2DN0ArRDaaV0WFxstP6db_Gw'],
                      ['Luna Silverleaf', 'Encountered an explosion in the Liquid Labs simulation.', 'LAB INCIDENT', 'text-error', 'warning', 'bg-error-container border-error', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkALRVoY3s9n-DfAPQdRnVdF6JlDTiLtF1sJ4vw3tAJ7DitwwJBX2bBQNuXAkUircU3uqG1hlt670VaHr2kFAJ8LML6OaJ3G494_nSTaj1tDhJnjiX9M66XwK37Yf6pJ6zqP38rEQ777oVUtEIFfxSod1akAcUgz8HhhrLfCkClgNXZEt1SRhch0sKhtb2NRcvj3xZChId-Oib3FfcW28vogl_6tF_KpS5lII8IG12aEpRcPSa2Af3DU6lFMs1DbpTHrTQ5SiqBVo'],
                    ].map(([name, text, tag, tagClass, icon, iconClass, img]) => (
                      <div key={name} className="flex gap-4">
                        <div className="relative">
                          <div className={`h-10 w-10 rounded-full ${iconClass} flex items-center justify-center`}><span className="material-symbols-outlined text-sm">{icon}</span></div>
                          <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-white rounded-full border border-surface-variant overflow-hidden"><img alt="Small avatar" className="h-full w-full" src={img} /></div>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">{name}</p>
                          <p className="text-xs text-on-surface-variant">{text}</p>
                          <p className={`text-[10px] uppercase font-bold ${tagClass} mt-1`}>{tag}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t-2 border-surface-variant">
                    <h4 className="font-label-sm text-on-surface mb-4">Laboratory Stats</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-surface-container-high rounded-lg text-center"><p className="text-2xl font-bold text-primary">42</p><p className="text-[10px] font-bold text-on-surface-variant uppercase">Students Online</p></div>
                      <div className="p-3 bg-surface-container-high rounded-lg text-center"><p className="text-2xl font-bold text-secondary">158</p><p className="text-[10px] font-bold text-on-surface-variant uppercase">Quests Today</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <footer className="bg-surface-dim border-t-2 border-surface-variant w-full py-8">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop max-w-container-max mx-auto gap-4">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h4 className="font-headline-md text-headline-md text-on-surface font-bold">ChemLab 3D</h4>
            <p className="font-label-sm text-label-sm text-on-surface-variant">© 2024 ChemLab 3D Magical Academy. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href={appRoutes.settingsCustomization}>Academic Integrity</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href={appRoutes.settingsCustomization}>Lab Safety</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href={appRoutes.settingsCustomization}>Privacy Scroll</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm" href={appRoutes.learningCommunity}>Contact Sage</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
