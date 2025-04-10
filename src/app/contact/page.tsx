// src/app/contact/page.tsx

"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border border-gray-300 rounded-xl shadow-lg bg-white">
      <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Contact Us</h1>
      {submitted ? (
        <div className="text-center text-green-600">
          <p className="text-xl">We have received your message!</p>
          <p>We will get back to you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Message</label>
            <textarea
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
            ></textarea>
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
