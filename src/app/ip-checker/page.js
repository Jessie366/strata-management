'use client';

import React, { useEffect, useState } from 'react';

export default function UserIp() {
  const [userIp, setUserIp] = useState('');

  useEffect(() => {
    async function fetchUserIp() {
      const response = await fetch('/api/edge-functions/user-ip');
      const data = await response.json();
      setUserIp(data.ip);
    }

    fetchUserIp();
  }, []);

  return (
    <div>
      <h1>Your IP Address</h1>
      <p>{userIp ? `Your IP address is: ${userIp}` : "Fetching IP address..."}</p>
    </div>
  );
}
