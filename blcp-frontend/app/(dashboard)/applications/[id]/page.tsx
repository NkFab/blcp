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
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftIcon, FileTextIcon, WarningCircleIcon, PaperPlaneTiltIcon, CheckCircleIcon, XCircleIcon } from '@phosphor-icons/react';
import type { Application, Audit, Document, ReviewRecommendation } from '@/lib/types';
import { format } from 'date-fns';

const REVIEW_RECOMMENDATIONS: { value: ReviewRecommendation; label: string }[] = [
  { value: 'recommended_approval', label: 'Recommend Approval' },
  { value: 'recommended_rejection', label: 'Recommend Rejection' },
  { value: 'request_more_info', label: 'Request More Info' },
];

export default function ApplicationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, permissions } = useAuth();
  const [application, setApplication] = useState<Application | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [audits, setAudits] = useState<Audit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [error, setError] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewRecommendation, setReviewRecommendation] = useState<ReviewRecommendation | ''>('');
  const [approvalComment, setApprovalComment] = useState('');

  async function fetchApplication() {
    try {
      const response = await fetch(`/api/applications/${id}`);
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || 'Failed to load application');
        return;
      }

      setApplication(data.id ? data : data.application);
      setDocuments((data.documents || data.application?.documents || []) as Document[]);
      setAudits((data.audits || data.application?.audits || []) as Audit[]);
      setError('');
    } catch {
      setError('Network error');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void fetchApplication();
  }, [id]);

  async function performAction(
    action: 'submit' | 'review' | 'approve' | 'reject',
    body: Record<string, unknown> = {}
  ) {
    if (!application) return;

    setIsActionLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/applications/${application.id}/actions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action,
          version: application.version,
          ...body,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || 'Action failed');
        return;
      }

      setReviewComment('');
      setReviewRecommendation('');
      setApprovalComment('');
      await fetchApplication();
    } catch {
      setError('Network error');
    } finally {
      setIsActionLoading(false);
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

    return <Badge variant={variant}>{status.replaceAll('_', ' ')}</Badge>;
  }

  function getRecommendationBadge(value: ReviewRecommendation | null) {
    if (!value) return null;
    const label =
      value === 'recommended_approval'
        ? 'Recommend Approval'
        : value === 'recommended_rejection'
          ? 'Recommend Rejection'
          : 'Request More Info';
    const variant = value === 'recommended_rejection' ? 'destructive' : 'secondary';
    return <Badge variant={variant}>{label}</Badge>;
  }

  const canSubmitDraft =
    !!application &&
    application.status === 'draft' &&
    user?.role === 'applicant' &&
    application.applicantId === user.id;

  const canReview =
    !!application &&
    application.status === 'submitted' &&
    permissions?.canReviewApplications;

  const canApprove =
    !!application &&
    application.status === 'reviewed' &&
    permissions?.canApproveApplications;

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error && !application) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <WarningCircleIcon className="mb-4 h-12 w-12 text-destructive" />
        <h1 className="text-xl font-bold">Unable to load application</h1>
        <p className="mt-2 text-muted-foreground">{error}</p>
      </div>
    );
  }

  if (!application) return null;

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
          <Button onClick={() => performAction('submit')} disabled={isActionLoading} className="gap-2">
            {isActionLoading ? <Spinner className="h-4 w-4" /> : <PaperPlaneTiltIcon size={16} />}
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
                <p className="font-medium capitalize">{application.institutionType.replaceAll('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Licence Type</p>
                <p className="font-medium capitalize">{application.licenceType.replaceAll('_', ' ')}</p>
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
              {application.applicant && (
                <div>
                  <p className="text-sm text-muted-foreground">Applicant</p>
                  <p className="font-medium">
                    {application.applicant.firstName} {application.applicant.lastName}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-muted-foreground">Current Version</p>
                <p className="font-medium">{application.version}</p>
              </div>
            </CardContent>
          </Card>

          {application.reviewComment || application.reviewRecommendation || application.approvalComment ? (
            <Card>
              <CardHeader>
                <CardTitle>Workflow Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {application.reviewRecommendation && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Review Recommendation</p>
                    {getRecommendationBadge(application.reviewRecommendation)}
                  </div>
                )}
                {application.reviewComment && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Review Comment</p>
                    <p className="whitespace-pre-wrap text-sm">{application.reviewComment}</p>
                  </div>
                )}
                {application.approvalComment && (
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Approval Comment</p>
                    <p className="whitespace-pre-wrap text-sm">{application.approvalComment}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : null}

          {canReview && (
            <Card>
              <CardHeader>
                <CardTitle>Review Application</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Recommendation</Label>
                  <Select
                    value={reviewRecommendation}
                    onValueChange={(value) => setReviewRecommendation(value as ReviewRecommendation)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a recommendation" />
                    </SelectTrigger>
                    <SelectContent>
                      {REVIEW_RECOMMENDATIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reviewComment">Review Comment</Label>
                  <Textarea
                    id="reviewComment"
                    value={reviewComment}
                    onChange={(event) => setReviewComment(event.target.value)}
                    rows={4}
                    placeholder="Summarize your review findings"
                  />
                </div>
                <Button
                  onClick={() =>
                    performAction('review', {
                      reviewComment,
                      reviewRecommendation,
                    })
                  }
                  disabled={!reviewRecommendation || isActionLoading}
                  className="gap-2"
                >
                  {isActionLoading ? <Spinner className="h-4 w-4" /> : <CheckCircleIcon size={16} />}
                  Submit Review
                </Button>
              </CardContent>
            </Card>
          )}

          {canApprove && (
            <Card>
              <CardHeader>
                <CardTitle>Approval Decision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="approvalComment">Approval Comment</Label>
                  <Textarea
                    id="approvalComment"
                    value={approvalComment}
                    onChange={(event) => setApprovalComment(event.target.value)}
                    rows={4}
                    placeholder="Add an approval or rejection note"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={() => performAction('approve', { approvalComment })}
                    disabled={isActionLoading}
                    className="gap-2 bg-green-600 hover:bg-green-700"
                  >
                    {isActionLoading ? <Spinner className="h-4 w-4" /> : <CheckCircleIcon size={16} />}
                    Approve
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => performAction('reject', { approvalComment })}
                    disabled={isActionLoading}
                    className="gap-2"
                  >
                    {isActionLoading ? <Spinner className="h-4 w-4" /> : <XCircleIcon size={16} />}
                    Reject
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
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
                  <p className="text-muted-foreground">Reviewed</p>
                  <p className="font-medium">{format(new Date(application.reviewedAt), 'PPP p')}</p>
                </div>
              )}
              {application.approvedAt && (
                <div>
                  <p className="text-muted-foreground">Approved / Rejected</p>
                  <p className="font-medium">{format(new Date(application.approvedAt), 'PPP p')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              {audits.length === 0 ? (
                <p className="text-sm text-muted-foreground">No audit records returned for this application yet.</p>
              ) : (
                <div className="space-y-3">
                  {audits.map((audit) => (
                    <div key={audit.id} className="rounded-lg border p-3">
                      <div className="flex items-center justify-between gap-3">
                        <Badge variant="outline">{audit.action.replaceAll('_', ' ')}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {format(new Date(audit.createdAt), 'PP p')}
                        </span>
                      </div>
                      {audit.user && (
                        <p className="mt-2 text-sm text-muted-foreground">
                          {audit.user.firstName} {audit.user.lastName}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
