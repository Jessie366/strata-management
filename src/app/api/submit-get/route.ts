// src/app/api/submit-get/route.ts

import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get('name');
  const email = searchParams.get('email');

  if (!name || !email) {
    return new NextResponse('Missing required fields', { status: 400 });
  }

  // ✅ deal with the data here
  return NextResponse.redirect(new URL('/thank-you', req.url));
}
