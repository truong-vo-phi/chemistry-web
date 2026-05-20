'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import SiteFooter from '../../../components/layout/site-footer';
import SiteHeader from '../../../components/layout/site-header';
import { appRoutes } from '../../../config/site-routes';
import { login } from '../../../lib/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login({ email, password });
      router.push(appRoutes.profile);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Dang nhap that bai');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onUndo = () => {
    setEmail('');
    setPassword('');
    setError('');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-container-max flex-1 items-center px-margin-mobile py-12 md:px-margin-desktop">
        <section className="mx-auto w-full max-w-xl rounded-xl border-2 border-surface-variant bg-surface-container-lowest p-8">
          <h1 className="font-headline-md text-headline-md text-on-surface">Dang nhap</h1>
          <p className="mt-2 text-on-surface-variant">Su dung email va mat khau de vao he thong.</p>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <input
              className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3"
              type="password"
              placeholder="Mat khau"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {error ? <p className="text-sm text-error">{error}</p> : null}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full border-2 border-primary bg-primary px-5 py-3 font-label-sm text-label-sm text-on-primary disabled:opacity-60"
              >
                {isSubmitting ? 'Dang xu ly...' : 'Dang nhap'}
              </button>
              <button type="button" onClick={onUndo} className="rounded-full border-2 border-outline-variant px-5 py-3 font-label-sm text-label-sm text-on-surface-variant">
                Undo
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-on-surface-variant">
            Chua co tai khoan?{' '}
            <Link href={appRoutes.register} className="text-primary hover:underline">
              Dang ky ngay
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
