// src/app/contact/page.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ContactPage() {
const router = useRouter()
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name || !email || !message) {
      setError("❌ All fields are required.");
      return;
    }

    try {
      const res = await fetch(
        `/api/contact?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&message=${encodeURIComponent(message)}`
      );
      if (res.ok) {
        router.push("/thank-you");
      } else {
        setError("❌ Submission failed. Please try again.");
      }
    } catch (err) {
      setError("❌ An error occurred during submission.");
    }
  };


  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border border-gray-300 rounded-xl shadow-lg bg-white">
      <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Contact Us</h1>
      {submitted ? (
        <div className="text-center text-green-600">
          <p className="text-xl">✅ We have received your message via GET!</p>
          <p>We will get back to you as soon as possible.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={6}
            ></textarea>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Submit via GET
            </button>
          </div>
        </form>
      )}

      {/* ✅ add pure HTML GET */}
      <div className="mt-12 border-t pt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Or try submitting with a raw HTML GET form:</h2>
        <form method="GET" action="/api/submit-get" className="space-y-4">
          <div>
            <label className="block">Name:</label>
            <input type="text" name="name" required className="border px-4 py-2 w-full rounded" />
          </div>
          <div>
            <label className="block">Email:</label>
            <input type="email" name="email" required className="border px-4 py-2 w-full rounded" />
          </div>
          <div>
            <label className="block">Message:</label>
            <textarea name="message" required className="border px-4 py-2 w-full rounded"></textarea>
          </div>
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Submit via HTML GET
          </button>
        </form>
      </div>
    </div>
  );
}
