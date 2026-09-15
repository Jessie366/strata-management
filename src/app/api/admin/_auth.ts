import { cookies } from 'next/headers';
import { createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'admin_session';
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

function sign(payload: string): string {
  return createHmac('sha256', requiredEnv('ADMIN_SESSION_SECRET'))
    .update(payload)
    .digest('base64url');
}

export function verifyAdminPassword(password: string): boolean {
  const expected = requiredEnv('ADMIN_PASSWORD');
  const expectedBuffer = Buffer.from(expected);
  const providedBuffer = Buffer.from(password);

  if (expectedBuffer.length !== providedBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, providedBuffer);
}

export function createSessionValue(): string {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `admin.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionValue(), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (!value) {
    return false;
  }

  const parts = value.split('.');
  if (parts.length !== 3 || parts[0] !== 'admin') {
    return false;
  }

  const expiresAt = Number(parts[1]);
  if (!Number.isFinite(expiresAt) || expiresAt < Math.floor(Date.now() / 1000)) {
    return false;
  }

  const payload = `${parts[0]}.${parts[1]}`;
  const expected = Buffer.from(sign(payload));
  const provided = Buffer.from(parts[2]);

  if (expected.length !== provided.length) {
    return false;
  }

  return timingSafeEqual(expected, provided);
}

export function backendUrl(path: string): string {
  const base = requiredEnv('BACKEND_URL').replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

export function backendAdminToken(): string {
  return requiredEnv('BACKEND_ADMIN_TOKEN');
}
