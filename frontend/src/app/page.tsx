const chemistryDoodleImage = "/images/chemistry-doodle.png";
const heroScientistImage = "/images/hero-scientist.png";

export default function HomePage() {
  return (
    <>
      {/* TopNavBar */}
      <div className="px-margin-mobile md:px-margin-desktop w-full max-w-[1296px] mx-auto z-50 relative">
        <header className="bg-surface dark:bg-surface-dim rounded-lg mt-4 border-2 border-surface-variant dark:border-outline shadow-sm flex justify-between items-center w-full px-gutter py-unit max-w-container-max mx-auto">
          {/* Brand Logo */}
          <div className="flex items-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200">
            <div className="w-10 h-10 bg-primary-container rounded-full flex items-center justify-center border-2 border-primary-fixed-variant shadow-[2px_2px_0px_0px_rgba(0,67,149,0.3)]">
              <span className="material-symbols-outlined text-on-primary-container" data-icon="science" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
            </div>
            <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed-dim tracking-tight">ChemLab 3D</span>
          </div>
          {/* Search Bar & Nav */}
          <div className="hidden md:flex flex-1 items-center justify-start ml-8 gap-8">
            <div className="relative w-64 group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors" data-icon="search">search</span>
              <input className="w-full bg-surface-container-lowest border-2 border-surface-variant rounded-full py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary-fixed/30 transition-all shadow-sm" placeholder="Tìm kiếm bài học..." type="text" />
            </div>
            <nav className="flex items-center gap-6">
              <a className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200" href="#">Khám phá</a>
              <a className="text-on-surface-variant font-medium font-body-md text-body-md hover:text-primary hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200" href="#">Bảng Tuần Hoàn</a>
            </nav>
          </div>
          {/* Trailing Actions */}
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
              <span className="material-symbols-outlined" data-icon="notifications">notifications</span>
            </button>
            <button className="hidden md:flex items-center gap-2 bg-primary text-on-primary font-label-sm text-label-sm px-6 py-3 rounded-full border-2 border-on-primary-fixed-variant shadow-[0px_4px_0px_0px_rgba(0,67,149,0.3)] hover:-translate-y-0.5 hover:shadow-[0px_6px_0px_0px_rgba(0,67,149,0.3)] active:translate-y-1 active:shadow-none transition-all">
              <span className="material-symbols-outlined" data-icon="rocket_launch">rocket_launch</span>
              Launch Lab
            </button>
            <div className="w-10 h-10 rounded-full border-2 border-tertiary-fixed-dim overflow-hidden cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 bg-tertiary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-container" data-icon="person">person</span>
            </div>
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 flex flex-col gap-24 relative">
        {/* Background Decorations */}
        <img alt="" aria-hidden="true" className="absolute top-[20%] left-[-10%] w-64 h-auto opacity-20 -z-20 animate-[bounce_6s_infinite_alternate]" src={chemistryDoodleImage} />
        <img alt="" aria-hidden="true" className="absolute top-[60%] right-[-10%] w-72 h-auto opacity-20 -z-20 animate-[bounce_8s_infinite_alternate_reverse]" src={chemistryDoodleImage} />

        {/* Hero Section */}
        <section className="flex flex-col-reverse md:flex-row items-center gap-12 relative">
          <div className="absolute top-10 left-[-10%] w-[600px] h-[600px] bg-primary-fixed rounded-full blur-3xl opacity-40 -z-10"></div>
          <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-secondary-fixed rounded-full blur-3xl opacity-40 -z-10"></div>
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full border-2 border-surface-variant">
              <span className="material-symbols-outlined text-tertiary" data-icon="stars" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Học tập qua tương tác thú vị</span>
            </div>
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface">
              <span className="text-primary block mb-2">Khám phá Hóa học</span> Vui nhộn!
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
              Học tập chưa bao giờ thú vị đến thế với phòng thí nghiệm hoạt hình. An toàn, trực quan và đầy cảm hứng cho những nhà khoa học nhí.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 w-full sm:w-auto relative">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-on-primary font-label-sm text-label-sm px-8 py-4 rounded-full border-2 border-on-primary-fixed-variant shadow-[0px_4px_0px_0px_rgba(0,67,149,0.3)] hover:-translate-y-0.5 hover:shadow-[0px_6px_0px_0px_rgba(0,67,149,0.3)] active:translate-y-1 active:shadow-none transition-all z-10">
                Bắt đầu ngay!
                <span className="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
              </button>
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-surface-container-lowest text-primary font-label-sm text-label-sm px-8 py-4 rounded-full border-2 border-primary shadow-[0px_4px_0px_0px_rgba(0,88,190,0.1)] hover:-translate-y-0.5 hover:shadow-[0px_6px_0px_0px_rgba(0,88,190,0.15)] hover:bg-surface-container transition-all z-10">
                <span className="material-symbols-outlined" data-icon="play_circle">play_circle</span>
                Xem Video
              </button>
            </div>
          </div>
          <div className="flex-1 relative w-full max-w-[500px] aspect-square flex items-center justify-center">
            <img alt="" aria-hidden="true" className="absolute -top-10 -right-4 w-48 h-auto opacity-70 animate-[bounce_4s_infinite_alternate] z-0" src={chemistryDoodleImage} />
            <div className="w-full h-full flex items-end justify-center relative transform hover:scale-105 transition-transform duration-500 z-10">
              <img alt="Cartoon student holding colorful test tube" className="w-[85%] h-auto object-contain drop-shadow-2xl" src={heroScientistImage} />
            </div>
            <div className="absolute top-4 left-4 bg-secondary-container border-2 border-on-secondary-container rounded-full px-4 py-2 shadow-[2px_4px_0px_0px_rgba(0,113,77,0.2)] animate-[bounce_3s_infinite_alternate] z-20">
              <span className="font-label-sm text-label-sm text-on-secondary-container">H2O</span>
            </div>
            <div className="absolute bottom-10 right-0 bg-tertiary-container border-2 border-on-tertiary-container rounded-full px-4 py-2 shadow-[2px_4px_0px_0px_rgba(163,103,0,0.2)] animate-[bounce_4s_infinite_alternate_reverse] z-20">
              <span className="font-label-sm text-label-sm text-on-tertiary-container">An Toàn 100%</span>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="flex flex-col gap-10 relative">
          <div className="text-center z-10">
            <h2 className="font-headline-md text-headline-md text-on-surface">Phương pháp học tập mới</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter z-10">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest border-2 border-primary-fixed-dim rounded-xl p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center gap-4 cursor-default">
              <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center border-2 border-primary-fixed-dim">
                <span className="material-symbols-outlined text-primary text-3xl" data-icon="science" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface text-[20px]">Thí nghiệm Vui nhộn</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Tương tác trực tiếp với các dụng cụ ảo, pha trộn hóa chất không lo cháy nổ.</p>
            </div>
            {/* Card 2 */}
            <div className="bg-surface-container-lowest border-2 border-secondary-fixed-dim rounded-xl p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center gap-4 cursor-default">
              <div className="w-16 h-16 bg-secondary-fixed rounded-full flex items-center justify-center border-2 border-secondary-fixed-dim">
                <span className="material-symbols-outlined text-secondary text-3xl" data-icon="route" style={{ fontVariationSettings: "'FILL' 1" }}>route</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface text-[20px]">Lộ trình thú vị</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Từng bước khám phá bảng tuần hoàn qua các nhiệm vụ có cốt truyện hấp dẫn.</p>
            </div>
            {/* Card 3 */}
            <div className="bg-surface-container-lowest border-2 border-tertiary-fixed-dim rounded-xl p-8 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center gap-4 cursor-default">
              <div className="w-16 h-16 bg-tertiary-fixed rounded-full flex items-center justify-center border-2 border-tertiary-fixed-dim">
                <span className="material-symbols-outlined text-tertiary text-3xl" data-icon="workspace_premium" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface text-[20px]">Huy hiệu phần thưởng</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Sưu tầm huy hiệu khoa học gia sau mỗi bài học để khoe với bạn bè.</p>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="flex flex-col items-center gap-6 py-12 bg-surface-container rounded-[2rem] border-2 border-surface-variant z-10 relative overflow-hidden">
          <img alt="" aria-hidden="true" className="absolute -bottom-16 left-10 w-40 h-auto opacity-10 -z-0 rotate-12" src={chemistryDoodleImage} />
          <h3 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider relative z-10">Được tin dùng bởi hơn 1000 trường học</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary-fixed rounded-lg border-2 border-outline-variant rotate-12"></div>
              <span className="font-label-sm text-label-sm font-bold text-on-surface">Alpha Kids</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-secondary-fixed rounded-full border-2 border-outline-variant -rotate-12"></div>
              <span className="font-label-sm text-label-sm font-bold text-on-surface">Stem Academy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-10 bg-tertiary-fixed rounded-xl border-2 border-outline-variant"></div>
              <span className="font-label-sm text-label-sm font-bold text-on-surface">Newton High</span>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-10 h-10 bg-error-container rounded-tl-xl rounded-br-xl border-2 border-outline-variant rotate-45"></div>
              <span className="font-label-sm text-label-sm font-bold text-on-surface">Future Lab</span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container dark:bg-surface-container-highest rounded-t-xl w-full border-t-2 border-surface-variant dark:border-outline-variant mt-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-gutter gap-margin-mobile max-w-container-max mx-auto w-full transition-all duration-200">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-headline-md text-headline-md text-primary font-bold tracking-tight">ChemLab 3D</span>
            <span className="font-body-md text-body-md text-secondary dark:text-secondary-fixed-dim">© 2024 ChemLab 3D: Playful Academy</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4" href="#">Laboratory Safety</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4" href="#">Curriculum</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4" href="#">Join the Lab</a>
            <a className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors hover:underline decoration-2 underline-offset-4" href="#">Privacy Policy</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
