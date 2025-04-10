import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
    runtime : "edge",
};

// GET request handler to retrieve user's IP address
export async function GET(request : NextRequest) {
  // Retrieve the user's IP address from the headers (This is common for serverless functions)
  const userIp = request.headers.get('x-real-ip') || request.headers.get('x-forwarded-for') || 'Unknown IP';

  // Return the user's IP address as a JSON response
  return NextResponse.json({ ip: userIp });
}
