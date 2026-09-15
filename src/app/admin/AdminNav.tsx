'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const linkClasses = (path: string) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      pathname === path
        ? 'bg-slate-950 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
    }`;

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">Admin</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-950">Strata dashboard</h1>
      </div>
      <nav className="flex flex-wrap items-center gap-2">
        <Link href="/admin" className={linkClasses('/admin')}>
          Contact messages
        </Link>
        <Link href="/admin/repair" className={linkClasses('/admin/repair')}>
          Repair requests
        </Link>
        <button
          onClick={handleLogout}
          className="rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-50"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
