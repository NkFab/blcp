'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Plus, MagnifyingGlass, Eye, Funnel } from '@phosphor-icons/react';
import type { Application, ApplicationStatus } from '@/lib/types';
import { formatDistanceToNow } from 'date-fns';

const STATUS_OPTIONS: { value: ApplicationStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'submitted', label: 'Submitted' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'approved', label: 'Approved' },
  { value: 'rejected', label: 'Rejected' },
];

export default function ApplicationsPage() {
  const { permissions } = useAuth();
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get('status') as ApplicationStatus | null;

  const [applications, setApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>(initialStatus || 'all');

  useEffect(() => {
    async function fetchApplications() {
      try {
        const url = statusFilter !== 'all' ? `/api/applications?status=${statusFilter}` : '/api/applications';
        const response = await fetch(url);
        const data = await response.json();
        setApplications(data.data || []);
      } catch (error) {
        console.error('Failed to fetch applications:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplications();
  }, [statusFilter]);

  function getStatusBadge(status: ApplicationStatus) {
    const variant =
      status === 'approved'
        ? 'default'
        : status === 'rejected'
          ? 'destructive'
          : status === 'draft'
            ? 'outline'
            : 'secondary';
    return <Badge variant={variant}>{status.replace('_', ' ')}</Badge>;
  }

  const filteredApplications = applications.filter((application) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const applicantName =
      application.applicant ? `${application.applicant.firstName} ${application.applicant.lastName}` : '';

    return (
      application.institutionName.toLowerCase().includes(query) ||
      application.referenceNumber.toLowerCase().includes(query) ||
      applicantName.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Applications</h1>
          <p className="text-muted-foreground">Applications sourced directly from the backend API.</p>
        </div>
        {permissions?.canCreateApplication && (
          <Link href="/applications/new">
            <Button className="gap-2">
              <Plus size={16} weight="bold" />
              New Application
            </Button>
          </Link>
        )}
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <MagnifyingGlass className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by institution, reference, or applicant..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Funnel className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{filteredApplications.length} Applications</CardTitle>
          <CardDescription>Open an application to inspect backend-backed details.</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <Skeleton key={index} className="h-12 w-full" />
              ))}
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <FileText className="mb-4 h-12 w-12 text-muted-foreground/50" />
              <p className="text-lg font-medium">No applications found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApplications.map((application) => (
                    <TableRow key={application.id}>
                      <TableCell className="font-mono text-sm">{application.referenceNumber}</TableCell>
                      <TableCell>
                        <div className="font-medium">{application.institutionName}</div>
                        {application.applicant && (
                          <div className="text-xs text-muted-foreground">
                            {application.applicant.firstName} {application.applicant.lastName}
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="capitalize">{application.institutionType.replace(/_/g, ' ')}</TableCell>
                      <TableCell>{getStatusBadge(application.status)}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {application.submittedAt
                          ? formatDistanceToNow(new Date(application.submittedAt), { addSuffix: true })
                          : 'Not submitted'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/applications/${application.id}`}>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Eye size={16} />
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
