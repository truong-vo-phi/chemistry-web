import Link from 'next/link';

const chemistryDoodleImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDp28mxKIHXIF6IZVtY5G_poZ7YTohMowFsesR3iD_9ADtgdXGFfhpy0sfx6Bft76QUfqkIn4ug46_pC2wJoix5bbhNKGvTXCmEcfnipwyzkvEGAdvprvU3fO7nuue3wkzN6aIjXJubwkA8IIKNKGBkKrZQ4O9cVJrSlPCqrR-NdD69KoiFzjR419FpCd8fmd9PV6KM6v-pbl0bEEbLuhQBvvX81FNVaBMyQxEljG_ldMulAjhVzP0271fMyLJFfRqz3Dx2etki_Ns';

const heroScientistImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCqXDD2GeRKw7Ptxanso8Vnn4cH8PjIKwOzOGXCvo5NS6SEh4_UFMhabVmmJsPdsZ2G-J2m5sTdiC4tffNf1s7OoUKyzixqwdBIrcfGDT7EKoMTDrufOTTyhF33rGhao78MA2Yp2Qtcqe384nQkC1HB3BVbJncWT3XBTTyf388X8-JSLk5z3HbgM-fADdSnP8EWmMzGJEMNPMvBgSjUhMbUn_DEkaRSZcANaX2H5EPCHkdHwVt_mzGrf74kXXCBtvBJUX7dvpMYw7Q';

