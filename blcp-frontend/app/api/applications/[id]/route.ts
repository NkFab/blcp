import { NextRequest, NextResponse } from 'next/server';
import { backendJsonResponse, fetchBackend } from '@/lib/backend-proxy';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await fetchBackend({
      path: '/applications',
      method: 'GET',
    });

    const payload = await response.json();
    if (!response.ok) {
      return NextResponse.json(payload, { status: response.status });
    }

    const application = payload.data?.find((item: { id: string }) => item.id === id);
    if (!application) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({
      application,
      documents: application.documents || [],
    });
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
