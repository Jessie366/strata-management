'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear login cookie
    document.cookie = 'admin_logged_in=; Max-Age=0; path=/';
    // Redirect to homepage
    router.push('/');
  };

  const linkClasses = (path: string) =>
    `px-4 py-2 rounded-md hover:bg-blue-100 transition ${
      pathname === path ? 'bg-blue-600 text-white' : 'text-blue-700'
    }`;

  return (
    <nav className="flex justify-center gap-4 mb-6">
      <Link href="/admin" className={linkClasses('/admin')}>
        Contact Messages
      </Link>
      <Link href="/admin/repair" className={linkClasses('/admin/repair')}>
        Repair Requests
      </Link>
      <button
        onClick={handleLogout}
        className="px-4 py-2 text-red-600 hover:underline border border-red-300 rounded-md"
      >
        Logout
      </button>
    </nav>
  );
}

