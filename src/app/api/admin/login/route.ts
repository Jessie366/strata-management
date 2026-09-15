import { NextResponse } from 'next/server';
import { setAdminSession, verifyAdminPassword } from '../_auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!verifyAdminPassword(password)) {
    return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 });
  }

  await setAdminSession();
  return NextResponse.json({ ok: true });
}
