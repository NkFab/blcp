'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { ArrowLeftIcon, FileTextIcon, WarningCircleIcon, PaperPlaneTiltIcon } from '@phosphor-icons/react';
import type { Application, Document } from '@/lib/types';
import { format } from 'date-fns';

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useAuth();
  const [application, setApplication] = useState<Application | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchApplication() {
      try {
        const response = await fetch(`/api/applications/${id}`);
        const data = await response.json();

        if (!response.ok) {
          setError(data.error || 'Failed to load application');
          return;
        }

        setApplication(data.application);
        setDocuments(data.documents || []);
      } catch {
        setError('Network error');
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplication();
  }, [id]);

  async function submitDraft() {
    if (!application) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`/api/applications/${application.id}/actions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'submit' }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to submit application');
        return;
      }

      const refreshed = await fetch(`/api/applications/${application.id}`);
      const refreshedData = await refreshed.json();
      setApplication(refreshedData.application);
      setDocuments(refreshedData.documents || []);
    } catch {
      setError('Network error');
    } finally {
      setIsSubmitting(false);
    }
  }

  function getStatusBadge(status: Application['status']) {
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

  const canSubmitDraft =
    !!application &&
    application.status === 'draft' &&
    user?.role === 'applicant' &&
    application.applicantId === user.id;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <WarningCircleIcon className="mb-4 h-12 w-12 text-destructive" />
        <h1 className="text-xl font-bold">Unable to load application</h1>
        <p className="mt-2 text-muted-foreground">{error || 'Application not found'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Link href="/applications">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeftIcon size={16} />
              Back
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{application.institutionName}</h1>
              {getStatusBadge(application.status)}
            </div>
            <p className="font-mono text-muted-foreground">{application.referenceNumber}</p>
          </div>
        </div>

        {canSubmitDraft && (
          <Button onClick={submitDraft} disabled={isSubmitting} className="gap-2">
            {isSubmitting ? <Spinner className="h-4 w-4" /> : <PaperPlaneTiltIcon size={16} />}
            Submit Draft
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <WarningCircleIcon className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Core Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-muted-foreground">Institution Type</p>
                <p className="font-medium capitalize">{application.institutionType.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Licence Type</p>
                <p className="font-medium capitalize">{application.licenceType.replace(/_/g, ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Capital Amount</p>
                <p className="font-medium">{new Intl.NumberFormat('en-RW').format(Number(application.capitalAmount))}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Applicant Type</p>
                <p className="font-medium">
                  {application.isForeignApplicant ? 'Foreign' : 'Domestic'} /{' '}
                  {application.isExistingInstitution ? 'Existing Institution' : 'New Institution'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Read-only document list returned by the backend relations.</CardDescription>
            </CardHeader>
            <CardContent>
              {documents.length === 0 ? (
                <p className="text-sm text-muted-foreground">No documents are attached on the backend yet.</p>
              ) : (
                <div className="space-y-3">
                  {documents.map((document) => (
                    <div key={document.id} className="rounded-lg border p-4">
                      <div className="flex items-center gap-3">
                        <FileTextIcon className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{document.originalFileName}</p>
                          <p className="text-sm text-muted-foreground">
                            {document.mimeType} • {new Intl.NumberFormat('en-US').format(document.fileSize)} bytes
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div>
                <p className="text-muted-foreground">Created</p>
                <p className="font-medium">{format(new Date(application.createdAt), 'PPP p')}</p>
              </div>
              {application.submittedAt && (
                <div>
                  <p className="text-muted-foreground">Submitted</p>
                  <p className="font-medium">{format(new Date(application.submittedAt), 'PPP p')}</p>
                </div>
              )}
              {application.reviewedAt && (
                <div>
                  <p className="text-muted-foreground">Review Started</p>
                  <p className="font-medium">{format(new Date(application.reviewedAt), 'PPP p')}</p>
                </div>
              )}
              {application.reviewCompletedAt && (
                <div>
                  <p className="text-muted-foreground">Review Completed</p>
                  <p className="font-medium">{format(new Date(application.reviewCompletedAt), 'PPP p')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Backend Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertTitle>Frontend aligned to backend</AlertTitle>
                <AlertDescription>
                  Review, approval, audit log, and document upload workflows are no longer simulated in the frontend when the backend does not expose them.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
