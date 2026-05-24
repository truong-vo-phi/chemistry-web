import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Experiment Library',
};

export default function ExperimentLibraryPage() {
  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col font-body-md selection:bg-primary-container selection:text-on-primary-container">
      <header className="w-full">
        <div className="flex justify-between items-center w-full px-gutter py-unit max-w-container-max mx-auto bg-surface rounded-lg mt-4 border-2 border-surface-variant shadow-sm">
          <div className="flex items-center gap-4 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
            <span className="font-headline-md text-headline-md font-bold text-primary tracking-tight">ChemLab 3D</span>
          </div>
          <button aria-label="Toggle Menu" className="md:hidden p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu</span>
          </button>
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-primary font-bold border-b-2 border-primary pb-1 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200" href={appRoutes.experimentLibrary}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
              <span className="font-headline-md text-headline-md font-body-md text-body-md">Lab Bench</span>
            </Link>
            <Link className="text-on-surface-variant font-medium pb-1 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 hover:text-primary transition-colors" href={appRoutes.periodicTable}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>apps</span>
              <span className="font-headline-md text-headline-md font-body-md text-body-md">Periodic Table</span>
            </Link>
            <Link className="text-on-surface-variant font-medium pb-1 flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 hover:text-primary transition-colors" href={appRoutes.learningPathway}>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>menu_book</span>
              <span className="font-headline-md text-headline-md font-body-md text-body-md">Formula Book</span>
            </Link>
          </nav>
          <div className="hidden md:flex items-center gap-4">
            <button aria-label="Notifications" className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors relative">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>notifications</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
            </button>
            <Link href={appRoutes.launch3dLab} className="bg-primary text-on-primary font-label-sm text-label-sm px-4 py-2 rounded-full border-2 border-on-primary-fixed-variant shadow-[0px_4px_0px_0px_rgba(0,67,149,1)] hover:brightness-110">
              Launch Lab
            </Link>
            <div className="w-10 h-10 rounded-full border-2 border-primary-container overflow-hidden bg-surface-variant shrink-0 cursor-pointer hover:scale-[1.05] transition-transform">
              <img alt="User avatar with colorful border" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDBc_XdURVm5u7WZMoqRioISTqlKlYRMjQkYBbBLFNA9PUvF4ZVn1MYAmOqaCFqEAgmDXaz1JiQfSGh8pRxZMhVxeTz7YnXXtj8kTLH8FXi5qx62hiT2eKQLNt33Wlp2ldPxYlZY-jsd0PpAZQXDRjqajBntv_X9CsOXqFRr2G_TJ2ByBcsYajmTeUwKn-aXu6dMOnK0ZhA1Zh7oSy_r74eHUYoU2G8dzBCwAfv8Uk-U-sSn6ARYqB4L-dazPKEMRlA241eqUnI74g" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-container-max mx-auto w-full px-margin-mobile md:px-margin-desktop py-gutter gap-gutter mt-4">
        <aside className="hidden lg:flex flex-col w-64 p-gutter sticky top-24 h-[calc(100vh-120px)] bg-surface rounded-lg border-2 border-surface-variant shadow-sm overflow-y-auto">
          <div className="flex flex-col items-center mb-8 pt-4">
            <div className="w-20 h-20 rounded-full border-4 border-secondary-container overflow-hidden bg-surface-container mb-3 relative">
              <img alt="Cartoon scientist avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM7dGMyfQRLHIOB0ujhXwk-oREThvKQ7g_DSzC-ZIn4XMrPMhyPC8Enc4N71KJPPnM9n_XAzs3XsJDYi2ODUhMQz01N7j5eqB8LEZpYIRtOY_rcA-r-HKZpfU7Y-FkYxmwxOCkyr8R-FEJpU3qGXXdByWautUc91lDNdasgnPlP7zxtDtehyoN6UknBmJNPJ-2JhWQjE-H-rxKFWi8omWeRX1IjbfRWcqOu7Dw5_H65zO_HBj-pqs9mFj6h6t0D43NzvfrmGPuL0I" />
            </div>
            <h2 className="font-headline-md text-headline-md text-primary text-center">Professor Proton</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant text-center">Lead Researcher</p>
          </div>
          <nav className="flex-1 flex flex-col gap-2">
            <Link className="flex items-center gap-4 p-4 mb-2 bg-secondary-container text-on-secondary-container rounded-lg border-2 border-secondary shadow-[4px_4px_0px_0px_rgba(0,108,73,0.2)] font-label-sm text-label-sm font-body-md text-body-md hover:scale-[1.03] transition-all duration-200" href={appRoutes.experimentLibrary}><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>science</span><span>Lab Bench</span></Link>
            <Link className="flex items-center gap-4 p-4 mb-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors font-label-sm text-label-sm font-body-md text-body-md hover:scale-[1.03] transition-all duration-200" href={appRoutes.periodicTable}><span className="material-symbols-outlined">apps</span><span>Periodic Table</span></Link>
            <Link className="flex items-center gap-4 p-4 mb-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors font-label-sm text-label-sm font-body-md text-body-md hover:scale-[1.03] transition-all duration-200" href={appRoutes.learningPathway}><span className="material-symbols-outlined">menu_book</span><span>Formula Book</span></Link>
            <Link className="flex items-center gap-4 p-4 mb-2 text-on-surface-variant hover:bg-surface-container-low rounded-lg transition-colors font-label-sm text-label-sm font-body-md text-body-md hover:scale-[1.03] transition-all duration-200" href={appRoutes.profileAchievements}><span className="material-symbols-outlined">star</span><span>My Progress</span></Link>
          </nav>
          <div className="mt-auto pt-4">
            <Link href={appRoutes.launch3dLab} className="w-full flex items-center justify-center gap-2 bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm px-4 py-3 rounded-full border-2 border-tertiary shadow-[0px_4px_0px_0px_rgba(130,81,0,1)] hover:brightness-110">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
              New Experiment
            </Link>
          </div>
        </aside>

        <main className="flex-1 flex flex-col gap-gutter min-w-0">
          <div className="bg-surface-container-lowest rounded-xl p-8 border-2 border-surface-variant shadow-sm relative overflow-hidden">
            <div className="absolute -right-10 -top-10 opacity-20 pointer-events-none text-primary">
              <span className="material-symbols-outlined text-[200px]" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
            </div>
            <h1 className="font-display-lg-mobile md:font-display-lg text-primary mb-4 relative z-10">Thư viện Thí nghiệm</h1>
            <p className="font-body-lg text-on-surface-variant max-w-2xl relative z-10">Khám phá thế giới hóa học kỳ diệu qua các thí nghiệm mô phỏng 3D tương tác. Chọn một nhiệm vụ và bắt đầu hành trình học tập vui nhộn!</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 relative z-10">
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-surface-variant bg-surface-container-lowest focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all font-body-md outline-none placeholder:text-on-surface-variant" placeholder="Tìm kiếm nhiệm vụ..." type="text" />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                <button className="shrink-0 px-6 py-3 rounded-full border-2 border-primary bg-primary-container text-on-primary-container font-label-sm text-label-sm shadow-[0px_4px_0px_0px_rgba(33,112,228,0.5)] flex items-center gap-2"><span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>Tất cả</button>
                <button className="shrink-0 px-6 py-3 rounded-full border-2 border-surface-variant bg-surface text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-low transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">school</span>Cơ bản</button>
                <button className="shrink-0 px-6 py-3 rounded-full border-2 border-surface-variant bg-surface text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-low transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">bolt</span>Nâng cao</button>
                <button className="shrink-0 px-6 py-3 rounded-full border-2 border-surface-variant bg-surface text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-low transition-colors flex items-center gap-2"><span className="material-symbols-outlined text-[18px]">sentiment_very_satisfied</span>Vui nhộn</button>
              </div>
            </div>
          </div>

          <div className="bg-secondary-container/20 rounded-xl p-4 border-2 border-secondary-container flex items-center gap-4 shadow-sm relative overflow-hidden">
            <img alt="Student giving a tip" className="w-20 h-20 object-contain drop-shadow-md z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqXDD2GeRKw7Ptxanso8Vnn4cH8PjIKwOzOGXCvo5NS6SEh4_UFMhabVmmJsPdsZ2G-J2m5sTdiC4tffNf1s7OoUKyzixqwdBIrcfGDT7EKoMTDrufOTTyhF33rGhao78MA2Yp2Qtcqe384nQkC1HB3BVbJncWT3XBTTyf388X8-JSLk5z3HbgM-fADdSnP8EWmMzGJEMNPMvBgSjUhMbUn_DEkaRSZcANaX2H5EPCHkdHwVt_mzGrf74kXXCBtvBJUX7dvpMYw7Q" />
            <div className="z-10">
              <h3 className="font-label-sm text-[16px] font-bold text-secondary mb-1 flex items-center gap-1"><span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>tips_and_updates</span>Gợi ý nhiệm vụ hôm nay</h3>
              <p className="font-body-md text-on-surface-variant text-sm">Thử ngay nhiệm vụ <strong className="text-secondary">Phản ứng Axit - Bazơ</strong> để nhận huy hiệu Nhà Hóa Học Tập Sự nhé!</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3].map((idx) => (
              <article key={idx} className="bg-surface-container-lowest rounded-xl border-2 border-secondary-container shadow-sm hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden group">
                <div className="h-48 relative overflow-hidden bg-secondary-fixed-dim/20 p-4 flex items-center justify-center">
                  <img alt="experiment" className="w-full h-full object-contain relative z-10 drop-shadow-md group-hover:scale-110 transition-transform duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp28mxKIHXIF6IZVtY5G_poZ7YTohMowFsesR3iD_9ADtgdXGFfhpy0sfx6Bft76QUfqkIn4ug46_pC2wJoix5bbhNKGvTXCmEcfnipwyzkvEGAdvprvU3fO7nuue3wkzN6aIjXJubwkA8IIKNKGBkKrZQ4O9cVJrSlPCqrR-NdD69KoiFzjR419FpCd8fmd9PV6KM6v-pbl0bEEbLuhQBvvX81FNVaBMyQxEljG_ldMulAjhVzP0271fMyLJFfRqz3Dx2etki_Ns" />
                </div>
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-background mb-2">Nhiệm vụ mẫu {idx}</h3>
                    <p className="font-body-md text-on-surface-variant line-clamp-2">Mô tả nhiệm vụ thí nghiệm để người dùng trải nghiệm theo phong cách UI bạn cung cấp.</p>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-surface border-2 border-surface-variant rounded-md text-on-surface-variant font-label-sm text-[12px]">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>15 mins
                    </span>
                  </div>
                  <Link href={appRoutes.launch3dLab} className="w-full mt-2 py-3 bg-secondary text-on-secondary font-label-sm text-label-sm rounded-full border-2 border-on-secondary-fixed-variant shadow-[0px_4px_0px_0px_rgba(0,82,54,1)] flex items-center justify-center gap-2 group-hover:brightness-110">
                    Nhận nhiệm vụ
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="flex justify-center mt-4 mb-8">
            <button className="px-8 py-3 rounded-full border-2 border-surface-variant bg-surface-container-lowest text-on-surface-variant font-label-sm text-label-sm hover:bg-surface-container-low transition-colors flex items-center gap-2 shadow-sm">
              <span className="material-symbols-outlined">refresh</span>
              Tải thêm nhiệm vụ
            </button>
          </div>
        </main>
      </div>

      <footer className="bg-surface-container rounded-t-xl w-full border-t-2 border-surface-variant mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-desktop py-gutter gap-margin-mobile max-w-container-max mx-auto w-full">
          <div className="flex items-center gap-2">
            <span className="font-headline-md text-headline-md text-primary font-bold">ChemLab 3D</span>
            <span className="text-on-surface-variant font-body-md text-body-md">© 2024 ChemLab 3D: Playful Academy</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link className="text-on-surface-variant hover:text-primary transition-colors hover:underline" href={appRoutes.settingsCustomization}>Laboratory Safety</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors hover:underline" href={appRoutes.learningPathway}>Curriculum</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors hover:underline" href={appRoutes.learningCommunity}>Join the Lab</Link>
            <Link className="text-on-surface-variant hover:text-primary transition-colors hover:underline" href={appRoutes.scienceNewsBlog}>Privacy Policy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
