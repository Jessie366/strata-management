'use client';

import React from 'react';

export default function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 font-sans">
      <h1 className="text-3xl font-bold text-blue-800">About Us</h1>

      <p className="text-lg text-gray-700">
        Welcome to our Strata Management platform. We are committed to providing
        seamless management for your building&apos;s common areas, maintenance,
        and notices.
      </p>

      <section className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-blue-600">Our Mission</h2>
        <p className="text-gray-600 mt-4">
          Our mission is to simplify strata management and make the lives of
          property owners and tenants easier through efficient tools and services.
        </p>
      </section>

      {/* Other content about the platform */}

      <footer className="mt-8 text-sm text-center text-gray-500">
        <p>© 2025 Strata Management Platform</p>
      </footer>
    </div>
  );
}
