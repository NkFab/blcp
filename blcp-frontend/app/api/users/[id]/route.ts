import { NextRequest, NextResponse } from 'next/server';
import { backendJsonResponse, fetchBackend } from '@/lib/backend-proxy';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetchBackend({
      path: `/users/${id}`,
      method: 'GET',
    });

    return backendJsonResponse(response);
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH() {
  return NextResponse.json(
    { success: false, error: 'User updates are not exposed by the backend yet.' },
    { status: 501 }
  );
}
