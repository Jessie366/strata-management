// src/app/components/Navbar.tsx
'use client';
import React from 'react';
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
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">Strata Management</div>
        <div className="space-x-4">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="hover:text-gray-200">
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
