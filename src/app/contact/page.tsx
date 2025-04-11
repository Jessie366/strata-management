// src/app/contact/page.tsx

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border border-gray-300 rounded-xl shadow-lg bg-white">
      <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">Contact Us</h1>

      <form method="GET" action="/api/submit-get" className="space-y-6">
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="space-y-2">
          <label className="block font-medium text-gray-700">Message</label>
          <textarea
            name="message"
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
            Submit via GET
          </button>
        </div>
      </form>
    </div>
  );
}
