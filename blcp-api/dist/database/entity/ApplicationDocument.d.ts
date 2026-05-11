import { Application } from "./Application";
export declare class ApplicationDocument {
    id: string;
    applicationId: string;
    type: string;
    url: string;
    originalFileName: string;
    mimeType: string;
    fileSize: number;
    /*********RELATIONS********/
    application: Application;
    createdAt: Date;
    updatedAt: Date;
}
//# sourceMappingURL=ApplicationDocument.d.ts.map