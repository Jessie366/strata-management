import { useEffect, useState } from "react";

export default function Home() {
  const [notices, setNotices] = useState<any[]>([]);  // State to store the notices
  const [isLoading, setIsLoading] = useState<boolean>(true);  // Loading state
  const [error, setError] = useState<string | null>(null);  // Error state

  // Fetch notices data when the component is mounted
  useEffect(() => {
    async function fetchNotices() {
      try {
        const response = await fetch("/api/notices");  // Make sure this API path is correct
        if (response.ok) {
          const data = await response.json();
          setNotices(data);  // Store the fetched notices
        } else {
          setError("Failed to fetch notices");
        }
      } catch (error) {
        setError("An error occurred while fetching notices.");
      } finally {
        setIsLoading(false);  // Data fetching is complete
      }
    }
    fetchNotices();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 font-sans">
       {/* Image */}
       <img src="/background.jpg" alt="Background" className="w-full max-w-md h-auto rounded-lg shadow-lg" />

       {/* Main Title */}
      <h1 className="text-3xl font-bold">
        Welcome to the Strata Management Website
      </h1>

      {/* Description */}
      <p className="text-lg">
        Here, you can manage the building&apos;s common areas, view levy details, post notices, and more.
      </p>

      {/* Management Tasks Section */}
      <section className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold">Management Tasks</h2>
        <ul className="list-disc pl-6 mt-4 text-gray-600">
          {/* List of tasks */}
          <li>View building notices</li>
          <li>View levy details</li>
          <li>Upload files (e.g., PDF documents)</li>
          <li>Manage property-related issues</li>
        </ul>
      </section>

      {/* Notices List Section */}
      <section className="mt-8 bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h2 className="text-2xl font-semibold">Building Notices</h2>
        
        {/* New Section: Display fetched notices */}
        {isLoading ? (
          <p>Loading...</p>  // Display loading message
        ) : error ? (
          <p className="text-red-500">{error}</p>  // Display error message if fetching fails
        ) : notices.length > 0 ? (
          <ul className="list-disc pl-6 mt-4 text-gray-600">
            {notices.map((notice: any) => (
              <li key={notice.id}>
                <strong>{notice.title}</strong> - {notice.date}
              </li>
            ))}
          </ul>
        ) : (
          <p>No notices available</p>  // Display message if no notices are available
        )}
      </section>

      {/* Footer Section */}
      <footer className="mt-8 text-sm text-center">
        <p>© 2025 Strata Management Platform</p>
      </footer>
    </div>
  );
}
