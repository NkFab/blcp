import { Token } from "./Token";
import { Application } from "./Application";
export declare enum UserRole {
    APPLICANT = "applicant",
    REVIEWER = "reviewer",
    APPROVER = "approver",
    SUPERVISOR = "supervisor",
    ADMIN = "admin"
}
export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    password: string;
    isActive: boolean;
    tokens: Token[];
    assignedApplications: Application[];
    applications: Application[];
    createdAt: Date;
    updatedAt: Date;
    /************************************/
    hashPassword(): Promise<void>;
    comparePassword(plainPassword: string): Promise<boolean>;
}
//# sourceMappingURL=User.d.ts.map