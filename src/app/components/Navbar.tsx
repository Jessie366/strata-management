// src/app/components/Navbar.tsx
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Notices', href: '/notices' },
  { name: 'Repair Request', href: '/repair' },
  { name: 'IP Checker', href: '/ip' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'About Us', href: '/about' },
];

const Navbar = () => {
  const [isClient, setIsClient] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Ensure this only runs on client side
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      const loggedIn = document.cookie.includes('admin_logged_in=true');
      setIsAdmin(loggedIn);
    }
  }, []);

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Strata Management</div>
        <div className="space-x-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="hover:text-gray-200 font-medium">
              {item.name}
            </Link>
          ))}
          {/* Show only when on client and logged in */}
          {isClient && isAdmin && (
            <Link href="/admin" className="hover:text-gray-200 font-semibold">
              Administration
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
