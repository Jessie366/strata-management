'use client';

import AdminNav from '../AdminNav';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type Repair = {
  id: number;
  name: string;
  unit: string;
  description: string;
  submitted_at: string;
};

export default function RepairAdminPage() {
  const [repairs, setRepairs] = useState<Repair[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadRepairs = async () => {
      try {
        const session = await fetch('/api/admin/session', { cache: 'no-store' });
        const sessionData = await session.json();
        if (!sessionData.authenticated) {
          router.push('/admin/login');
          return;
        }

        const response = await fetch('/api/admin/repairs', { cache: 'no-store' });
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch repairs.');
        }

        const data = await response.json();
        setRepairs(Array.isArray(data) ? data : []);
      } catch {
        setError('Could not load repair data.');
      } finally {
        setIsLoading(false);
      }
    };

    loadRepairs();
  }, [router]);

  const latestDate = useMemo(() => repairs[0]?.submitted_at ?? 'No requests yet', [repairs]);

  return (
    <div className="mx-auto min-h-[calc(100vh-88px)] max-w-7xl px-6 py-8">
      <AdminNav />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Open requests</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{repairs.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
          <p className="text-sm font-medium text-slate-500">Latest request</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{latestDate}</p>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-950">Repair requests</h2>
          <p className="mt-1 text-sm text-slate-500">Resident maintenance requests submitted through the repair form.</p>
        </div>

        {isLoading ? (
          <p className="p-6 text-slate-500">Loading repairs...</p>
        ) : error ? (
          <p className="p-6 text-red-600">{error}</p>
        ) : repairs.length === 0 ? (
          <p className="p-6 text-slate-500">No repair requests found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Resident</th>
                  <th className="px-5 py-3">Unit</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {repairs.map((repair) => (
                  <tr key={repair.id} className="align-top">
                    <td className="px-5 py-4 font-medium text-slate-950">{repair.name}</td>
                    <td className="px-5 py-4 text-slate-600">{repair.unit}</td>
                    <td className="max-w-md px-5 py-4 text-slate-700">{repair.description}</td>
                    <td className="px-5 py-4 text-slate-500">{repair.submitted_at}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
