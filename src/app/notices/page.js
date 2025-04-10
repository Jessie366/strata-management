// src/app/notices/page.tsx
'use client';
import React, { useEffect, useState } from 'react';

export default function Notices() {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    async function fetchNotices() {
      const response = await fetch('/api/edge-functions/notices');
      const data = await response.json();
      setNotices(data);
    }

    fetchNotices();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-xl shadow-md">
      <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Notices</h1>
      {notices.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No notices available at the moment.</p>
      ) : (
        <ul className="space-y-4">
          {notices.map((notice) => (
            <li key={notice.id} className="p-4 border-b border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all">
              <h2 className="text-2xl font-semibold text-blue-700">{notice.title}</h2>
              <p className="text-gray-600">Date: {notice.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
