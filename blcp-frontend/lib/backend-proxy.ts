import { NextResponse } from 'next/server';
import { backendUrl, clearAuthCookies, getAuthCookies, setAuthCookies } from './backend';

type BackendFetchOptions = RequestInit & {
  path: string;
};

async function tryRefreshToken(refreshToken: string) {
  const response = await fetch(backendUrl('/auth/refresh'), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as {
    accessToken: string;
    refreshToken: string;
  };
}

export async function fetchBackend({ path, headers, ...init }: BackendFetchOptions) {
  const { accessToken, refreshToken } = await getAuthCookies();
  const requestHeaders = new Headers(headers);

  if (accessToken) {
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);
  }

  let response = await fetch(backendUrl(path), {
    ...init,
    headers: requestHeaders,
  });

  if (response.status !== 401 || !refreshToken) {
    return response;
  }

  const refreshedTokens = await tryRefreshToken(refreshToken);
  if (!refreshedTokens) {
    await clearAuthCookies();
    return response;
  }

  await setAuthCookies(refreshedTokens);
  requestHeaders.set('Authorization', `Bearer ${refreshedTokens.accessToken}`);

  response = await fetch(backendUrl(path), {
    ...init,
    headers: requestHeaders,
  });

  return response;
}

export async function backendJsonResponse(response: Response) {
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  return NextResponse.json(body, { status: response.status });
}
