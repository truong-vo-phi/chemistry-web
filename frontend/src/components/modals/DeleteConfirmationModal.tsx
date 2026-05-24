import Link from 'next/link';

import { appRoutes } from '../../config/site-routes';

type DeleteConfirmationModalProps = {
  title?: string;
  categoryName?: string;
  linkedCourses?: number;
  cancelHref?: string;
  confirmLabel?: string;
};

export default function DeleteConfirmationModal({
  title = 'Destruction Sequence',
  categoryName = 'Inorganic Elements',
  linkedCourses = 24,
  cancelHref = appRoutes.editCategory,
  confirmLabel = 'Confirm Destruction',
}: DeleteConfirmationModalProps) {
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-black/30 p-margin-mobile backdrop-blur-xl md:p-margin-desktop">
      <div className="glass-modal relative w-full max-w-[560px] overflow-hidden rounded-lg border border-white/20 shadow-2xl">
        <div className="h-1.5 w-full bg-gradient-to-r from-error via-tertiary to-error/50" />
        <div className="flex flex-col items-center p-gutter text-center">
          <div className="warning-glow relative mb-8 flex h-28 w-28 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-error/10 blur-2xl" />
            <div className="relative flex h-full w-full items-center justify-center rounded-full border-4 border-error bg-error-container shadow-[0_10px_20px_rgba(186,26,26,0.3)]">
              <span className="material-symbols-outlined text-[56px] text-error" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
          </div>

          <h2 className="mb-3 font-headline-md text-3xl tracking-tight text-on-surface">{title}</h2>
          <p className="mb-gutter max-w-sm font-body-lg text-body-lg leading-relaxed text-on-surface-variant">
            Are you certain you wish to purge the <span className="border-b-2 border-error/20 pb-0.5 font-bold text-error">{categoryName}</span> category?
          </p>

          <div className="parchment-texture relative mb-gutter flex w-full items-start gap-4 overflow-hidden rounded-lg border border-tertiary/20 p-6 text-left">
            <span className="material-symbols-outlined relative mt-1 text-2xl text-tertiary">history_edu</span>
            <div className="relative">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-tertiary">Consequence Warning</p>
              <p className="font-body-md text-body-md leading-relaxed text-[#4b4537]">
                This action will unbind <span className="font-bold text-on-surface underline decoration-tertiary/30">{linkedCourses} courses</span> and related records. This cannot be undone.
              </p>
            </div>
          </div>

          <div className="w-full items-center justify-center gap-4 pt-2 sm:flex">
            <Link href={cancelHref} className="button-cancel squishy-button mb-3 block w-full rounded-full px-10 py-3.5 font-label-sm text-label-sm transition-all hover:bg-white/60 sm:mb-0 sm:w-auto">
              Cancel
            </Link>
            <button className="button-confirm squishy-button flex w-full items-center justify-center gap-2 rounded-full px-12 py-3.5 font-label-sm text-label-sm text-white hover:brightness-110 active:brightness-90 sm:w-auto">
              <span className="material-symbols-outlined text-[20px]">delete_forever</span>
              {confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
