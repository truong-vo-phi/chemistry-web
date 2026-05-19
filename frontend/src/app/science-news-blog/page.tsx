import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Science News & Blog',
  description: 'Explore breakthroughs, lab updates, and scholarly insights from the world of chemistry.',
};

function TactileCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-lg border-2 border-outline-variant bg-surface-container-lowest shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </div>
  );
}

export default function ScienceNewsBlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body-md text-on-background">
      <nav className="sticky top-0 z-50 mx-auto my-4 hidden w-full max-w-[95%] rounded-full border-2 border-primary/20 bg-surface/80 shadow-sm backdrop-blur-md md:flex">
        <div className="mx-auto flex w-full max-w-container-max items-center justify-between px-margin-desktop py-2">
          <div className="text-headline-md font-headline-md font-bold text-primary">ChemLab 3D</div>
          <div className="flex items-center space-x-gutter">
            <Link className="rounded-full px-4 py-2 text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary" href={appRoutes.teacherDashboard}>Dashboard</Link>
            <Link className="rounded-full px-4 py-2 text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary" href={appRoutes.experimentLibrary}>Experiments</Link>
            <Link className="rounded-full px-4 py-2 text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary" href={appRoutes.theoryCourseLibrary}>Curriculum</Link>
            <Link className="rounded-full border-b-2 border-primary px-4 py-2 text-label-sm font-bold text-primary" href={appRoutes.scienceNewsBlog}>Resources</Link>
            <Link className="rounded-full px-4 py-2 text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary" href={appRoutes.learningCommunity}>Support</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link className="rounded-full border-2 border-primary bg-primary px-6 py-2 font-label-sm text-on-primary shadow-[0_4px_0_theme(colors.primary-container)] transition-all active:translate-y-1 active:shadow-none" href={appRoutes.launch3dLab}>
              Launch Lab
            </Link>
            <img alt="Student Profile Avatar" className="h-10 w-10 rounded-full border-2 border-primary" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDW_o8FY2PlfyYS78Zt1VDdbUk6jdSx9M_F1ZnJfNOzNT310F4tYEy7nnWLrb6hmNsl9xcbJVrmpljzyZIsR59vJkSatK3ZXcbrGN7EkxtvaxmvMbOo_8E5bpOvASHro8-DIy7dSEBs5B9-90k5WjdDoQVjRlEHwYhc0ezPj043wTNWIAom5KkhKzCoI0gJg3hZhJz8pkUhMcKaM00ThIcF31S8Fk8PNoEdl3B49dxAfdRAEDtjuDiXQSnenHuVbJl0jD5j3wYatCI" />
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-container-max flex-grow px-margin-mobile py-8 pb-32 md:px-margin-desktop md:pb-8">
        <header className="mb-12 text-center md:text-left">
          <h1 className="mb-4 text-display-lg-mobile font-display-lg-mobile text-primary md:text-display-lg md:font-display-lg">Discovery Feed</h1>
          <p className="max-w-2xl text-body-lg text-on-surface-variant">Explore the latest breakthroughs, lab updates, and scholarly insights from the world of chemistry.</p>
        </header>

        <section className="mb-16">
          <h2 className="mb-6 flex items-center gap-2 text-headline-md font-headline-md text-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>science</span>
            Featured Research
          </h2>

          <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
            <TactileCard className="col-span-1 overflow-hidden md:col-span-2">
              <div className="group">
                <div className="relative h-64 w-full overflow-hidden bg-surface-variant md:h-80">
                  <img alt="Featured Research Banner" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1u0j94eYB0it0YWN5aroiONeOH7hSVK73ZeVHil03G-LFQR247EsiGHxyjm0bAoTRcPfBO1FqW2mugMtCGO0iY6D-rUcXpBz9GdpfouK61VTQAAr1iMR8X_BNPxN0jVxjPJctmjAClplqbWcZXd2aSlzCLsTrHyrSsp3XKCwjOlSEqekizKZ8_di9fq6e75IZlDvVKv9F057B2w60odlUGfqYFgwS3_zGlC_CncOFThw6NUYwQQCwlx9yZ7vIFtHh51BezUQ9y6Y" />
                  <div className="absolute left-4 top-4 rounded-full border-2 border-secondary/20 bg-secondary-container px-3 py-1 text-label-sm text-on-secondary-container shadow-sm">Breakthrough</div>
                </div>
                <div className="p-6 md:p-8">
                  <h3 className="mb-3 text-headline-md font-headline-md text-on-surface transition-colors group-hover:text-primary">Synthesizing the Future: New Polymer Structures</h3>
                  <p className="mb-6 text-body-md text-on-surface-variant">Recent simulations in ChemLab 3D have revealed a novel polymer chain configuration that promises increased elasticity without compromising structural integrity. Dive into the interactive model.</p>
                  <Link className="inline-flex items-center text-label-sm text-primary transition-colors hover:text-primary-container" href={appRoutes.experimentResults}>
                    Read Full Report <span className="material-symbols-outlined ml-1">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </TactileCard>

            <div className="col-span-1 flex flex-col gap-gutter">
              <TactileCard className="group flex-1 overflow-hidden">
                <div className="h-40 w-full overflow-hidden bg-surface-variant">
                  <img alt="Lab Equipment" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCX69PYw9S8qNnQI_PayBwTqzKDqnCRhfD54uNAU8e_efy8HCUZ9AR7l43uhKV4eJJtR3pjRPqhEYNs3einLAUY-6bQGyX6cMc9ulq5VN-p-tgBWd-tCFnvQvjRj3nbHwRliJdYRFOo3nAyMNMwltl3XFJ8DAwZ5JZ99W6Cn1LpSBVGmOn--lOtRWAQB_xEReBruOHwn9Kz3-xPZ4tgl6v-cCdHC3u0bO2_xVttcwr1gtthPzX7Rn2BcAQFIm2bjdAwrI_rvDbEx4s" />
                </div>
                <div className="p-4">
                  <h4 className="mb-2 text-[20px] font-headline-md leading-tight text-on-surface transition-colors group-hover:text-primary">The Catalyst Conundrum</h4>
                  <p className="line-clamp-2 text-sm text-on-surface-variant">Exploring why certain transition metals behave unpredictably in low-pressure environments.</p>
                </div>
              </TactileCard>

              <TactileCard className="group flex-1 overflow-hidden">
                <div className="h-40 w-full overflow-hidden bg-surface-variant">
                  <img alt="Molecular Bonds" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCx42J7pGueH9prl2FrygOcNSbOyS7sOg36Q6EmMjpLRtwSvem-qKmGp2ikJfxT0Z2eNpDgUBz5-2Y0t4_DyZIv2iws0ZqnxavgmxwNnTt5GFyk9UcBa4K3T9zCO_K-jBPmdhl0K3IJFEUZbzCcMR-_1ZIT8RLMv_iit4gH7_qo9BxQu78qEGb2iOg2G7bw52GFGBeGGqmphPE0Ic3F87xnOOuhboneL9KUqcOdtBE-_-n6oOhLNTQ6aTmZQ9AmTPSbmLIzoIgXq6s" />
                </div>
                <div className="p-4">
                  <h4 className="mb-2 text-[20px] font-headline-md leading-tight text-on-surface transition-colors group-hover:text-primary">Understanding Isotopes</h4>
                  <p className="line-clamp-2 text-sm text-on-surface-variant">A visual guide to identifying and utilizing stable isotopes in standard chemical reactions.</p>
                </div>
              </TactileCard>
            </div>
          </div>
        </section>

        <div className="mb-16 grid grid-cols-1 gap-gutter lg:grid-cols-3">
          <section className="lg:col-span-2">
            <h2 className="mb-6 flex items-center gap-2 text-headline-md font-headline-md text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>campaign</span>
              Lab Updates
            </h2>
            <div className="flex flex-col gap-4">
              <TactileCard className="flex items-start gap-4 p-6 transition-colors hover:bg-surface-container-low">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary/30 bg-primary-container/20">
                  <span className="material-symbols-outlined text-primary">update</span>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="text-[18px] font-headline-md text-on-surface">New Module: Organic Chemistry 101</h4>
                    <span className="rounded-full bg-surface-variant px-2 py-1 text-[12px] text-on-surface-variant">Just Now</span>
                  </div>
                  <p className="mb-3 text-body-md text-on-surface-variant">We&apos;ve just rolled out 15 new interactive experiments focusing on basic carbon chains. Update your app to access the new virtual lab bench.</p>
                  <button className="text-label-sm text-primary hover:underline" type="button">View Release Notes</button>
                </div>
              </TactileCard>

              <TactileCard className="flex items-start gap-4 p-6 transition-colors hover:bg-surface-container-low">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-secondary/30 bg-secondary-container/30">
                  <span className="material-symbols-outlined text-secondary">bug_report</span>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <h4 className="text-[18px] font-headline-md text-on-surface">Patch 2.4.1: Bunsen Burner Fixes</h4>
                    <span className="rounded-full bg-surface-variant px-2 py-1 text-[12px] text-on-surface-variant">2 Days Ago</span>
                  </div>
                  <p className="text-body-md text-on-surface-variant">Resolved an issue where the virtual Bunsen burner flame would detach during rapid panning. Stability improvements for older iPad models included.</p>
                </div>
              </TactileCard>
            </div>
          </section>

          <section className="lg:col-span-1">
            <h2 className="mb-6 flex items-center gap-2 text-headline-md font-headline-md text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
              Scholar Insights
            </h2>
            <div className="flex flex-col gap-gutter">
              <TactileCard className="border-primary-fixed-dim/30 bg-primary-fixed/20 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <img alt="Dr. Sarah Jenkins" className="h-10 w-10 rounded-full border-2 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB6fOxk1YPnI3lcpgi2G0MAso_hBiqmXlsBt-9aLNpn0ehBUjrr8yrewI1OM4NKsXahXLQmdHjLHbYd7918DDvLYchKFGiqwGcMAEseYRIgAE7YmHjzhg-h7BeS2D0AtcbHDyyao9Fi0TM0gBm1p7Pj98vYwR9wlEpOig8PZdkjDeoLVo-payGdgFbhjLL2f7QIWX7aRdmJvWY93BKP7P5x93VEh-ac9cvXbpcAJspcVbRuz0hXqz7JiEman5pmOVFPJ-eCW9GgcJs" />
                  <div>
                    <p className="text-label-sm text-on-surface">Dr. Sarah Jenkins</p>
                    <p className="text-[12px] text-on-surface-variant">Lead Educator</p>
                  </div>
                </div>
                <h4 className="mb-2 text-[18px] font-headline-md text-on-surface">Why Mistakes in the Lab Matter</h4>
                <p className="mb-4 text-sm text-on-surface-variant">Embracing the &quot;happy accidents&quot; in virtual environments can lead to deeper understanding of reaction mechanics.</p>
                <Link className="inline-flex items-center text-label-sm text-primary hover:text-primary-container" href={appRoutes.learningCommunity}>
                  Read Article <span className="material-symbols-outlined ml-1 text-[16px]">chevron_right</span>
                </Link>
              </TactileCard>

              <TactileCard className="border-tertiary-fixed-dim/30 bg-tertiary-fixed/20 p-6">
                <div className="mb-4 flex items-center gap-3">
                  <img alt="Prof. Alex Chen" className="h-10 w-10 rounded-full border-2 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFTAzMus48c1ukTe6xvMZetv2h87UJkwiCGqR61aVuveKoYO9IJ8F485i71_ktzKzNR0rCrDkloxBImq4qP50Eg0TxiHCATUW5wQaxRMUZP96YyJ3iFlX1YlZH2sWL2zILxjj4cktZb60DTPpbxclvkWa9fQv8dFs8dqEwG7qK021mxkxlmdLuhm3gcm4W3A6ICmBCMD_qSVR13JakLtgrHT9ZA74QDW2A9ViXpAYyY2oPrePod10Y8TyEpWfc5Gg68y2onySPhmk" />
                  <div>
                    <p className="text-label-sm text-on-surface">Prof. Alex Chen</p>
                    <p className="text-[12px] text-on-surface-variant">Guest Contributor</p>
                  </div>
                </div>
                <h4 className="mb-2 text-[18px] font-headline-md text-on-surface">The Magic of Titration</h4>
                <p className="mb-4 text-sm text-on-surface-variant">A step-by-step breakdown of acid-base reactions, designed specifically for visual learners.</p>
                <Link className="inline-flex items-center text-label-sm text-primary hover:text-primary-container" href={appRoutes.videoLectureDetail}>
                  Read Article <span className="material-symbols-outlined ml-1 text-[16px]">chevron_right</span>
                </Link>
              </TactileCard>
            </div>
          </section>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 z-50 w-full rounded-t-lg border-t-2 border-surface-variant bg-surface shadow-[0_-4px_12px_0_rgba(0,0,0,0.05)] md:hidden">
        <div className="flex h-16 w-full items-center justify-around px-margin-mobile">
          <Link className="flex flex-col items-center justify-center px-4 py-1 text-on-surface-variant transition-all hover:bg-surface-container-high" href={appRoutes.home}>
            <span className="material-symbols-outlined mb-1">dashboard</span>
            <span className="text-label-sm">Home</span>
          </Link>
          <Link className="flex flex-col items-center justify-center px-4 py-1 text-on-surface-variant transition-all hover:bg-surface-container-high" href={appRoutes.experimentLibrary}>
            <span className="material-symbols-outlined mb-1">science</span>
            <span className="text-label-sm">Labs</span>
          </Link>
          <Link className="flex flex-col items-center justify-center rounded-full bg-secondary-container px-4 py-1 text-on-secondary-container transition-all" href={appRoutes.theoryCourseLibrary}>
            <span className="material-symbols-outlined mb-1" style={{ fontVariationSettings: "'FILL' 1" }}>menu_book</span>
            <span className="text-label-sm">Study</span>
          </Link>
          <Link className="flex flex-col items-center justify-center px-4 py-1 text-on-surface-variant transition-all hover:bg-surface-container-high" href={appRoutes.courseBuilder}>
            <span className="material-symbols-outlined mb-1">folder_open</span>
            <span className="text-label-sm">Files</span>
          </Link>
          <Link className="flex flex-col items-center justify-center px-4 py-1 text-on-surface-variant transition-all hover:bg-surface-container-high" href={appRoutes.learningCommunity}>
            <span className="material-symbols-outlined mb-1">support_agent</span>
            <span className="text-label-sm">Help</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

