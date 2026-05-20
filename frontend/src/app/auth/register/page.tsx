'use client';

import Link from 'next/link';
import { useState } from 'react';

import SiteFooter from '../../../components/layout/site-footer';
import SiteHeader from '../../../components/layout/site-header';
import { appRoutes } from '../../../config/site-routes';
import { register } from '../../../lib/auth';

export default function RegisterPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      const result = await register({ fullName, email, phone, password });
      setMessage(result.message || 'Dang ky thanh cong. Tai khoan dang o trang thai Guest cho duyet.');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Dang ky that bai');
    } finally {
      setIsSubmitting(false);
    }
  };

  const onUndo = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setMessage('');
    setError('');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-container-max flex-1 items-center px-margin-mobile py-12 md:px-margin-desktop">
        <section className="mx-auto w-full max-w-xl rounded-xl border-2 border-surface-variant bg-surface-container-lowest p-8">
          <h1 className="font-headline-md text-headline-md text-on-surface">Dang ky tai khoan Guest</h1>
          <p className="mt-2 text-on-surface-variant">Tai khoan moi duoc tao se la Guest cho den khi duoc duyet bien che.</p>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
            <input className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3" type="text" placeholder="Ho va ten" required value={fullName} onChange={(event) => setFullName(event.target.value)} />
            <input className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3" type="email" placeholder="Email" required value={email} onChange={(event) => setEmail(event.target.value)} />
            <input className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3" type="tel" placeholder="So dien thoai" required value={phone} onChange={(event) => setPhone(event.target.value)} />
            <input className="rounded-xl border-2 border-surface-variant bg-surface px-4 py-3" type="password" placeholder="Mat khau" required value={password} onChange={(event) => setPassword(event.target.value)} />
            {message ? <p className="text-sm text-secondary">{message}</p> : null}
            {error ? <p className="text-sm text-error">{error}</p> : null}
            <div className="flex gap-3">
              <button type="submit" disabled={isSubmitting} className="rounded-full border-2 border-primary bg-primary px-5 py-3 font-label-sm text-label-sm text-on-primary disabled:opacity-60">
                {isSubmitting ? 'Dang xu ly...' : 'Tao tai khoan'}
              </button>
              <button type="button" onClick={onUndo} className="rounded-full border-2 border-outline-variant px-5 py-3 font-label-sm text-label-sm text-on-surface-variant">
                Undo
              </button>
            </div>
          </form>
          <p className="mt-4 text-sm text-on-surface-variant">
            Da co tai khoan?{' '}
            <Link href={appRoutes.login} className="text-primary hover:underline">
              Dang nhap
            </Link>
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
