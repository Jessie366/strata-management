'use client';

import AdminNav from './AdminNav';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type Contact = {
  id: number;
  name: string;
  email: string;
  message_new: string;
  submitted_at: string;
};

export default function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadContacts = async () => {
      try {
        const session = await fetch('/api/admin/session', { cache: 'no-store' });
        const sessionData = await session.json();
        if (!sessionData.authenticated) {
          router.push('/admin/login');
          return;
        }

        const response = await fetch('/api/admin/contacts', { cache: 'no-store' });
        if (response.status === 401) {
          router.push('/admin/login');
          return;
        }
        if (!response.ok) {
          throw new Error('Failed to fetch contacts.');
        }

        const data = await response.json();
        setContacts(Array.isArray(data) ? data : []);
      } catch {
        setError('Could not load contact data.');
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, [router]);

  const latestDate = useMemo(() => contacts[0]?.submitted_at ?? 'No messages yet', [contacts]);

  return (
    <div className="mx-auto min-h-[calc(100vh-88px)] max-w-7xl px-6 py-8">
      <AdminNav />

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total messages</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950">{contacts.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:col-span-2">
          <p className="text-sm font-medium text-slate-500">Latest submission</p>
          <p className="mt-2 text-lg font-semibold text-slate-950">{latestDate}</p>
        </div>
      </section>

      <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-lg font-semibold text-slate-950">Contact messages</h2>
          <p className="mt-1 text-sm text-slate-500">Messages submitted through the public contact form.</p>
        </div>

        {isLoading ? (
          <p className="p-6 text-slate-500">Loading contacts...</p>
        ) : error ? (
          <p className="p-6 text-red-600">{error}</p>
        ) : contacts.length === 0 ? (
          <p className="p-6 text-slate-500">No contact messages found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Message</th>
                  <th className="px-5 py-3">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {contacts.map((contact) => (
                  <tr key={contact.id} className="align-top">
                    <td className="px-5 py-4 font-medium text-slate-950">{contact.name}</td>
                    <td className="px-5 py-4 text-slate-600">{contact.email}</td>
                    <td className="max-w-md px-5 py-4 text-slate-700">{contact.message_new}</td>
                    <td className="px-5 py-4 text-slate-500">{contact.submitted_at}</td>
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
