// app/contact/page.tsx

"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      {submitted ? (
        <p className="text-green-600">We have received your message!</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name</label>
            <input type="text" required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium">Email</label>
            <input type="email" required className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block font-medium">Message</label>
            <textarea required className="w-full border rounded px-3 py-2" rows={4}></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}
