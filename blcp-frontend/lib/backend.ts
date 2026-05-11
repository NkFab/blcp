import { cookies } from 'next/headers';
import type { BackendUser, SafeUser } from './types';

const API_BASE = process.env.BACKEND_URL || 'http://localhost:3001/api/v1';
const ACCESS_COOKIE = 'blcp_access_token';
const REFRESH_COOKIE = 'blcp_refresh_token';

export function backendUrl(path: string) {
  return `${API_BASE}${path}`;
}

export function mapBackendUser(user: BackendUser): SafeUser {
  return {
    id: user.id,
    email: user.email,
    name: `${user.firstName} ${user.lastName}`.trim(),
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    isActive: user.isActive,
  };
}

export async function getAuthCookies() {
  const cookieStore = await cookies();
  return {
    accessToken: cookieStore.get(ACCESS_COOKIE)?.value,
    refreshToken: cookieStore.get(REFRESH_COOKIE)?.value,
  };
}

export async function setAuthCookies(tokens: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookieStore = await cookies();
  const baseOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };

  cookieStore.set(ACCESS_COOKIE, tokens.accessToken, {
    ...baseOptions,
    maxAge: 60 * 60,
  });
  cookieStore.set(REFRESH_COOKIE, tokens.refreshToken, {
    ...baseOptions,
    maxAge: 60 * 60 * 24,
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_COOKIE);
  cookieStore.delete(REFRESH_COOKIE);
}
