import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'Course Category Management | ChemLab 3D',
  description: 'Màn hình quản lý danh mục khóa học theo giao diện chức năng riêng.',
};

const categories = [
  { name: 'Inorganic', courses: 24, status: 'Active', color: 'bg-primary-fixed text-primary' },
  { name: 'Organic', courses: 17, status: 'Active', color: 'bg-secondary-container/40 text-secondary' },
  { name: 'Physical Chem', courses: 12, status: 'Review', color: 'bg-tertiary-fixed/40 text-tertiary' },
  { name: 'Lab Skills', courses: 9, status: 'Draft', color: 'bg-error-container text-error' },
];

export default function CourseCategoryManagementPage() {
  return (
    <div className="min-h-screen bg-background text-on-surface">
      <header className="sticky top-0 z-30 border-b-2 border-surface-variant bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-container-max items-center justify-between px-margin-mobile py-4 md:px-margin-desktop">
          <div>
            <p className="text-xs uppercase tracking-wider text-on-surface-variant">Course Admin</p>
            <h1 className="font-headline-md text-headline-md text-primary">Course Category Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href={appRoutes.theoryCourseLibrary} className="rounded-full border-2 border-outline-variant px-4 py-2 text-sm">Back to Library</Link>
            <Link href={appRoutes.createCategory} className="rounded-full border-2 border-primary-fixed-dim bg-primary px-5 py-2 text-sm font-bold text-on-primary">Create Category</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-container-max grid-cols-1 gap-gutter px-margin-mobile py-8 md:px-margin-desktop lg:grid-cols-12">
        <section className="lg:col-span-8 rounded-3xl border-2 border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-headline-md text-on-surface">Danh mục hiện có</h2>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input className="rounded-full border-2 border-outline-variant bg-surface py-2 pl-10 pr-4" placeholder="Tìm danh mục..." />
            </div>
          </div>

          <div className="space-y-3">
            {categories.map((item) => (
              <article key={item.name} className="flex items-center justify-between rounded-2xl border border-outline-variant/20 bg-white p-4">
                <div>
                  <h3 className="font-label-sm text-on-surface">{item.name}</h3>
                  <p className="text-sm text-on-surface-variant">{item.courses} courses linked</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${item.color}`}>{item.status}</span>
                  <Link href={appRoutes.editCategory} className="rounded-full border border-outline-variant px-3 py-1 text-sm">Edit</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="space-y-gutter lg:col-span-4">
          <section className="rounded-3xl border-2 border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
            <h3 className="mb-4 font-headline-md text-on-surface">Actions</h3>
            <div className="space-y-3">
              <Link href={appRoutes.createCategory} className="block rounded-full border-2 border-primary-fixed-dim bg-primary px-4 py-3 text-center font-label-sm text-on-primary">Add New Category</Link>
              <Link href={appRoutes.editCategory} className="block rounded-full border-2 border-outline-variant px-4 py-3 text-center font-label-sm">Open Category Editor</Link>
              <Link href={appRoutes.deleteConfirmation} className="block rounded-full border-2 border-error/30 bg-error-container/50 px-4 py-3 text-center font-label-sm text-error">Open Delete Confirm</Link>
            </div>
          </section>

          <section className="rounded-3xl border-2 border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
            <h3 className="mb-4 font-headline-md text-on-surface">Summary</h3>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl border border-primary/20 bg-primary-fixed/30 p-4">
                <p className="text-xs uppercase text-on-surface-variant">Categories</p>
                <p className="text-2xl font-bold text-primary">12</p>
              </div>
              <div className="rounded-2xl border border-secondary/20 bg-secondary-container/20 p-4">
                <p className="text-xs uppercase text-on-surface-variant">Courses</p>
                <p className="text-2xl font-bold text-secondary">62</p>
              </div>
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
