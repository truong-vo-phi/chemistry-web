'use client';

import Link from 'next/link';
import { useState } from 'react';

import SiteFooter from '../../../components/layout/site-footer';
import SiteHeader from '../../../components/layout/site-header';
import { appRoutes } from '../../../config/site-routes';
import { changeMyPassword } from '../../../lib/auth';

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setStatus('');

    if (newPassword !== confirmPassword) {
      setError('Mat khau moi khong khop');
      return;
    }

    try {
      await changeMyPassword({ currentPassword, newPassword });
      setStatus('Da doi mat khau thanh cong');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Doi mat khau that bai');
    }
  };

  const onUndo = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setStatus('');
    setError('');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-container-max flex-1 items-center px-margin-mobile py-12 md:px-margin-desktop">
        <section className="mx-auto w-full max-w-xl rounded-xl border-2 border-surface-variant bg-surface-container-lowest p-8">
          <h1 className="font-headline-md text-headline-md text-on-surface">Doi mat khau</h1>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <input className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3" type="password" placeholder="Mat khau hien tai" required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
            <input className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3" type="password" placeholder="Mat khau moi" required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
            <input className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3" type="password" placeholder="Xac nhan mat khau moi" required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
            {status ? <p className="text-sm text-secondary">{status}</p> : null}
            {error ? <p className="text-sm text-error">{error}</p> : null}
            <div className="flex gap-3">
              <button type="submit" className="rounded-full border-2 border-primary bg-primary px-5 py-3 font-label-sm text-label-sm text-on-primary">
                Cap nhat mat khau
              </button>
              <button type="button" onClick={onUndo} className="rounded-full border-2 border-outline-variant px-5 py-3 font-label-sm text-label-sm text-on-surface-variant">
                Undo
              </button>
            </div>
          </form>
          <Link href={appRoutes.profile} className="mt-4 inline-flex text-sm text-primary hover:underline">
            Quay lai ho so
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
