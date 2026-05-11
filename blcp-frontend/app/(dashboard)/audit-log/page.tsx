'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { WarningCircleIcon } from '@phosphor-icons/react';

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
        <p className="text-muted-foreground">This screen is intentionally disabled until the backend exposes audit-log endpoints.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Backend Gap</CardTitle>
          <CardDescription>The frontend now follows backend availability instead of simulating its own audit records.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
            <WarningCircleIcon className="mt-0.5 h-5 w-5" />
            <p className="text-sm">
              No audit-log API exists on the backend right now, so this page no longer falls back to frontend-only data.
            </p>
          </div>
          <Link href="/dashboard">
            <Button>Return to Dashboard</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
