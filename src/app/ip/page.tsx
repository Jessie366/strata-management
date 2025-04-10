// app/ip/page.tsx
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
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">IP Checker</h1>
      <p>Your IP Address: {userIp || 'Loading...'}</p>
    </div>
  );
}
