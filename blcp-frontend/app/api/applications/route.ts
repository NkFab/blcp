import { NextRequest, NextResponse } from 'next/server';
import { backendJsonResponse, fetchBackend } from '@/lib/backend-proxy';

export async function GET() {
  try {
    const response = await fetchBackend({
      path: '/applications',
      method: 'GET',
    });

    return backendJsonResponse(response);
  } catch (error) {
    console.error('Get applications error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const response = await fetchBackend({
      path: '/applications',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    return backendJsonResponse(response);
  } catch (error) {
    console.error('Create application error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
