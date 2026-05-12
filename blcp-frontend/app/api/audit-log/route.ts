import { NextRequest, NextResponse } from 'next/server';
import type { Application, AuditLogEntry } from '@/lib/types';
import { backendListPayload } from '@/lib/backend-shared';
import { fetchBackend } from '@/lib/backend-proxy';

export async function GET(_request: NextRequest) {
  try {
    const applicationsResponse = await fetchBackend({
      path: '/applications',
      method: 'GET',
    });

    if (!applicationsResponse.ok) {
      const payload = await applicationsResponse.text();
      const body = payload ? JSON.parse(payload) : { error: 'Failed to load applications' };
      return NextResponse.json(body, { status: applicationsResponse.status });
    }

    const applicationsPayload = await applicationsResponse.json();
    const applications = backendListPayload<Application>(applicationsPayload);

    const detailResponses = await Promise.all(
      applications.map(async (application) => {
        const response = await fetchBackend({
          path: `/applications/${application.id}`,
          method: 'GET',
        });

        if (!response.ok) {
          return null;
        }

        return (await response.json()) as Application;
      }),
    );

    const audits: AuditLogEntry[] = detailResponses
      .filter((application): application is Application => Boolean(application))
      .flatMap((application) =>
        (application.audits ?? []).map((audit) => ({
          ...audit,
          application: {
            id: application.id,
            referenceNumber: application.referenceNumber,
            institutionName: application.institutionName,
            status: application.status,
          },
        })),
      )
      .sort(
        (left, right) =>
          new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime(),
      );

    return NextResponse.json({
      success: true,
      audits,
      source: 'application-details',
    });
  } catch (error) {
    console.error('Audit log aggregation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}
