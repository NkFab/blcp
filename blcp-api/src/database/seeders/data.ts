import { UserRole } from "../entity";
import {
  ApplicationStatus,
  InstitutionType,
  LicenceType,
} from "../entity/Application";

export default {
  users: [
    {
      firstName: "Fabrice",
      lastName: "Sup",
      email: "fabrice.supervisor@test.com",
      password: process.env.USER_PASSWORD!,
      role: UserRole.SUPERVISOR,
    },
    {
      firstName: "Eric",
      lastName: "Rev",
      email: "eric.reviewer@test.com",
      password: process.env.USER_PASSWORD!,
      role: UserRole.REVIEWER,
    },
    {
      firstName: "Denis",
      lastName: "App",
      email: "denis.applicant@test.com",
      password: process.env.USER_PASSWORD!,
      role: UserRole.APPLICANT,
    },
    {
      firstName: "John",
      lastName: "Doe",
      email: "john.admin@test.com",
      password: process.env.USER_PASSWORD!,
      role: UserRole.ADMIN,
    },
  ],

  applications: [
    {
      referenceNumber: "abc-1111-def",
      institutionName: "ABC Bank",
      institutionType: InstitutionType.COMMERCIAL,
      capitalAmount: 50000000000000,
      licenceType: LicenceType.COMMERCIAL,
      status: ApplicationStatus.DRAFT,
      documents: [
        {
          url: "https://storage.example.com/uploads/photo.jpg",
          originalFileName: "photo.jpg",
          type: "SOURCE_OF_FUNDS",
          mimeType: "image/jpeg",
          fileSize: 204800,
        },
        {
          type: "SOURCE_OF_FUNDS",
          url: "https://storage.example.com/uploads/photo-1.jpg",
          originalFileName: "photo-1.jpg",
          mimeType: "image/jpeg",
          fileSize: 209000,
        },
      ],
    },
    {
      referenceNumber: "abc-2222-def",
      institutionName: "XYZ Credit Union",
      institutionType: InstitutionType.COOPERATIVE,
      capitalAmount: 25000000000000,
      licenceType: LicenceType.MICROFINANCE,
      status: ApplicationStatus.SUBMITTED,
      documents: [
        {
          url: "https://storage.example.com/uploads/document.pdf",
          originalFileName: "document.pdf",
          type: "COMPLIANCE_REPORT",
          mimeType: "application/pdf",
          fileSize: 512000,
        },
      ],
    },
    {
      referenceNumber: "pqr-3333-stu",
      institutionName: "Global Finance Ltd",
      institutionType: InstitutionType.DEVELOPMENT,
      capitalAmount: 100000000000000,
      licenceType: LicenceType.DEVELOPMENT,
      status: ApplicationStatus.SUBMITTED,
      documents: [
        {
          url: "https://storage.example.com/uploads/cert.jpg",
          originalFileName: "cert.jpg",
          type: "CERTIFICATE",
          mimeType: "image/jpeg",
          fileSize: 256000,
        },
        {
          url: "https://storage.example.com/uploads/audit.pdf",
          originalFileName: "audit.pdf",
          type: "AUDIT_REPORT",
          mimeType: "application/pdf",
          fileSize: 768000,
        },
      ],
    },
    {
      referenceNumber: "mno-4444-vwx",
      institutionName: "Heritage Bank",
      institutionType: InstitutionType.COMMERCIAL,
      capitalAmount: 75000000000000,
      licenceType: LicenceType.COMMERCIAL,
      status: ApplicationStatus.DRAFT,
      documents: [
        {
          url: "https://storage.example.com/uploads/application.pdf",
          originalFileName: "application.pdf",
          type: "APPLICATION_FORM",
          mimeType: "application/pdf",
          fileSize: 1024000,
        },
      ],
    },
  ],
};
