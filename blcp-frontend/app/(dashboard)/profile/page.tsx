'use client';

import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  UserIcon,
  EnvelopeSimpleIcon,
  CalendarIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@phosphor-icons/react';
import { format } from 'date-fns';
import { ROLE_PERMISSIONS } from '@/lib/types';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return null;

  const permissions = ROLE_PERMISSIONS[user.role];

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'supervisor':
      case 'admin':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'approver':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'reviewer':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    }
  };

  const permissionsList = [
    { key: 'canCreateApplication', label: 'Create Applications' },
    { key: 'canViewOwnApplications', label: 'View Own Applications' },
    { key: 'canViewAllApplications', label: 'View All Applications' },
    { key: 'canReviewApplications', label: 'Review Applications' },
    { key: 'canApproveApplications', label: 'Approve/Reject Applications' },
    { key: 'canManageUsers', label: 'Manage Users' },
    { key: 'canViewAuditLog', label: 'View Audit Log' },
    { key: 'canUploadDocuments', label: 'Upload Documents' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Your account information and permissions</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon size={20} />
              Account Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold">
                {user.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <EnvelopeSimpleIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Account Created</p>
                  <p className="font-medium">{format(new Date(user.createdAt), 'PPP')}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheckIcon className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={user.isActive ? 'default' : 'secondary'}>
                    {user.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheckIcon size={20} />
              Permissions
            </CardTitle>
            <CardDescription>
              Based on your role as {user.role}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {permissionsList.map(({ key, label }) => {
                const hasPermission = permissions[key as keyof typeof permissions];
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <span className={hasPermission ? '' : 'text-muted-foreground'}>
                      {label}
                    </span>
                    {hasPermission ? (
                      <CheckCircleIcon className="h-5 w-5 text-green-500" weight="fill" />
                    ) : (
                      <XCircleIcon className="h-5 w-5 text-muted-foreground/50" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {user.role === 'supervisor' && (
        <Card className="border-red-200 bg-red-50/50 dark:border-red-900 dark:bg-red-950/30">
          <CardHeader>
            <CardTitle>Supervisor Access</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The backend currently exposes user management visibility to supervisors. This frontend
              reflects that capability directly and no longer adds extra local-only admin behaviors.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
