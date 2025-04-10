import { NextResponse } from 'next/server';

export const config = {
    runtime : "edge",
};

// GET request handler to fetch notices
export async function GET() {
  // Simulating some notice data (you can replace this with actual data from a database)
  const notices = [
    { id: 1, title: 'Building Maintenance Update', date: '2025-04-10' },
    { id: 2, title: 'Levy Payment Reminder', date: '2025-04-12' },
  ];

  // Return notices as JSON response
  return NextResponse.json(notices);
}

