import { NextResponse } from 'next/server';
import { clearAuthCookies } from '@/lib/backend-server';
import { fetchBackend } from '@/lib/backend-proxy';

export async function POST() {
  try {
    await fetchBackend({
      path: '/auth/logout',
      method: 'POST',
    });
    await clearAuthCookies();

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
