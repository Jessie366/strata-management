import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const message = searchParams.get("message");

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  console.log("✅ Contact GET request received:", { name, email, message });

  return NextResponse.json({ message: `Thanks, ${name}! We got your message.` });
}
