import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'Course Creation - ChemLab 3D',
  description: 'Giao diện tạo và chỉnh sửa khóa học theo kiểu Lab Forge.',
};

export default function CourseCreateEditPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="fixed left-0 top-0 z-40 flex h-20 w-full items-center justify-between border-b-2 border-primary/10 bg-surface/90 px-margin-mobile backdrop-blur-md md:px-margin-desktop">
        <div className="flex items-center gap-4">
          <Link href={appRoutes.courseBuilder} className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-outline-variant bg-surface-container">
            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
          </Link>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary">Lab Forge</h1>
            <p className="font-label-sm text-label-sm text-on-surface-variant">Design a New Experiment</p>
          </div>
        </div>
        <div className="hidden items-center gap-4 md:flex">
          <button className="rounded-full border-2 border-outline-variant bg-surface-container-lowest px-6 py-3 font-label-sm">Save Draft</button>
          <button className="rounded-full border-2 border-primary-fixed-dim bg-primary px-6 py-3 font-label-sm text-on-primary">Publish Experiment</button>
        </div>
      </header>

      <main className="flex justify-center px-margin-mobile pb-12 pt-28 md:px-margin-desktop">
        <div className="grid w-full max-w-container-max grid-cols-1 gap-gutter lg:grid-cols-12">
          <div className="space-y-gutter lg:col-span-8">
            <section className="relative overflow-hidden rounded-lg border-2 border-outline-variant bg-surface-container-lowest p-6 shadow-[0_4px_0_rgba(114,119,133,0.1)] md:p-8">
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-fixed opacity-50 blur-2xl" />
              <h2 className="mb-6 flex items-center gap-2 font-headline-md text-headline-md font-bold text-primary">
                <span className="material-symbols-outlined">menu_book</span>
                Experiment Blueprint
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block font-label-sm text-label-sm">Experiment Title</label>
                  <input className="w-full rounded-full border-2 border-outline-variant bg-surface px-6 py-4" placeholder="e.g., Crystallization 101: Growing Geodes" />
                </div>
                <div>
                  <label className="mb-2 block font-label-sm text-label-sm">Hypothesis & Instructions</label>
                  <textarea className="w-full resize-none rounded border-2 border-outline-variant bg-surface px-6 py-4" rows={4} placeholder="Describe the magical reactions your students will discover..." />
                </div>
                <div>
                  <label className="mb-3 block font-label-sm text-label-sm">Academic Category</label>
                  <div className="flex flex-wrap gap-3">
                    <button className="rounded-full border-2 border-secondary bg-secondary-container px-5 py-2 font-label-sm text-on-secondary-container">Liquid Labs</button>
                    <button className="rounded-full border-2 border-outline-variant bg-surface px-5 py-2 font-label-sm text-on-surface-variant">Thermal Reactions</button>
                    <button className="rounded-full border-2 border-outline-variant bg-surface px-5 py-2 font-label-sm text-on-surface-variant">Crystal Growth</button>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-lg border-2 border-outline-variant bg-surface-container-lowest p-6 shadow-[0_4px_0_rgba(114,119,133,0.1)] md:p-8">
              <h2 className="mb-6 flex items-center gap-2 font-headline-md text-headline-md font-bold text-primary">
                <span className="material-symbols-outlined">image</span>
                2D Lab Preview
              </h2>
              <div className="relative flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-4 border-dashed border-primary/30 bg-surface text-center hover:bg-primary-fixed/20">
                <span className="material-symbols-outlined mb-2 text-4xl text-primary">upload_file</span>
                <p className="font-label-sm text-label-sm">Drag & Drop Cover Image</p>
                <p className="mt-1 text-sm text-on-surface-variant">Supports JPG, PNG (Max 5MB)</p>
                <button className="mt-4 rounded-full border-2 border-primary bg-primary-container px-4 py-2 font-label-sm text-on-primary-container">Browse Files</button>
              </div>
            </section>
          </div>

          <aside className="space-y-gutter lg:col-span-4">
            <section className="rounded-lg border-2 border-outline-variant bg-surface-container-lowest p-6 shadow-[0_4px_0_rgba(114,119,133,0.1)]">
              <h2 className="mb-6 flex items-center gap-2 font-headline-md text-headline-md font-bold text-primary">
                <span className="material-symbols-outlined">settings</span>
                Lab Settings
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="mb-3 block font-label-sm text-label-sm">Difficulty Level</label>
                  <label className="mb-2 flex cursor-pointer items-center gap-3 rounded border-2 border-primary bg-primary-fixed p-3">
                    <input type="radio" name="level" defaultChecked />
                    <span className="font-label-sm">Novice (Beginner)</span>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded border-2 border-outline-variant p-3">
                    <input type="radio" name="level" />
                    <span className="font-label-sm">Apprentice (Intermediate)</span>
                  </label>
                </div>
                <div>
                  <label className="mb-2 block font-label-sm text-label-sm">Access Cost (Gems)</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-tertiary">diamond</span>
                    <input className="w-full rounded-full border-2 border-outline-variant bg-surface py-3 pl-12 pr-6" type="number" min={0} defaultValue={0} />
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-lg border-2 border-secondary bg-secondary-container p-6 text-on-secondary-container shadow-[0_4px_0_#005236]">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-label-sm text-label-sm font-bold">Current Status</h3>
                <span className="rounded-full border-2 border-secondary bg-surface px-3 py-1 text-[12px] font-bold text-secondary">DRAFT</span>
              </div>
              <p className="text-sm">This experiment is hidden from students until you publish it.</p>
              <div className="mt-6 flex flex-col gap-3 md:hidden">
                <button className="rounded-full border-2 border-primary-fixed-dim bg-primary px-6 py-3 font-label-sm text-on-primary">Publish</button>
                <button className="rounded-full border-2 border-outline-variant bg-surface-container-lowest px-6 py-3 font-label-sm text-on-surface">Save Draft</button>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
