import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  return NextResponse.json(
    { success: false, error: 'Audit log endpoints are not exposed by the backend yet.' },
    { status: 501 }
  );
}
