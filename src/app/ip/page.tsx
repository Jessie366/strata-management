// src/app/ip/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function IpCheckerPage() {
  const [userIp, setUserIp] = useState('');

  useEffect(() => {
    const fetchIp = async () => {
      const response = await fetch('/api/edge-functions/user-ip');
      const data = await response.json();
      setUserIp(data.ip);
    };

    fetchIp();
  }, []);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-xl shadow-md">
      <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">IP Checker</h1>
      <div className="text-center">
        <p className="text-lg text-gray-700">
          Your IP Address:
        </p>
        <p className="text-2xl font-bold text-blue-600 mt-2">
          {userIp || 'Loading...'}
        </p>
      </div>
    </div>
  );
}
