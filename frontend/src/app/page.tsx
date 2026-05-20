import Link from 'next/link';

import SiteFooter from '../components/layout/site-footer';
import SiteHeader from '../components/layout/site-header';

const chemistryDoodleImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDp28mxKIHXIF6IZVtY5G_poZ7YTohMowFsesR3iD_9ADtgdXGFfhpy0sfx6Bft76QUfqkIn4ug46_pC2wJoix5bbhNKGvTXCmEcfnipwyzkvEGAdvprvU3fO7nuue3wkzN6aIjXJubwkA8IIKNKGBkKrZQ4O9cVJrSlPCqrR-NdD69KoiFzjR419FpCd8fmd9PV6KM6v-pbl0bEEbLuhQBvvX81FNVaBMyQxEljG_ldMulAjhVzP0271fMyLJFfRqz3Dx2etki_Ns';

const heroScientistImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCqXDD2GeRKw7Ptxanso8Vnn4cH8PjIKwOzOGXCvo5NS6SEh4_UFMhabVmmJsPdsZ2G-J2m5sTdiC4tffNf1s7OoUKyzixqwdBIrcfGDT7EKoMTDrufOTTyhF33rGhao78MA2Yp2Qtcqe384nQkC1HB3BVbJncWT3XBTTyf388X8-JSLk5z3HbgM-fADdSnP8EWmMzGJEMNPMvBgSjUhMbUn_DEkaRSZcANaX2H5EPCHkdHwVt_mzGrf74kXXCBtvBJUX7dvpMYw7Q';

const latestNews = [
  {
    title: 'Mở cửa phòng thí nghiệm ảo 2D phiên bản mới',
    summary: 'Cập nhật bộ dụng cụ mô phỏng an toàn hơn cùng hướng dẫn từng bước cho học sinh mới.',
    date: '20/05/2026',
    href: '/science-news-blog',
  },
  {
    title: 'Tuần lễ Hóa học Xanh dành cho học sinh THCS',
    summary: 'Chuỗi hoạt động khám phá phản ứng thân thiện với môi trường và các mini game tương tác.',
    date: '18/05/2026',
    href: '/community',
  },
  {
    title: 'Bảng tuần hoàn tương tác có thêm chế độ luyện thi',
    summary: 'Bổ sung câu hỏi theo cấp độ và hệ thống gợi ý thông minh cho từng nhóm nguyên tố.',
    date: '15/05/2026',
    href: '/tools/periodic-table',
  },
];

const featuredCourses = [
  {
    title: 'Hóa Học Cơ Bản Qua Thí Nghiệm Ảo',
    level: 'Cơ bản',
    lessons: 18,
    href: '/courses',
  },
  {
    title: 'Khám Phá Phản Ứng Oxi Hóa - Khử',
    level: 'Trung cấp',
    lessons: 14,
    href: '/learning/pathway',
  },
  {
    title: 'Bí Mật Bảng Tuần Hoàn Theo Nhóm Chất',
    level: 'Nâng cao',
    lessons: 22,
    href: '/periodic-table',
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

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

        <section className="relative z-10 rounded-2xl border-2 border-outline-variant bg-surface-container-low p-6 md:p-8">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface">Tin tức mới nhất</h2>
            <Link
              href="/science-news-blog"
              className="inline-flex items-center gap-2 rounded-full border-2 border-primary px-4 py-2 font-label-sm text-label-sm text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-on-primary"
            >
              Xem tất cả
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {latestNews.map((news) => (
              <Link
                key={news.title}
                href={news.href}
                className="group rounded-xl border-2 border-surface-variant bg-surface-container-lowest p-5 transition-all hover:-translate-y-1 hover:border-primary-fixed-dim"
              >
                <p className="mb-2 font-label-sm text-label-sm text-secondary">{news.date}</p>
                <h3 className="mb-3 font-headline-md text-[20px] text-on-surface transition-colors group-hover:text-primary">
                  {news.title}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{news.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="relative z-10">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-headline-md text-headline-md text-on-surface">Khóa học nổi bật</h2>
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-label-sm text-label-sm text-on-primary shadow-[0px_4px_0px_0px_rgba(0,67,149,0.3)] transition-all hover:-translate-y-0.5"
            >
              Khám phá khóa học
              <span className="material-symbols-outlined text-[18px]">school</span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            {featuredCourses.map((course) => (
              <Link
                key={course.title}
                href={course.href}
                className="group flex flex-col gap-4 rounded-xl border-2 border-surface-variant bg-surface-container-lowest p-6 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-primary-fixed px-3 py-1 font-label-sm text-label-sm text-primary">
                    {course.level}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">{course.lessons} bài học</span>
                </div>
                <h3 className="font-headline-md text-[22px] text-on-surface transition-colors group-hover:text-primary">
                  {course.title}
                </h3>
                <div className="mt-auto inline-flex items-center gap-2 font-label-sm text-label-sm text-primary">
                  Vào học ngay
                  <span className="material-symbols-outlined text-[18px]">north_east</span>
                </div>
              </Link>
            ))}
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

      <SiteFooter />
    </div>
  );
}
