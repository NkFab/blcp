import { User } from "./User";
import { ApplicationDocument } from "./ApplicationDocument";
export declare enum ApplicationStatus {
    DRAFT = "draft",
    SUBMITTED = "submitted",
    UNDER_REVIEW = "under_review",
    APPROVED = "approved",
    REJECTED = "rejected"
}
export declare enum InstitutionType {
    COMMERCIAL = "commercial_bank",// 20B in capital
    DEVELOPMENT = "development_bank",// 50B in capital
    COOPERATIVE = "cooperative_bank",// 10B in capital
    MORTGAGE = "mortgage_bank"
}
export declare enum LicenceType {
    COMMERCIAL = "commercial_licence",
    DEVELOPMENT = "development_bank_licence",
    MICROFINANCE = "microfinance_bank_licence"
}
export declare class Application {
    id: string;
    referenceNumber: string;
    institutionName: string;
    institutionType: InstitutionType;
    capitalAmount: number;
    licenceType: LicenceType;
    status: ApplicationStatus;
    isForeignApplicant: boolean;
    isExistingInstitution: boolean;
    /**********TIMESTAMPS and association**************/
    applicantId: string;
    applicant: User;
    reviewedById: string;
    reviewedBy: User | null;
    documents: ApplicationDocument[];
    createdAt: Date;
    updatedAt: Date;
    submittedAt: Date;
    reviewedAt: Date;
    reviewCompletedAt: Date;
}
//# sourceMappingURL=Application.d.ts.map