'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Spinner } from '@/components/ui/spinner';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeftIcon, FloppyDiskIcon, PaperPlaneTiltIcon, WarningCircleIcon } from '@phosphor-icons/react';

const INSTITUTION_TYPES = [
  { value: 'commercial_bank', label: 'Commercial Bank' },
  { value: 'development_bank', label: 'Development Bank' },
  { value: 'cooperative_bank', label: 'Cooperative Bank' },
  { value: 'mortgage_bank', label: 'Mortgage Bank' },
];

const LICENCE_TYPES = [
  { value: 'commercial_licence', label: 'Commercial Licence' },
  { value: 'development_bank_licence', label: 'Development Bank Licence' },
  { value: 'microfinance_bank_licence', label: 'Microfinance Bank Licence' },
];

export default function NewApplicationPage() {
  const router = useRouter();
  const { permissions } = useAuth();
  const [formData, setFormData] = useState({
    referenceNumber: '',
    institutionName: '',
    institutionType: '',
    capitalAmount: '',
    licenceType: '',
    isForeignApplicant: false,
    isExistingInstitution: false,
  });
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!permissions?.canCreateApplication) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <WarningCircleIcon className="mb-4 h-12 w-12 text-destructive" />
        <h1 className="text-xl font-bold">Access Denied</h1>
        <p className="mt-2 text-muted-foreground">You do not have permission to create applications.</p>
        <Link href="/dashboard" className="mt-4">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  function setField(field: string, value: string | boolean) {
    setFormData((current) => ({ ...current, [field]: value }));
    setError('');
  }

  function validateForm() {
    if (!formData.referenceNumber.trim()) return 'Reference number is required';
    if (!formData.institutionName.trim()) return 'Institution name is required';
    if (!formData.institutionType) return 'Institution type is required';
    if (!formData.licenceType) return 'Licence type is required';
    if (!formData.capitalAmount || Number(formData.capitalAmount) <= 0) return 'Capital amount must be greater than zero';
    return null;
  }

  async function submitApplication(submit: boolean) {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    submit ? setIsSubmitting(true) : setIsSaving(true);

    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          capitalAmount: Number(formData.capitalAmount),
          status: submit ? 'submitted' : 'draft',
        }),
      });

      const data = await response.json();

      if (response.ok && data.id) {
        router.push(`/applications/${data.id}`);
        return;
      }

      setError(data.error || data.message || 'Failed to save application');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsSaving(false);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/applications">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeftIcon size={16} />
            Back
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">New Application</h1>
          <p className="text-muted-foreground">This form now matches the backend create-application contract.</p>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <WarningCircleIcon className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Application Details</CardTitle>
          <CardDescription>Fill in the fields the backend currently accepts.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="referenceNumber">Reference Number</Label>
              <Input
                id="referenceNumber"
                value={formData.referenceNumber}
                onChange={(event) => setField('referenceNumber', event.target.value)}
                placeholder="BNR-2026-00001"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="institutionName">Institution Name</Label>
              <Input
                id="institutionName"
                value={formData.institutionName}
                onChange={(event) => setField('institutionName', event.target.value)}
                placeholder="Example Finance Bank"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Institution Type</Label>
              <Select value={formData.institutionType} onValueChange={(value) => setField('institutionType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select institution type" />
                </SelectTrigger>
                <SelectContent>
                  {INSTITUTION_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Licence Type</Label>
              <Select value={formData.licenceType} onValueChange={(value) => setField('licenceType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select licence type" />
                </SelectTrigger>
                <SelectContent>
                  {LICENCE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="capitalAmount">Capital Amount</Label>
            <Input
              id="capitalAmount"
              type="number"
              value={formData.capitalAmount}
              onChange={(event) => setField('capitalAmount', event.target.value)}
              placeholder="5000000000"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex items-center gap-3 rounded-lg border p-4">
              <Checkbox
                checked={formData.isForeignApplicant}
                onCheckedChange={(checked) => setField('isForeignApplicant', Boolean(checked))}
              />
              <div>
                <p className="font-medium">Foreign Applicant</p>
                <p className="text-sm text-muted-foreground">Marks the application as a foreign applicant case.</p>
              </div>
            </label>
            <label className="flex items-center gap-3 rounded-lg border p-4">
              <Checkbox
                checked={formData.isExistingInstitution}
                onCheckedChange={(checked) => setField('isExistingInstitution', Boolean(checked))}
              />
              <div>
                <p className="font-medium">Existing Institution</p>
                <p className="text-sm text-muted-foreground">Marks the applicant as an existing institution.</p>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button
          variant="outline"
          onClick={() => submitApplication(false)}
          disabled={isSaving || isSubmitting}
          className="gap-2"
        >
          {isSaving ? <Spinner className="h-4 w-4" /> : <FloppyDiskIcon size={16} />}
          Save Draft
        </Button>
        <Button onClick={() => submitApplication(true)} disabled={isSaving || isSubmitting} className="gap-2">
          {isSubmitting ? <Spinner className="h-4 w-4" /> : <PaperPlaneTiltIcon size={16} />}
          Submit Application
        </Button>
      </div>
    </div>
  );
}
