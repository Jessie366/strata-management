import { NextResponse } from 'next/server';

export const config = {
    runtime : "edge",
};

// POST request handler to submit a repair request
export async function POST(request: NextResponse) {
  // Parse the incoming JSON request body
  const data = await request.json();

  // Check if repair description exists in the request body
  if (!data.repairDescription) {
    // If no description is provided, return an error response
    return NextResponse.json({ error: 'Repair description is required' }, { status: 400 });
  }

  // Simulate saving the repair request (you would save this data to a database in a real application)
  const repairRequest = {
    id: Math.random().toString(36).substring(7),  // Generate a random ID for the request
    description: data.repairDescription,
    submittedAt: new Date().toISOString(),  // Current date and time
  };

  // Return success message and the saved repair request
  return NextResponse.json({ message: 'Repair request submitted successfully', repairRequest });
}
