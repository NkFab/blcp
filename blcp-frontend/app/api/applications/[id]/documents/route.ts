import { NextRequest, NextResponse } from 'next/server';
import { fetchBackend } from '@/lib/backend-proxy';

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

    return NextResponse.json({
      success: true,
      documents: application?.documents || [],
    });
  } catch (error) {
    console.error('Get documents error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST() {
  return NextResponse.json(
    { success: false, error: 'Document uploads are not exposed by the backend yet.' },
    { status: 501 }
  );
}
