import zod from "zod";
import { ApplicationStatus } from "../../../database/entity";
import { InstitutionType, LicenceType } from "../../../database/entity/Application";
export declare const CreateApplicationDocumentSchema: zod.ZodObject<{
    fileType: zod.ZodString;
    url: zod.ZodString;
    originalFileName: zod.ZodString;
    mimeType: zod.ZodString;
    fileSize: zod.ZodNumber;
}, zod.core.$strip>;
export declare const CreateApplicationSchema: zod.ZodObject<{
    referenceNumber: zod.ZodString;
    institutionName: zod.ZodString;
    institutionType: zod.ZodEnum<typeof InstitutionType>;
    capitalAmount: zod.ZodNumber;
    licenceType: zod.ZodEnum<typeof LicenceType>;
    status: zod.ZodDefault<zod.ZodEnum<{
        draft: ApplicationStatus.DRAFT;
        submitted: ApplicationStatus.SUBMITTED;
    }>>;
    isForeignApplicant: zod.ZodDefault<zod.ZodBoolean>;
    isExistingInstitution: zod.ZodDefault<zod.ZodBoolean>;
    documents: zod.ZodOptional<zod.ZodArray<zod.ZodObject<{
        fileType: zod.ZodString;
        url: zod.ZodString;
        originalFileName: zod.ZodString;
        mimeType: zod.ZodString;
        fileSize: zod.ZodNumber;
    }, zod.core.$strip>>>;
    submittedAt: zod.ZodOptional<zod.ZodDate>;
    applicantId: zod.ZodOptional<zod.ZodString>;
}, zod.core.$strip>;
export type CreateApplicationDTO = zod.infer<typeof CreateApplicationSchema>;
//# sourceMappingURL=application.validator.d.ts.map