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
    <div>
      <h1>Notices</h1>
      {notices.length === 0 ? (
        <p>No notices available at the moment.</p>
      ) : (
        <ul>
          {notices.map((notice) => (
            <li key={notice.id}>
              <h2>{notice.title}</h2>
              <p>Date: {notice.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
