import { NextRequest, NextResponse } from 'next/server';
import { fetchBackend, backendJsonResponse } from '@/lib/backend-proxy';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    switch (body.action) {
      case 'submit': {
        const response = await fetchBackend({
          path: `/applications/${id}`,
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: 'submitted',
            version: body.version,
          }),
        });

        return backendJsonResponse(response);
      }
      case 'review': {
        const response = await fetchBackend({
          path: `/applications/${id}/review`,
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reviewComment: body.reviewComment,
            reviewRecommendation: body.reviewRecommendation,
            version: body.version,
          }),
        });

        return backendJsonResponse(response);
      }
      case 'approve':
      case 'reject': {
        const response = await fetchBackend({
          path: `/applications/${id}/approve`,
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            approvalComment: body.approvalComment,
            status: body.action === 'approve' ? 'approved' : 'rejected',
            version: body.version,
          }),
        });

        return backendJsonResponse(response);
      }
      default:
        return NextResponse.json(
          { success: false, error: 'Unsupported action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Application action error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
