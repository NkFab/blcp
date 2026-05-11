import { NextRequest, NextResponse } from 'next/server';
import { backendJsonResponse, fetchBackend } from '@/lib/backend-proxy';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetchBackend({
      path: `/applications/${id}`,
      method: 'GET',
    });
    return backendJsonResponse(response);
  } catch (error) {
    console.error('Get application error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.text();
    const response = await fetchBackend({
      path: `/applications/${id}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    return backendJsonResponse(response);
  } catch (error) {
    console.error('Update application error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
