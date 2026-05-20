'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { appRoutes } from '../../config/site-routes';
import { getSession, logout, type AuthSession } from '../../lib/auth';

export default function SiteHeader() {
  const [session, setSession] = useState<AuthSession | null>(null);

  useEffect(() => {
    const syncSession = () => setSession(getSession());
    syncSession();

    window.addEventListener('auth-session-changed', syncSession);
    window.addEventListener('storage', syncSession);

    return () => {
      window.removeEventListener('auth-session-changed', syncSession);
      window.removeEventListener('storage', syncSession);
    };
  }, []);

  const onLogout = async () => {
    await logout();
    setSession(null);
  };

  return (
    <div className="relative z-50 mx-auto w-full max-w-[1296px] px-margin-mobile md:px-margin-desktop">
      <header className="mx-auto mt-4 flex w-full max-w-container-max items-center justify-between rounded-lg border-2 border-surface-variant bg-surface px-gutter py-unit shadow-sm">
        <Link
          href={appRoutes.home}
          className="flex cursor-pointer items-center gap-2 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-fixed-variant bg-primary-container shadow-[2px_2px_0px_0px_rgba(0,67,149,0.3)]">
            <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
              science
            </span>
          </div>
          <span className="font-headline-md text-headline-md font-bold tracking-tight text-primary">ChemLab 3D</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link className="font-body-md text-body-md font-medium text-on-surface-variant hover:text-primary" href={appRoutes.learningPathway}>
            Kham pha
          </Link>
          <Link className="font-body-md text-body-md font-medium text-on-surface-variant hover:text-primary" href={appRoutes.periodicTable}>
            Bang Tuan Hoan
          </Link>
          <Link className="font-body-md text-body-md font-medium text-on-surface-variant hover:text-primary" href={appRoutes.theoryCourseLibrary}>
            Khoa hoc
          </Link>
          <Link className="font-body-md text-body-md font-medium text-on-surface-variant hover:text-primary" href={appRoutes.scienceNewsBlog}>
            Tin tuc
          </Link>
        </nav>

        {session ? (
          <div className="flex items-center gap-3">
            <Link
              href={appRoutes.profile}
              className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-tertiary-fixed-dim bg-tertiary-container"
              aria-label="Avatar tài khoản"
            >
              {session.user.avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.avatarUrl} alt={session.user.fullName} className="h-full w-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-on-tertiary-container">person</span>
              )}
            </Link>
            <Link
              href={appRoutes.profile}
              className="hidden rounded-full border-2 border-outline-variant px-4 py-2 font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-high md:inline-flex"
            >
              {session.user.fullName}
            </Link>
            <button
              type="button"
              onClick={onLogout}
              className="rounded-full border-2 border-primary bg-primary px-4 py-2 font-label-sm text-label-sm text-on-primary"
            >
              Dang xuat
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href={appRoutes.register}
              className="rounded-full border-2 border-outline-variant px-4 py-2 font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-high"
            >
              Dang ky
            </Link>
            <Link href={appRoutes.login} className="rounded-full border-2 border-primary bg-primary px-4 py-2 font-label-sm text-label-sm text-on-primary">
              Dang nhap
            </Link>
          </div>
        )}
      </header>
    </div>
  );
}
