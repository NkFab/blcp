'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { WarningCircleIcon } from '@phosphor-icons/react';
import { format } from 'date-fns';
import type { AuditLogEntry } from '@/lib/types';

export default function AuditLogPage() {
  const { permissions } = useAuth();
  const [audits, setAudits] = useState<AuditLogEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchAudits() {
      try {
        const response = await fetch('/api/audit-log');
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || data.message || 'Failed to load audit log');
          return;
        }

        setAudits(data.audits || []);
      } catch {
        setError('Network error');
      } finally {
        setIsLoading(false);
      }
    }

    if (permissions?.canViewAuditLog) {
      void fetchAudits();
    } else {
      setIsLoading(false);
    }
  }, [permissions?.canViewAuditLog]);

  if (!permissions?.canViewAuditLog) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
          <p className="text-muted-foreground">You do not have permission to view audit records.</p>
        </div>
        <Link href="/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Audit Log</h1>
      </div>

      {error && (
        <Alert variant="destructive">
          <WarningCircleIcon className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Audit Entries</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-20 w-full" />
              ))}
            </div>
          ) : audits.length === 0 ? (
            <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
              <WarningCircleIcon className="mt-0.5 h-5 w-5" />
              <p className="text-sm">
                No audit records were returned.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {audits.map((audit) => (
                <div key={audit.id} className="rounded-lg border p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline">{String(audit.action).replaceAll('_', ' ')}</Badge>
                        {audit.application ? (
                          <Badge variant="secondary">{audit.application.referenceNumber}</Badge>
                        ) : null}
                      </div>
                      {audit.application ? (
                        <div>
                          <p className="font-medium">{audit.application.institutionName}</p>
                          <p className="text-sm text-muted-foreground">
                            Current status: {audit.application.status.replaceAll('_', ' ')}
                          </p>
                        </div>
                      ) : null}
                      {audit.user ? (
                        <p className="text-sm text-muted-foreground">
                          {audit.user.firstName} {audit.user.lastName}
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">User ID: {audit.userId}</p>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(audit.createdAt), 'PP p')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
