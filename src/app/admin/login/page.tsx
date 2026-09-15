'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError('Incorrect password.');
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-88px)] max-w-6xl items-center px-6 py-12">
      <section className="grid w-full overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl md:grid-cols-[1.1fr_0.9fr]">
        <div className="bg-slate-950 px-8 py-10 text-white md:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Admin console</p>
          <h1 className="mt-5 text-4xl font-semibold leading-tight">Secure access for strata operations.</h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-300">
            Contact messages and repair requests are served through protected server-side API routes. The admin password is no longer shipped to the browser.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-slate-200">
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">HttpOnly session cookie</div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">Backend bearer token stays server-side</div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">Admin tables require live authentication</div>
          </div>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col justify-center px-8 py-10 md:px-12">
          <p className="text-sm font-medium text-slate-500">Welcome back</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-950">Sign in</h2>
          <label className="mt-8 text-sm font-medium text-slate-700" htmlFor="admin-password">
            Admin password
          </label>
          <input
            id="admin-password"
            type="password"
            autoComplete="current-password"
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </section>
    </div>
  );
}
