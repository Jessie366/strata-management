import { NextResponse } from 'next/server';
import { isAdminAuthenticated } from '../_auth';

export async function GET() {
  return NextResponse.json({ authenticated: await isAdminAuthenticated() });
}