export default function HomePage() {
  return (
    <>
      <div className="relative z-50 mx-auto w-full max-w-[1296px] px-margin-mobile md:px-margin-desktop">
        <header className="mx-auto mt-4 flex w-full max-w-container-max items-center justify-between rounded-lg border-2 border-surface-variant bg-surface px-gutter py-unit shadow-sm">
          <Link
            href="/"
            className="flex cursor-pointer items-center gap-2 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-fixed-variant bg-primary-container shadow-[2px_2px_0px_0px_rgba(0,67,149,0.3)]">
              <span
                className="material-symbols-outlined text-on-primary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                science
              </span>
            </div>
            <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">
              ChemLab 3D
            </span>
          </Link>

          <div className="ml-8 hidden flex-1 items-center justify-start gap-8 md:flex">
            <div className="group relative w-64">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors group-focus-within:text-primary">
                search
              </span>
              <input
                className="w-full rounded-full border-2 border-surface-variant bg-surface-container-lowest py-2 pl-10 pr-4 font-body-md text-body-md text-on-surface shadow-sm transition-all focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary-fixed/30"
                placeholder="Tìm kiếm bài học..."
                type="text"
              />
            </div>
            <nav className="flex items-center gap-6">
              <Link
                className="font-body-md text-body-md font-medium text-on-surface-variant transition-transform duration-200 hover:scale-[1.02] hover:text-primary active:scale-[0.98]"
                href="/learning-pathway"
              >
                Khám phá
              </Link>
              <Link
                className="font-body-md text-body-md font-medium text-on-surface-variant transition-transform duration-200 hover:scale-[1.02] hover:text-primary active:scale-[0.98]"
                href="/periodic-table"
              >
                Bảng Tuần Hoàn
              </Link>
              <Link
                className="font-body-md text-body-md font-medium text-on-surface-variant transition-transform duration-200 hover:scale-[1.02] hover:text-primary active:scale-[0.98]"
                href="/interfaces"
              >
                Giao diện
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Link
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-high hover:scale-[1.02] active:scale-[0.98]"
              href="/learning-community"
            >
              <span className="material-symbols-outlined">notifications</span>
            </Link>
            <Link
              className="hidden items-center gap-2 rounded-full border-2 border-on-primary-fixed-variant bg-primary px-6 py-3 font-label-sm text-label-sm text-on-primary shadow-[0px_4px_0px_0px_rgba(0,67,149,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0px_6px_0px_0px_rgba(0,67,149,0.3)] active:translate-y-1 active:shadow-none md:flex"
              href="/launch-3d-lab"
            >
              <span className="material-symbols-outlined">rocket_launch</span>
              Launch Lab
            </Link>
            <Link
              className="flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-tertiary-fixed-dim bg-tertiary-container transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
              href="/profile-achievements"
            >
              <span className="material-symbols-outlined text-on-tertiary-container">person</span>
            </Link>
          </div>
        </header>
      </div>

      <main className="relative mx-auto flex w-full max-w-container-max flex-1 flex-col gap-24 px-margin-mobile py-12 md:px-margin-desktop">
        <img
          alt=""
          aria-hidden="true"
          className="absolute left-[-10%] top-[20%] -z-20 h-auto w-64 animate-[bounce_6s_infinite_alternate] opacity-20"
          src={chemistryDoodleImage}
        />
        <img
          alt=""
          aria-hidden="true"
          className="absolute right-[-10%] top-[60%] -z-20 h-auto w-72 animate-[bounce_8s_infinite_alternate_reverse] opacity-20"
          src={chemistryDoodleImage}
        />

        <section className="relative flex flex-col-reverse items-center gap-12 md:flex-row">
          <div className="absolute left-[-10%] top-10 -z-10 h-[600px] w-[600px] rounded-full bg-primary-fixed opacity-40 blur-3xl" />
          <div className="absolute bottom-[-10%] right-[-5%] -z-10 h-[400px] w-[400px] rounded-full bg-secondary-fixed opacity-40 blur-3xl" />

          <div className="flex flex-1 flex-col items-center gap-6 text-center md:items-start md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-surface-variant bg-surface-container-high px-4 py-2">
              <span className="material-symbols-outlined text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                stars
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Học tập qua tương tác thú vị
              </span>
            </div>
            <h1 className="font-display-lg-mobile text-display-lg-mobile text-on-surface md:font-display-lg md:text-display-lg">
              <span className="mb-2 block text-primary">Khám phá Hóa học</span> Vui nhộn!
            </h1>
            <p className="max-w-xl font-body-lg text-body-lg text-on-surface-variant">
              Học tập chưa bao giờ thú vị đến thế với phòng thí nghiệm hoạt hình. An toàn, trực quan và đầy cảm hứng cho những nhà khoa học nhí.
            </p>
            <div className="relative mt-4 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
              <Link
                className="z-10 flex w-full items-center justify-center gap-2 rounded-full border-2 border-on-primary-fixed-variant bg-primary px-8 py-4 font-label-sm text-label-sm text-on-primary shadow-[0px_4px_0px_0px_rgba(0,67,149,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0px_6px_0px_0px_rgba(0,67,149,0.3)] active:translate-y-1 active:shadow-none sm:w-auto"
                href="/student-dashboard"
              >
                Bắt đầu ngay!
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                className="z-10 flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary bg-surface-container-lowest px-8 py-4 font-label-sm text-label-sm text-primary shadow-[0px_4px_0px_0px_rgba(0,88,190,0.1)] transition-all hover:-translate-y-0.5 hover:bg-surface-container hover:shadow-[0px_6px_0px_0px_rgba(0,88,190,0.15)] sm:w-auto"
                href="/video-lecture-detail"
              >
                <span className="material-symbols-outlined">play_circle</span>
                Xem Video
              </Link>
            </div>
          </div>

          <div className="relative flex aspect-square w-full max-w-[500px] items-center justify-center">
            <img
              alt=""
              aria-hidden="true"
              className="absolute -right-4 -top-10 z-0 h-auto w-48 animate-[bounce_4s_infinite_alternate] opacity-70"
              src={chemistryDoodleImage}
            />
            <div className="relative z-10 flex h-full w-full items-end justify-center transition-transform duration-500 hover:scale-105">
              <img
                alt="Cartoon student holding colorful test tube"
                className="h-auto w-[85%] object-contain drop-shadow-2xl"
                src={heroScientistImage}
              />
            </div>
            <div className="absolute left-4 top-4 z-20 rounded-full border-2 border-on-secondary-container bg-secondary-container px-4 py-2 shadow-[2px_4px_0px_0px_rgba(0,113,77,0.2)] animate-[bounce_3s_infinite_alternate]">
              <span className="font-label-sm text-label-sm text-on-secondary-container">H2O</span>
            </div>
            <div className="absolute bottom-10 right-0 z-20 rounded-full border-2 border-on-tertiary-container bg-tertiary-container px-4 py-2 shadow-[2px_4px_0px_0px_rgba(163,103,0,0.2)] animate-[bounce_4s_infinite_alternate_reverse]">
              <span className="font-label-sm text-label-sm text-on-tertiary-container">An Toàn 100%</span>
            </div>
          </div>
        </section>

        <section className="relative z-10 flex flex-col gap-10">
          <div className="text-center">
            <h2 className="font-headline-md text-headline-md text-on-surface">Phương pháp học tập mới</h2>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            <Link
              href="/experiment-library"
              className="flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-primary-fixed-dim bg-surface-container-lowest p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary-fixed-dim bg-primary-fixed">
                <span className="material-symbols-outlined text-3xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  science
                </span>
              </div>
              <h3 className="font-headline-md text-[20px] text-on-surface">Thí nghiệm Vui nhộn</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Tương tác trực tiếp với các dụng cụ ảo, pha trộn hóa chất không lo cháy nổ.
              </p>
            </Link>

            <Link
              href="/learning-pathway"
              className="flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-secondary-fixed-dim bg-surface-container-lowest p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-secondary-fixed-dim bg-secondary-fixed">
                <span className="material-symbols-outlined text-3xl text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  route
                </span>
              </div>
              <h3 className="font-headline-md text-[20px] text-on-surface">Lộ trình thú vị</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Từng bước khám phá bảng tuần hoàn qua các nhiệm vụ có cốt truyện hấp dẫn.
              </p>
            </Link>

            <Link
              href="/profile-achievements"
              className="flex cursor-pointer flex-col items-center gap-4 rounded-xl border-2 border-tertiary-fixed-dim bg-surface-container-lowest p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-tertiary-fixed-dim bg-tertiary-fixed">
                <span className="material-symbols-outlined text-3xl text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  workspace_premium
                </span>
              </div>
              <h3 className="font-headline-md text-[20px] text-on-surface">Huy hiệu phần thưởng</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Sưu tầm huy hiệu khoa học gia sau mỗi bài học để khoe với bạn bè.
              </p>
            </Link>
          </div>
        </section>

        <section className="relative z-10 flex flex-col items-center gap-6 overflow-hidden rounded-[2rem] border-2 border-surface-variant bg-surface-container py-12">
          <img
            alt=""
            aria-hidden="true"
            className="absolute -bottom-16 left-10 -z-0 h-auto w-40 rotate-12 opacity-10"
            src={chemistryDoodleImage}
          />
          <h3 className="relative z-10 font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
            Được tin dùng bởi hơn 1000 trường học
          </h3>
          <div className="relative z-10 flex flex-wrap items-center justify-center gap-8 opacity-70 md:gap-16">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rotate-12 rounded-lg border-2 border-outline-variant bg-primary-fixed" />
              <span className="font-label-sm text-label-sm font-bold text-on-surface">Alpha Kids</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 -rotate-12 rounded-full border-2 border-outline-variant bg-secondary-fixed" />
              <span className="font-label-sm text-label-sm font-bold text-on-surface">Stem Academy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-12 rounded-xl border-2 border-outline-variant bg-tertiary-fixed" />
              <span className="font-label-sm text-label-sm font-bold text-on-surface">Newton High</span>
            </div>
            <div className="hidden items-center gap-2 sm:flex">
              <div className="h-10 w-10 rotate-45 rounded-br-xl rounded-tl-xl border-2 border-outline-variant bg-error-container" />
              <span className="font-label-sm text-label-sm font-bold text-on-surface">Future Lab</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 mt-auto w-full rounded-t-xl border-t-2 border-surface-variant bg-surface-container">
        <div className="mx-auto flex w-full max-w-container-max flex-col items-center justify-between gap-margin-mobile px-margin-mobile py-gutter transition-all duration-200 md:flex-row md:px-margin-desktop">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">ChemLab 3D</span>
            <span className="font-body-md text-body-md text-secondary">© 2024 ChemLab 3D: Playful Academy</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6">
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary hover:underline decoration-2 underline-offset-4"
              href="/lesson-interface"
            >
              Laboratory Safety
            </Link>
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary hover:underline decoration-2 underline-offset-4"
              href="/theory-course-library"
            >
              Curriculum
            </Link>
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary hover:underline decoration-2 underline-offset-4"
              href="/launch-3d-lab"
            >
              Join the Lab
            </Link>
            <Link
              className="font-label-sm text-label-sm text-on-surface-variant transition-colors hover:text-primary hover:underline decoration-2 underline-offset-4"
              href="/settings-customization"
            >
              Privacy Policy
            </Link>
          </nav>
        </div>
      </footer>
    </>
  );
}
