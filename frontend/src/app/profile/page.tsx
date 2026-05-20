'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import SiteFooter from '../../components/layout/site-footer';
import SiteHeader from '../../components/layout/site-header';
import { appRoutes } from '../../config/site-routes';
import { fetchMyProfile, getSession, type UserProfile, updateMyProfile } from '../../lib/auth';

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [initialProfile, setInitialProfile] = useState<{ fullName: string; phone: string; avatarUrl: string } | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) return;

    setProfile(session.user);
    setFullName(session.user.fullName);
    setPhone(session.user.phone ?? '');
    setAvatarUrl(session.user.avatarUrl ?? '');
    setInitialProfile({
      fullName: session.user.fullName,
      phone: session.user.phone ?? '',
      avatarUrl: session.user.avatarUrl ?? '',
    });

    fetchMyProfile()
      .then((nextProfile) => {
        setProfile(nextProfile);
        setFullName(nextProfile.fullName);
        setPhone(nextProfile.phone ?? '');
        setAvatarUrl(nextProfile.avatarUrl ?? '');
        setInitialProfile({
          fullName: nextProfile.fullName,
          phone: nextProfile.phone ?? '',
          avatarUrl: nextProfile.avatarUrl ?? '',
        });
      })
      .catch(() => undefined);
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setStatus('');

    try {
      const updated = await updateMyProfile({ fullName, phone, avatarUrl });
      setProfile(updated);
      setStatus('Da cap nhat ho so');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Cap nhat that bai');
    }
  };

  const onUndo = () => {
    if (!initialProfile) return;
    setFullName(initialProfile.fullName);
    setPhone(initialProfile.phone);
    setAvatarUrl(initialProfile.avatarUrl);
    setStatus('');
    setError('');
  };

  if (!profile) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-container-max flex-1 items-center justify-center px-margin-mobile py-12 md:px-margin-desktop">
          <div className="rounded-xl border-2 border-surface-variant bg-surface-container-lowest p-8 text-center">
            <p className="text-on-surface-variant">Ban can dang nhap de xem ho so.</p>
            <Link href={appRoutes.login} className="mt-4 inline-flex rounded-full border-2 border-primary bg-primary px-4 py-2 font-label-sm text-label-sm text-on-primary">
              Dang nhap
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-container-max flex-1 px-margin-mobile py-12 md:px-margin-desktop">
        <section className="w-full rounded-xl border-2 border-surface-variant bg-surface-container-lowest p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="font-headline-md text-headline-md text-on-surface">Ho so ca nhan</h1>
              <p className="text-on-surface-variant">Vai tro: {profile.role.toUpperCase()} - {profile.approved ? 'Da duyet' : 'Guest chua duyet'}</p>
            </div>
            <Link href={appRoutes.changePassword} className="rounded-full border-2 border-outline-variant px-4 py-2 font-label-sm text-label-sm text-on-surface-variant hover:bg-surface-container-high">
              Doi mat khau
            </Link>
          </div>

          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <input className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3" type="text" placeholder="Ho va ten" required value={fullName} onChange={(event) => setFullName(event.target.value)} />
            <input className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3" type="email" value={profile.email} disabled />
            <input className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3" type="tel" placeholder="So dien thoai" value={phone} onChange={(event) => setPhone(event.target.value)} />
            <input className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3" type="url" placeholder="Link avatar" value={avatarUrl} onChange={(event) => setAvatarUrl(event.target.value)} />
            <div className="md:col-span-2">
              {status ? <p className="text-sm text-secondary">{status}</p> : null}
              {error ? <p className="text-sm text-error">{error}</p> : null}
              <div className="mt-3 flex gap-3">
                <button type="submit" className="rounded-full border-2 border-primary bg-primary px-5 py-3 font-label-sm text-label-sm text-on-primary">
                  Luu thay doi
                </button>
                <button type="button" onClick={onUndo} className="rounded-full border-2 border-outline-variant px-5 py-3 font-label-sm text-label-sm text-on-surface-variant">
                  Undo
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
