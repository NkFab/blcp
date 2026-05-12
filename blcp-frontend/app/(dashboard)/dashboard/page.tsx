'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { FileTextIcon, ClockIcon, CheckCircleIcon, XCircleIcon, PlusIcon } from '@phosphor-icons/react';
import { backendListPayload } from '@/lib/backend-shared';
import type { Application, ApplicationStatus } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

interface DashboardStats {
  total: number;
  draft: number;
  submitted: number;
  underReview: number;
  reviewed: number;
  approved: number;
  rejected: number;
}

export default function DashboardPage() {
  const { user, permissions } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/applications');
        const data = await response.json();
        const apps = backendListPayload<Application>(data);
        setApplications(apps);
        setStats({
          total: apps.length,
          draft: apps.filter((app: Application) => app.status === 'draft').length,
          submitted: apps.filter((app: Application) => app.status === 'submitted').length,
          underReview: apps.filter((app: Application) => app.status === 'under_review').length,
          reviewed: apps.filter((app: Application) => app.status === 'reviewed').length,
          approved: apps.filter((app: Application) => app.status === 'approved').length,
          rejected: apps.filter((app: Application) => app.status === 'rejected').length,
        });
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  function getStatusBadge(status: ApplicationStatus) {
    const labels: Record<ApplicationStatus, string> = {
      draft: 'Draft',
      submitted: 'Submitted',
      under_review: 'Under Review',
      reviewed: 'Reviewed',
      approved: 'Approved',
      rejected: 'Rejected',
    };

    const variant =
      status === 'approved'
        ? 'default'
        : status === 'rejected'
          ? 'destructive'
          : status === 'draft'
            ? 'outline'
            : 'secondary';

    return <Badge variant={variant}>{labels[status]}</Badge>;
  }

  const recentApplications = applications.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        {permissions?.canCreateApplication && (
          <Link href="/applications/new">
            <Button className="gap-2">
              <PlusIcon size={16} weight="bold" />
              New Application
            </Button>
          </Link>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          [...Array(4)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">Total</CardTitle>
                <FileTextIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="text-2xl font-bold">{stats?.total ?? 0}</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                <ClockIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {(stats?.submitted ?? 0) + (stats?.underReview ?? 0)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">Awaiting Approval</CardTitle>
                <CheckCircleIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="text-2xl font-bold">{stats?.reviewed ?? 0}</CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium">Completed</CardTitle>
                <XCircleIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent className="text-2xl font-bold">{(stats?.approved ?? 0) + (stats?.rejected ?? 0)}</CardContent>
            </Card>
          </>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Applications</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-16 w-full" />
              ))}
            </div>
          ) : recentApplications.length === 0 ? (
            <p className="text-sm text-muted-foreground">No applications available yet.</p>
          ) : (
            <div className="space-y-3">
              {recentApplications.map((application) => (
                <Link
                  key={application.id}
                  href={`/applications/${application.id}`}
                  className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/40"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{application.institutionName}</p>
                    <p className="text-sm text-muted-foreground">{application.referenceNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {application.submittedAt
                        ? `Submitted ${formatDistanceToNow(new Date(application.submittedAt), { addSuffix: true })}`
                        : 'Saved as draft'}
                    </p>
                  </div>
                  {getStatusBadge(application.status)}
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
