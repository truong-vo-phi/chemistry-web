import type { Metadata } from 'next';
import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

export const metadata: Metadata = {
  title: 'ChemLab 3D - Course Builder',
  description: 'Full view trình xây dựng khóa học với curriculum và content block editor.',
};

export default function CourseBuilderPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-surface font-body-md text-body-md text-on-surface">
      <nav className="hidden h-full w-64 flex-shrink-0 flex-col border-r-2 border-primary/10 bg-surface-container py-6 shadow-md md:flex">
        <div className="mb-8 flex items-center gap-3 px-6">
          <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-primary bg-primary-container" />
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary">ChemLab 3D</h1>
            <span className="text-xs text-on-surface-variant">Novice Alchemist</span>
          </div>
        </div>
        <div className="editor-scroll flex flex-1 flex-col gap-2 overflow-y-auto">
          <Link className="mx-2 rounded-lg p-3 text-on-surface-variant hover:bg-surface-variant" href={appRoutes.launch3dLab}>Alchemy Lab</Link>
          <Link className="mx-2 rounded-lg p-3 text-on-surface-variant hover:bg-surface-variant" href={appRoutes.learningPathway}>Quests</Link>
          <Link className="mx-2 rounded-lg bg-secondary-container p-3 font-bold text-on-secondary-container" href={appRoutes.theoryCourseLibrary}>Library</Link>
          <Link className="mx-2 rounded-lg p-3 text-on-surface-variant hover:bg-surface-variant" href={appRoutes.courseBuilder}>Builder</Link>
        </div>
        <div className="mt-auto border-t-2 border-primary/10 px-4 pt-6">
          <Link className="mb-4 flex w-full items-center justify-center gap-2 rounded-full border-2 border-on-primary-fixed-variant bg-primary py-3 font-label-sm text-on-primary" href={appRoutes.courseCreateEdit}>
            <span className="material-symbols-outlined text-sm">play_arrow</span>
            Start Experiment
          </Link>
        </div>
      </nav>

      <div className="flex h-full flex-1 flex-col bg-surface">
        <header className="flex h-16 flex-shrink-0 items-center justify-between border-b-2 border-outline-variant/30 bg-surface/80 px-6 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm font-label-sm">
            <Link className="flex items-center gap-1 text-on-surface-variant hover:text-primary" href={appRoutes.theoryCourseLibrary}>
              <span className="material-symbols-outlined text-[18px]">menu_book</span>Library
            </Link>
            <span className="material-symbols-outlined text-outline text-[16px]">chevron_right</span>
            <span className="flex items-center gap-1 font-bold text-primary">
              <span className="material-symbols-outlined text-[18px]">edit_document</span>Spellbook Editor
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="mr-2 flex items-center gap-1 text-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[14px]">cloud_done</span>Saved just now
            </span>
            <button className="rounded-full border-2 border-outline-variant bg-surface px-5 py-2 text-sm font-label-sm">Save Draft</button>
            <button className="flex items-center gap-2 rounded-full border-2 border-secondary-fixed bg-secondary px-5 py-2 text-sm font-label-sm text-on-secondary">
              <span className="material-symbols-outlined text-[18px]">publish</span>Publish
            </button>
          </div>
        </header>

        <main className="flex flex-1 gap-6 overflow-hidden p-6">
          <section className="relative flex w-1/3 max-w-[400px] flex-col overflow-hidden rounded-[2rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-sm">
            <div className="flex items-center justify-between border-b border-surface-variant p-5">
              <h2 className="flex items-center gap-2 font-headline-md text-xl">
                <span className="material-symbols-outlined text-primary">view_timeline</span>Curriculum
              </h2>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-secondary bg-secondary-container text-on-secondary-container">
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
            <div className="editor-scroll flex-1 space-y-6 overflow-y-auto p-5">
              <div>
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-surface-container-lowest bg-primary text-sm font-bold text-on-primary">1</div>
                  <h4 className="flex-1 font-label-sm">Introduction to Potions</h4>
                </div>
                <div className="ml-10 flex flex-col gap-2">
                  <div className="rounded-xl border-2 border-primary/20 bg-primary-fixed/40 p-2">
                    <span className="text-sm font-semibold">Safety First</span>
                    <p className="text-xs text-on-surface-variant">Text & Interactive</p>
                  </div>
                  <div className="rounded-xl border-2 border-transparent p-2 hover:bg-surface-variant/50">
                    <span className="text-sm text-on-surface-variant">Water Properties</span>
                    <p className="text-xs text-outline">Video</p>
                  </div>
                  <button className="w-fit rounded-lg border border-dashed border-primary/30 px-3 py-2 text-xs font-label-sm text-primary">Add Lesson</button>
                </div>
              </div>
            </div>
          </section>

          <section className="relative flex flex-1 flex-col overflow-hidden rounded-[2rem] border-2 border-outline-variant/30 bg-surface-container-lowest shadow-sm">
            <div className="border-b border-surface-variant bg-surface-container-lowest/90 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <span className="mb-2 inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary-fixed/50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-on-primary-container">
                    <span className="material-symbols-outlined text-[14px]">article</span>Lesson 1.1
                  </span>
                  <h2 className="text-2xl font-headline-md text-on-surface">Safety First</h2>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-variant"><span className="material-symbols-outlined">visibility</span></button>
                  <button className="rounded-lg p-2 text-on-surface-variant hover:bg-surface-variant"><span className="material-symbols-outlined">settings</span></button>
                </div>
              </div>
            </div>

            <div className="editor-scroll flex-1 space-y-6 overflow-y-auto bg-surface/50 p-8">
              <article className="rounded-2xl border-2 border-surface-variant bg-surface-container-lowest shadow-sm">
                <div className="flex items-center justify-between rounded-t-xl border-b border-surface-variant bg-surface-container-low px-4 py-2">
                  <div className="flex items-center gap-2 text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px]">format_align_left</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Text Block</span>
                  </div>
                  <button className="rounded p-1 hover:bg-surface"><span className="material-symbols-outlined text-[16px]">delete</span></button>
                </div>
                <div className="p-6 text-sm leading-7 text-on-surface">
                  <p>Welcome to your first day in the laboratory! Before we begin mixing volatile substances, it&apos;s crucial to understand the fundamental rules of safety.</p>
                  <p className="mt-4">Remember the golden rule: Never add water to acid, unless you want a rapid, unscheduled exothermic reaction!</p>
                </div>
              </article>

              <article className="rounded-2xl border-2 border-secondary/20 bg-surface-container-lowest shadow-sm">
                <div className="flex items-center justify-between rounded-t-xl border-b border-secondary/20 bg-secondary-container/20 px-4 py-2">
                  <div className="flex items-center gap-2 text-secondary">
                    <span className="material-symbols-outlined text-[18px]">extension</span>
                    <span className="text-xs font-bold uppercase tracking-wider">Interactive: Drag & Drop</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-outline-variant/50 bg-surface">
                    <span className="material-symbols-outlined mb-2 rounded-full bg-secondary-container p-2 text-3xl text-secondary">touch_app</span>
                    <span className="text-sm font-label-sm">Match Safety Gear Activity</span>
                    <span className="mt-1 text-xs text-outline">Configure Interaction Settings</span>
                  </div>
                </div>
              </article>

              <div className="flex justify-center pb-12">
                <button className="flex items-center gap-2 rounded-full border-2 border-dashed border-primary/40 bg-surface px-6 py-3 font-label-sm text-primary">
                  <span className="material-symbols-outlined">add</span>Add Content Block
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
