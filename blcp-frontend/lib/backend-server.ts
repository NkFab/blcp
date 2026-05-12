import 'server-only';
import { cookies } from 'next/headers';
import { backendUrl } from './backend-shared';

const ACCESS_COOKIE = 'blcp_access_token';
const REFRESH_COOKIE = 'blcp_refresh_token';

export { backendUrl };

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
