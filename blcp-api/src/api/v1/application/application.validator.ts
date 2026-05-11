import zod from "zod";
import { ApplicationStatus } from "../../../database/entity";
import {
  InstitutionType,
  LicenceType,
} from "../../../database/entity/Application";

export const CreateApplicationDocumentSchema = zod.object({
  fileType: zod.string(),
  url: zod.string(),
  originalFileName: zod.string(),
  mimeType: zod.string(),
  fileSize: zod.number().int(),
});

export const CreateApplicationSchema = zod.object({
  referenceNumber: zod.string(),
  institutionName: zod.string(),
  institutionType: zod.enum(InstitutionType),
  capitalAmount: zod.number().min(0),
  licenceType: zod.enum(LicenceType),
  status: zod
    .enum([ApplicationStatus.SUBMITTED, ApplicationStatus.DRAFT])
    .default(ApplicationStatus.DRAFT),
  isForeignApplicant: zod.boolean().default(false),
  isExistingInstitution: zod.boolean().default(false),
  documents: zod.array(CreateApplicationDocumentSchema).optional(),
  submittedAt: zod.date().optional(),
  applicantId: zod.string().optional(),
});

export type CreateApplicationDTO = zod.infer<typeof CreateApplicationSchema>;
