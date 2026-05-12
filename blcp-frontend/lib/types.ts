// User Roles
export type UserRole = 'applicant' | 'reviewer' | 'approver' | 'supervisor' | 'admin';

// Application States - State Machine
export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review'
  | 'reviewed'
  | 'approved'
  | 'rejected';

// Valid state transitions
export const VALID_TRANSITIONS: Record<ApplicationStatus, ApplicationStatus[]> = {
  draft: ['submitted'],
  submitted: ['reviewed', 'under_review'],
  under_review: ['reviewed'],
  reviewed: ['approved', 'rejected'],
  approved: [], // Terminal state
  rejected: [], // Terminal state
};

export type ReviewRecommendation =
  | 'recommended_approval'
  | 'recommended_rejection'
  | 'request_more_info';

export type AuditAction =
  | 'create'
  | 'update'
  | 'review'
  | 'approve'
  | 'CREATE_APPLICATION'
  | 'UPDATE_APPLICATION'
  | 'SUBMIT_APPLICATION'
  | 'REVIEW_APPLICATION'
  | 'APPROVE_APPLICATION'
  | 'REJECT_APPLICATION'
  | 'EDIT_APPLICATION'
  | 'UPLOAD_DOCUMENT';

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
  reviewComment: string | null;
  approvalComment: string | null;
  reviewRecommendation: ReviewRecommendation | null;
  version: number;
  applicantId: string;
  status: ApplicationStatus;
  reviewerId: string | null;
  approverId: string | null;
  createdAt: string;
  updatedAt: string;
  submittedAt: string | null;
  reviewedAt: string | null;
  approvedAt: string | null;
  applicant?: BackendUser | null;
  reviewer?: BackendUser | null;
  approver?: BackendUser | null;
  documents?: BackendDocument[];
  audits?: Audit[];
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
  userId: string;
  applicationId: string;
  action: AuditAction;
  snapshot: {
    before: Partial<Application> | null;
    after: Partial<Application> | null;
  };
  createdAt: string;
  updatedAt: string;
  user?: BackendUser | null;
  application?: Pick<Application, 'id' | 'referenceNumber' | 'institutionName' | 'status'> | null;
}

export interface LegacyAuditLogEntry {
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

export interface Audit extends AuditLogEntry {}

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
    canApproveApplications: true,
    canManageUsers: true,
    canViewAuditLog: true,
    canUploadDocuments: false,
  },
  admin: {
    canCreateApplication: false,
    canViewOwnApplications: false,
    canViewAllApplications: true,
    canReviewApplications: false,
    canApproveApplications: false,
    canManageUsers: true,
    canViewAuditLog: true,
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
