export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 font-sans">
      {/* Main Title */}
      <h1 className="text-3xl font-bold">
        Welcome to the Strata Management Website
      </h1>
      
      {/* Description */}
      <p className="text-lg">
        Here, you can manage the building's common areas, view levy details, post notices, and more.
      </p>

      {/* Management Tasks Section */}
      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Management Tasks</h2>
        <ul className="list-disc pl-6 mt-4">
          {/* List of tasks */}
          <li>View building notices</li>
          <li>View levy details</li>
          <li>Upload files (e.g., PDF documents)</li>
          <li>Manage property-related issues</li>
        </ul>
      </section>

      {/* Footer Section */}
      <footer className="mt-8 text-sm text-center">
        <p>© 2025 Strata Management Platform</p>
      </footer>
    </div>
  );
}
