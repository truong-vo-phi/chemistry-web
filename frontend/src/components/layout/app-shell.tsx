import type { ReactNode } from 'react';

type AppShellProps = {
  title: string;
  subtitle?: string;
  headerActions?: ReactNode;
  children: ReactNode;
};

export default function AppShell({ title, subtitle, headerActions, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <div className="mx-auto w-full max-w-container-max px-margin-mobile py-8 md:px-margin-desktop md:py-10">
        <header className="mb-8 rounded-xl border-2 border-primary-fixed-dim bg-surface-container-lowest p-6 shadow-sm">
          <h1 className="font-display-lg-mobile text-display-lg-mobile text-primary md:font-headline-md md:text-headline-md">
            {title}
          </h1>
          {subtitle ? <p className="mt-3 max-w-3xl text-on-surface-variant">{subtitle}</p> : null}
          {headerActions ? <div className="mt-5 flex flex-wrap gap-3">{headerActions}</div> : null}
        </header>
        {children}
      </div>
    </div>
  );
}
