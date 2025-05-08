export default async function AdminPage() {
  const res = await fetch('https://php-backend-production.up.railway.app/get-contacts.php', {
    cache: 'no-store',
  });

  const contacts = await res.json();

  if (!contacts || contacts.error) {
    return <p className="text-red-600 text-center mt-10">❌ Failed to fetch data.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow rounded-xl border">
      <h1 className="text-3xl font-semibold text-blue-800 mb-6 text-center">📋 Admin Contact Messages</h1>
      <table className="w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Message</th>
            <th className="border p-2">Submitted At</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c: {
            id: number;
            name: string;
            email: string;
            message_new: string;
            submitted_at: string;
          }) => (
            <tr key={c.id} className="text-center">
              <td className="border p-2">{c.id}</td>
              <td className="border p-2">{c.name}</td>
              <td className="border p-2">{c.email}</td>
              <td className="border p-2">{c.message_new}</td>
              <td className="border p-2">{c.submitted_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
