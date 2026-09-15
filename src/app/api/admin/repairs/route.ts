import { NextResponse } from 'next/server';
import { backendAdminToken, backendUrl, isAdminAuthenticated } from '../_auth';

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  const response = await fetch(backendUrl('get_repairs.php'), {
    headers: {
      Authorization: `Bearer ${backendAdminToken()}`,
    },
    cache: 'no-store',
  });

  const data = await response.json().catch(() => ({ error: 'Invalid backend response.' }));
  return NextResponse.json(data, { status: response.status });
}
