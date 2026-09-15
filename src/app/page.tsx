'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Notice {
  id: number;
  title: string;
  date: string;
}

const actions = [
  {
    title: 'Submit a repair',
    description: 'Report maintenance issues and send details to building management.',
    href: '/repair',
  },
  {
    title: 'Contact the team',
    description: 'Ask questions, request documents, or send general feedback.',
    href: '/contact',
  },
  {
    title: 'Read notices',
    description: 'Keep up with building updates and resident announcements.',
    href: '/notices',
  },
];

export default function Home() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const response = await fetch('/api/edge-functions/notices');
        if (response.ok) {
          const data = await response.json();
          setNotices(Array.isArray(data) ? data : []);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchNotices();
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <section className="grid min-h-[520px] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col justify-center px-8 py-12 md:px-12">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-700">
            Resident portal
          </p>
          <h1 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">
            A clearer way to manage building requests.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
            Lodge repairs, contact the strata team, and check community notices from one quiet,
            organized dashboard.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              href="/repair"
            >
              Submit repair
            </Link>
            <Link
              className="rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
              href="/contact"
            >
              Contact management
            </Link>
          </div>
        </div>
        <div className="relative min-h-[320px] bg-slate-100">
          <Image src="/background.jpg" alt="Strata building" fill priority className="object-cover" />
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-slate-950">{action.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{action.description}</p>
          </Link>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Updates
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Building notices</h2>
          </div>
          <Link href="/notices" className="text-sm font-semibold text-cyan-700 hover:text-cyan-900">
            View all notices
          </Link>
        </div>

        <div className="mt-5 divide-y divide-slate-100">
          {isLoading ? (
            <p className="py-4 text-slate-500">Loading notices...</p>
          ) : notices.length > 0 ? (
            notices.slice(0, 4).map((notice) => (
              <div
                key={notice.id}
                className="flex flex-col gap-1 py-4 md:flex-row md:items-center md:justify-between"
              >
                <p className="font-medium text-slate-900">{notice.title}</p>
                <p className="text-sm text-slate-500">{notice.date}</p>
              </div>
            ))
          ) : (
            <p className="py-4 text-slate-500">No notices available.</p>
          )}
        </div>
      </section>
    </div>
  );
}
