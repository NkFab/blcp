import { NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend-proxy';
import { mapBackendUser } from '@/lib/backend-shared';

export async function GET() {
  try {
    const response = await fetchBackend({
      path: '/auth/current-user',
      method: 'GET',
    });

    if (!response.ok) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: response.status }
      );
    }

    const backendUser = await response.json();

    return NextResponse.json({
      success: true,
      user: mapBackendUser(backendUser),
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
