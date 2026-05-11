import { NextRequest, NextResponse } from 'next/server';
import { backendJsonResponse, fetchBackend } from '@/lib/backend-proxy';

export async function GET() {
  try {
    const response = await fetchBackend({
      path: '/users',
      method: 'GET',
    });

    return backendJsonResponse(response);
  } catch (error) {
    console.error('Get users error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(_request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'User creation is not exposed by the backend yet.' },
    { status: 501 }
  );
}
