import { NextRequest, NextResponse } from 'next/server';
import { fetchBackend, backendJsonResponse } from '@/lib/backend-proxy';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (body.action !== 'submit') {
      return NextResponse.json(
        { success: false, error: 'This backend currently supports direct editing and submission only.' },
        { status: 501 }
      );
    }

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
      return NextResponse.json({ success: false, error: 'Application not found' }, { status: 404 });
    }

    const updateResponse = await fetchBackend({
      path: `/applications/${id}`,
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...application,
        applicantId: application.applicantId,
        status: 'submitted',
      }),
    });

    return backendJsonResponse(updateResponse);
  } catch (error) {
    console.error('Application action error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
