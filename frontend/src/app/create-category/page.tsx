import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'Create Category | ChemLab 3D',
  description: 'Giao diện tạo danh mục mới theo phong cách ban đầu, tách biệt khỏi bản unified.',
};

export default function CreateCategoryPage() {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <header className="sticky top-0 z-30 border-b-2 border-surface-variant bg-surface/90 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-container-max items-center justify-between px-margin-mobile py-4 md:px-margin-desktop">
          <div>
            <p className="text-xs uppercase tracking-wider text-on-surface-variant">Category Builder</p>
            <h1 className="font-headline-md text-headline-md text-primary">Create New Category</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link className="rounded-full border-2 border-outline-variant px-4 py-2 text-sm" href={appRoutes.courseCategoryManagement}>Back to list</Link>
            <Link className="rounded-full border-2 border-primary-fixed-dim bg-primary px-5 py-2 text-sm font-bold text-on-primary" href={appRoutes.editCategory}>Open Edit Mode</Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-container-max px-margin-mobile py-8 md:px-margin-desktop">
        <div className="grid grid-cols-1 gap-gutter lg:grid-cols-3">
          <section className="lg:col-span-2 rounded-3xl border-2 border-outline-variant/20 bg-surface-container-lowest p-8 shadow-sm">
            <h2 className="mb-6 font-headline-md text-headline-md text-on-surface">Category Information</h2>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Category Name</label>
                <input className="h-14 w-full rounded-2xl border border-outline-variant bg-surface px-5" placeholder="e.g., Inorganic Elements" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Slug</label>
                <input className="h-14 w-full rounded-2xl border border-outline-variant bg-surface px-5" placeholder="inorganic-elements" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Description</label>
                <textarea className="w-full rounded-2xl border border-outline-variant bg-surface px-5 py-4" rows={5} placeholder="Describe what students will learn in this category..." />
              </div>
              <div>
                <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-on-surface-variant">Choose Icon</label>
                <div className="grid grid-cols-6 gap-3">
                  {['science', 'flare', 'biotech', 'water_drop', 'electric_bolt', 'diamond'].map((icon, idx) => (
                    <button
                      key={icon}
                      className={`flex h-14 items-center justify-center rounded-xl border-2 transition-all ${idx === 0 ? 'border-primary bg-primary-fixed text-primary' : 'border-outline-variant bg-surface text-on-surface-variant hover:border-primary/40 hover:text-primary'}`}
                    >
                      <span className="material-symbols-outlined">{icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <section className="rounded-3xl border-2 border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
              <h3 className="mb-4 font-headline-md text-on-surface">Visibility</h3>
              <label className="mb-3 flex items-center gap-3 rounded-xl border-2 border-primary bg-primary-fixed p-3">
                <input type="radio" name="status" defaultChecked />
                <span className="font-label-sm">Draft</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border-2 border-outline-variant p-3">
                <input type="radio" name="status" />
                <span className="font-label-sm">Publish now</span>
              </label>
            </section>

            <section className="rounded-3xl border-2 border-outline-variant/20 bg-surface-container-lowest p-6 shadow-sm">
              <h3 className="mb-4 font-headline-md text-on-surface">Quick actions</h3>
              <div className="space-y-3">
                <button className="w-full rounded-full border-2 border-primary-fixed-dim bg-primary px-4 py-3 font-label-sm text-on-primary">Create Category</button>
                <Link className="block w-full rounded-full border-2 border-outline-variant px-4 py-3 text-center font-label-sm text-on-surface" href={appRoutes.deleteConfirmation}>
                  Open Delete Confirmation
                </Link>
              </div>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
}
