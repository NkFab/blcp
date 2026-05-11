// User Roles
export type UserRole = 'applicant' | 'reviewer' | 'approver' | 'supervisor' | 'admin';

// Application States - State Machine
export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'approved'
  | 'rejected';

// Valid state transitions
export const VALID_TRANSITIONS: Record<ApplicationStatus, ApplicationStatus[]> = {
  draft: ['submitted'],
  submitted: ['under_review'],
  under_review: ['approved', 'rejected'],
  approved: [], // Terminal state
  rejected: [], // Terminal state
};

// Action types for audit log
export type AuditAction = 
  | 'application_created'
  | 'application_submitted'
  | 'application_assigned'
  | 'review_started'
  | 'additional_info_requested'
  | 'additional_info_submitted'
  | 'review_completed'
  | 'application_approved'
  | 'application_rejected'
  | 'document_uploaded'
  | 'document_version_added'
  | 'user_created'
  | 'user_updated'
  | 'user_login'
  | 'user_logout';

// User interface
export interface User {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

// User without sensitive data
export interface SafeUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface Application {
  id: string;
  referenceNumber: string;
  institutionName: string;
  institutionType: 'commercial_bank' | 'development_bank' | 'cooperative_bank' | 'mortgage_bank';
  capitalAmount: number;
  licenceType: 'commercial_licence' | 'development_bank_licence' | 'microfinance_bank_licence';
  isForeignApplicant: boolean;
  isExistingInstitution: boolean;
  applicantId: string;
  status: ApplicationStatus;
  reviewedById: string | null;
  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
  reviewedAt: string | null;
  reviewCompletedAt: string | null;
  applicant?: BackendUser | null;
  reviewedBy?: BackendUser | null;
  documents?: BackendDocument[];
}

export interface BackendUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface BackendDocument {
  id: string;
  applicationId: string;
  type: string;
  url: string;
  originalFileName: string;
  mimeType: string;
  fileSize: number;
  createdAt: string;
  updatedAt: string;
}

export interface Document extends BackendDocument {}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userEmail: string;
  userName: string;
  userRole: UserRole;
  action: AuditAction;
  entityType: 'application' | 'document' | 'user';
  entityId: string;
  stateBefore: string | null; 
  stateAfter: string | null; 
  metadata: string | null; 
  ipAddress: string | null;
  userAgent: string | null;
}

export interface RolePermissions {
  canCreateApplication: boolean;
  canViewOwnApplications: boolean;
  canViewAllApplications: boolean;
  canReviewApplications: boolean;
  canApproveApplications: boolean;
  canManageUsers: boolean;
  canViewAuditLog: boolean;
  canUploadDocuments: boolean;
}

export const ROLE_PERMISSIONS: Record<UserRole, RolePermissions> = {
  applicant: {
    canCreateApplication: true,
    canViewOwnApplications: true,
    canViewAllApplications: false,
    canReviewApplications: false,
    canApproveApplications: false,
    canManageUsers: false,
    canViewAuditLog: false,
    canUploadDocuments: true,
  },
  reviewer: {
    canCreateApplication: false,
    canViewOwnApplications: false,
    canViewAllApplications: true,
    canReviewApplications: true,
    canApproveApplications: false,
    canManageUsers: false,
    canViewAuditLog: false,
    canUploadDocuments: false,
  },
  approver: {
    canCreateApplication: false,
    canViewOwnApplications: false,
    canViewAllApplications: true,
    canReviewApplications: false,
    canApproveApplications: true,
    canManageUsers: false,
    canViewAuditLog: false,
    canUploadDocuments: false,
  },
  supervisor: {
    canCreateApplication: false,
    canViewOwnApplications: false,
    canViewAllApplications: true,
    canReviewApplications: false,
    canApproveApplications: false,
    canManageUsers: true,
    canViewAuditLog: false,
    canUploadDocuments: false,
  },
  admin: {
    canCreateApplication: false,
    canViewOwnApplications: false,
    canViewAllApplications: true,
    canReviewApplications: false,
    canApproveApplications: false,
    canManageUsers: true,
    canViewAuditLog: false,
    canUploadDocuments: false,
  },
};

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
}
