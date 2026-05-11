module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Projects/tests/blcp/blcp-frontend/lib/types.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// User Roles
__turbopack_context__.s([
    "ROLE_PERMISSIONS",
    ()=>ROLE_PERMISSIONS,
    "VALID_TRANSITIONS",
    ()=>VALID_TRANSITIONS
]);
const VALID_TRANSITIONS = {
    draft: [
        'submitted'
    ],
    submitted: [
        'under_review'
    ],
    under_review: [
        'additional_info_required',
        'reviewed'
    ],
    additional_info_required: [
        'submitted'
    ],
    reviewed: [
        'approved',
        'rejected'
    ],
    approved: [],
    rejected: []
};
const ROLE_PERMISSIONS = {
    applicant: {
        canCreateApplication: true,
        canViewOwnApplications: true,
        canViewAllApplications: false,
        canReviewApplications: false,
        canApproveApplications: false,
        canManageUsers: false,
        canViewAuditLog: false,
        canUploadDocuments: true
    },
    reviewer: {
        canCreateApplication: false,
        canViewOwnApplications: false,
        canViewAllApplications: true,
        canReviewApplications: true,
        canApproveApplications: false,
        canManageUsers: false,
        canViewAuditLog: false,
        canUploadDocuments: false
    },
    approver: {
        canCreateApplication: false,
        canViewOwnApplications: false,
        canViewAllApplications: true,
        canReviewApplications: false,
        canApproveApplications: true,
        canManageUsers: false,
        canViewAuditLog: true,
        canUploadDocuments: false
    },
    admin: {
        canCreateApplication: false,
        canViewOwnApplications: false,
        canViewAllApplications: true,
        canReviewApplications: false,
        canApproveApplications: false,
        canManageUsers: true,
        canViewAuditLog: true,
        canUploadDocuments: false
    }
};
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/Projects/tests/blcp/blcp-frontend/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$uuid$40$14$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/Projects/tests/blcp/blcp-frontend/node_modules/.pnpm/uuid@14.0.0/node_modules/uuid/dist-node/v4.js [app-route] (ecmascript) <export default as v4>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/tests/blcp/blcp-frontend/node_modules/.pnpm/bcryptjs@3.0.3/node_modules/bcryptjs/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/tests/blcp/blcp-frontend/lib/types.ts [app-route] (ecmascript)");
;
;
;
// In-memory database simulation
// In production, this would be a real database (PostgreSQL, etc.)
class Database {
    users = new Map();
    applications = new Map();
    documents = new Map();
    auditLog = [];
    applicationCounter = 0;
    constructor(){
        this.initializeSeedData();
    }
    async initializeSeedData() {
        // Create seed users - one per role
        const seedUsers = [
            {
                email: 'applicant@test.com',
                name: 'John Applicant',
                role: 'applicant',
                password: 'password123'
            },
            {
                email: 'reviewer@bnr.rw',
                name: 'Jane Reviewer',
                role: 'reviewer',
                password: 'password123'
            },
            {
                email: 'approver@bnr.rw',
                name: 'Bob Approver',
                role: 'approver',
                password: 'password123'
            },
            {
                email: 'admin@bnr.rw',
                name: 'Alice Admin',
                role: 'admin',
                password: 'password123'
            },
            {
                email: 'reviewer2@bnr.rw',
                name: 'Mike Reviewer',
                role: 'reviewer',
                password: 'password123'
            },
            {
                email: 'approver2@bnr.rw',
                name: 'Sarah Approver',
                role: 'approver',
                password: 'password123'
            }
        ];
        for (const userData of seedUsers){
            const passwordHash = await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(userData.password, 10);
            const user = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$uuid$40$14$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                email: userData.email,
                passwordHash,
                name: userData.name,
                role: userData.role,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isActive: true
            };
            this.users.set(user.id, user);
        }
        // Create seed applications in different states
        const applicant = Array.from(this.users.values()).find((u)=>u.role === 'applicant');
        const reviewer = Array.from(this.users.values()).find((u)=>u.role === 'reviewer');
        // Application 1: Under Review
        const app1 = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$uuid$40$14$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            referenceNumber: this.generateReferenceNumber(),
            applicantId: applicant.id,
            bankName: 'Rwanda Commercial Bank',
            bankType: 'commercial',
            businessAddress: '123 Kigali Business District, Kigali',
            contactEmail: 'info@rwandacommercial.rw',
            contactPhone: '+250 788 123 456',
            proposedCapital: 5000000000,
            businessPlan: 'We aim to provide innovative banking solutions to SMEs across Rwanda, focusing on digital-first approach and financial inclusion.',
            status: 'under_review',
            reviewerId: reviewer.id,
            approverId: null,
            reviewNotes: null,
            reviewRecommendation: null,
            approvalNotes: null,
            rejectionReason: null,
            additionalInfoRequest: null,
            createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            reviewedAt: null,
            decidedAt: null,
            version: 1
        };
        this.applications.set(app1.id, app1);
        // Application 2: Submitted (waiting for review)
        const app2 = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$uuid$40$14$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            referenceNumber: this.generateReferenceNumber(),
            applicantId: applicant.id,
            bankName: 'Kigali Microfinance Institution',
            bankType: 'microfinance',
            businessAddress: '456 Nyarugenge District, Kigali',
            contactEmail: 'contact@kigalimfi.rw',
            contactPhone: '+250 788 234 567',
            proposedCapital: 500000000,
            businessPlan: 'Microfinance institution focused on rural communities and agricultural lending.',
            status: 'submitted',
            reviewerId: null,
            approverId: null,
            reviewNotes: null,
            reviewRecommendation: null,
            approvalNotes: null,
            rejectionReason: null,
            additionalInfoRequest: null,
            createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
            updatedAt: new Date().toISOString(),
            submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            reviewedAt: null,
            decidedAt: null,
            version: 1
        };
        this.applications.set(app2.id, app2);
        // Add some sample documents
        const doc1 = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$uuid$40$14$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            applicationId: app1.id,
            name: 'Business_Plan_2024.pdf',
            type: 'application/pdf',
            size: 2500000,
            uploadedBy: applicant.id,
            uploadedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            version: 1,
            previousVersionId: null,
            isLatest: true,
            storagePath: `/documents/${app1.id}/business_plan_v1.pdf`
        };
        this.documents.set(doc1.id, doc1);
        const doc2 = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$uuid$40$14$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            applicationId: app1.id,
            name: 'Financial_Projections.xlsx',
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            size: 1200000,
            uploadedBy: applicant.id,
            uploadedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
            version: 1,
            previousVersionId: null,
            isLatest: true,
            storagePath: `/documents/${app1.id}/financial_projections_v1.xlsx`
        };
        this.documents.set(doc2.id, doc2);
    }
    generateReferenceNumber() {
        this.applicationCounter++;
        const year = new Date().getFullYear();
        return `BNR-${year}-${String(this.applicationCounter).padStart(5, '0')}`;
    }
    // User operations
    async createUser(userData) {
        const passwordHash = await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].hash(userData.password, 10);
        const user = {
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$uuid$40$14$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            email: userData.email,
            passwordHash,
            name: userData.name,
            role: userData.role,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isActive: userData.isActive
        };
        this.users.set(user.id, user);
        return this.toSafeUser(user);
    }
    getUserById(id) {
        return this.users.get(id);
    }
    getUserByEmail(email) {
        return Array.from(this.users.values()).find((u)=>u.email.toLowerCase() === email.toLowerCase());
    }
    getAllUsers() {
        return Array.from(this.users.values()).map((u)=>this.toSafeUser(u));
    }
    updateUser(id, updates) {
        const user = this.users.get(id);
        if (!user) return undefined;
        const updatedUser = {
            ...user,
            ...updates,
            updatedAt: new Date().toISOString()
        };
        this.users.set(id, updatedUser);
        return this.toSafeUser(updatedUser);
    }
    toSafeUser(user) {
        const { passwordHash, ...safeUser } = user;
        return safeUser;
    }
    // Application operations
    createApplication(data) {
        const application = {
            ...data,
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$uuid$40$14$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            referenceNumber: this.generateReferenceNumber(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            version: 1
        };
        this.applications.set(application.id, application);
        return application;
    }
    getApplicationById(id) {
        return this.applications.get(id);
    }
    getApplicationsByApplicant(applicantId) {
        return Array.from(this.applications.values()).filter((a)=>a.applicantId === applicantId).sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    getAllApplications() {
        return Array.from(this.applications.values()).sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    getApplicationsByStatus(status) {
        return Array.from(this.applications.values()).filter((a)=>a.status === status).sort((a, b)=>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
    // Update application with optimistic locking
    updateApplication(id, updates, expectedVersion) {
        const application = this.applications.get(id);
        if (!application) {
            return {
                success: false,
                error: 'Application not found'
            };
        }
        // Optimistic locking check for concurrent access
        if (application.version !== expectedVersion) {
            return {
                success: false,
                error: 'Concurrent modification detected. Please refresh and try again.'
            };
        }
        const updatedApplication = {
            ...application,
            ...updates,
            updatedAt: new Date().toISOString(),
            version: application.version + 1
        };
        this.applications.set(id, updatedApplication);
        return {
            success: true,
            application: updatedApplication
        };
    }
    // Validate state transition
    isValidTransition(currentStatus, newStatus) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["VALID_TRANSITIONS"][currentStatus].includes(newStatus);
    }
    // Document operations
    createDocument(data) {
        // If this is a new version, mark previous as not latest
        if (data.previousVersionId) {
            const prevDoc = this.documents.get(data.previousVersionId);
            if (prevDoc) {
                this.documents.set(prevDoc.id, {
                    ...prevDoc,
                    isLatest: false
                });
            }
        }
        const document = {
            ...data,
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$uuid$40$14$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            uploadedAt: new Date().toISOString()
        };
        this.documents.set(document.id, document);
        return document;
    }
    getDocumentById(id) {
        return this.documents.get(id);
    }
    getDocumentsByApplication(applicationId, includeAllVersions = false) {
        return Array.from(this.documents.values()).filter((d)=>d.applicationId === applicationId && (includeAllVersions || d.isLatest)).sort((a, b)=>new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    }
    getDocumentVersionHistory(documentId) {
        const doc = this.documents.get(documentId);
        if (!doc) return [];
        const versions = [
            doc
        ];
        let currentId = doc.previousVersionId;
        while(currentId){
            const prevDoc = this.documents.get(currentId);
            if (prevDoc) {
                versions.push(prevDoc);
                currentId = prevDoc.previousVersionId;
            } else {
                break;
            }
        }
        return versions;
    }
    // Audit Log operations - APPEND ONLY
    appendAuditLog(entry) {
        const auditEntry = {
            ...entry,
            id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$uuid$40$14$2e$0$2e$0$2f$node_modules$2f$uuid$2f$dist$2d$node$2f$v4$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
            timestamp: new Date().toISOString()
        };
        // Append only - no modification or deletion allowed
        this.auditLog.push(auditEntry);
        return auditEntry;
    }
    // Read-only access to audit log
    getAuditLog(filters) {
        let results = [
            ...this.auditLog
        ];
        if (filters) {
            if (filters.entityType) {
                results = results.filter((e)=>e.entityType === filters.entityType);
            }
            if (filters.entityId) {
                results = results.filter((e)=>e.entityId === filters.entityId);
            }
            if (filters.userId) {
                results = results.filter((e)=>e.userId === filters.userId);
            }
            if (filters.action) {
                results = results.filter((e)=>e.action === filters.action);
            }
            if (filters.startDate) {
                results = results.filter((e)=>e.timestamp >= filters.startDate);
            }
            if (filters.endDate) {
                results = results.filter((e)=>e.timestamp <= filters.endDate);
            }
        }
        return results.sort((a, b)=>new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }
    getAuditLogForApplication(applicationId) {
        return this.getAuditLog({
            entityType: 'application',
            entityId: applicationId
        });
    }
    // Verify password
    async verifyPassword(plainPassword, hashedPassword) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$bcryptjs$40$3$2e$0$2e$3$2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].compare(plainPassword, hashedPassword);
    }
}
const db = new Database();
}),
"[project]/Projects/tests/blcp/blcp-frontend/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authenticateUser",
    ()=>authenticateUser,
    "canApproveApplication",
    ()=>canApproveApplication,
    "clearAuthCookie",
    ()=>clearAuthCookie,
    "createToken",
    ()=>createToken,
    "getAuthToken",
    ()=>getAuthToken,
    "getCurrentUser",
    ()=>getCurrentUser,
    "getPermissions",
    ()=>getPermissions,
    "hasPermission",
    ()=>hasPermission,
    "setAuthCookie",
    ()=>setAuthCookie,
    "verifyToken",
    ()=>verifyToken
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/tests/blcp/blcp-frontend/node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jwt/sign.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/tests/blcp/blcp-frontend/node_modules/.pnpm/jose@6.2.3/node_modules/jose/dist/webapi/jwt/verify.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/tests/blcp/blcp-frontend/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/headers.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/tests/blcp/blcp-frontend/lib/types.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/tests/blcp/blcp-frontend/lib/db.ts [app-route] (ecmascript)");
;
;
;
;
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-super-secret-key-change-in-production');
const TOKEN_EXPIRY = '8h';
const COOKIE_NAME = 'auth_token';
async function createToken(user) {
    const token = await new __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$sign$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SignJWT"]({
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role
    }).setProtectedHeader({
        alg: 'HS256'
    }).setIssuedAt().setExpirationTime(TOKEN_EXPIRY).sign(JWT_SECRET);
    return token;
}
async function verifyToken(token) {
    try {
        const { payload } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$jose$40$6$2e$2$2e$3$2f$node_modules$2f$jose$2f$dist$2f$webapi$2f$jwt$2f$verify$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["jwtVerify"])(token, JWT_SECRET);
        return payload;
    } catch  {
        return null;
    }
}
async function setAuthCookie(token) {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: ("TURBOPACK compile-time value", "development") === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 8,
        path: '/'
    });
}
async function clearAuthCookie() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete(COOKIE_NAME);
}
async function getAuthToken() {
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
    return cookieStore.get(COOKIE_NAME)?.value;
}
async function getCurrentUser() {
    const token = await getAuthToken();
    if (!token) return null;
    const payload = await verifyToken(token);
    if (!payload) return null;
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getUserById(payload.userId);
    if (!user || !user.isActive) return null;
    return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isActive: user.isActive
    };
}
function getPermissions(role) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROLE_PERMISSIONS"][role];
}
function hasPermission(role, permission) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$types$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ROLE_PERMISSIONS"][role][permission];
}
function canApproveApplication(userId, applicationReviewerId) {
    // If the current user reviewed this application, they cannot approve it
    if (applicationReviewerId === userId) {
        return false;
    }
    return true;
}
async function authenticateUser(email, password) {
    const user = __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getUserByEmail(email);
    if (!user) {
        return {
            success: false,
            error: 'Invalid email or password'
        };
    }
    if (!user.isActive) {
        return {
            success: false,
            error: 'Account is deactivated'
        };
    }
    const isValidPassword = await __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].verifyPassword(password, user.passwordHash);
    if (!isValidPassword) {
        return {
            success: false,
            error: 'Invalid email or password'
        };
    }
    const safeUser = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        isActive: user.isActive
    };
    const token = await createToken(safeUser);
    // Log the login action
    __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].appendAuditLog({
        userId: user.id,
        userEmail: user.email,
        userName: user.name,
        userRole: user.role,
        action: 'user_login',
        entityType: 'user',
        entityId: user.id,
        stateBefore: null,
        stateAfter: null,
        metadata: JSON.stringify({
            loginTime: new Date().toISOString()
        }),
        ipAddress: null,
        userAgent: null
    });
    return {
        success: true,
        user: safeUser,
        token
    };
}
}),
"[project]/Projects/tests/blcp/blcp-frontend/app/api/applications/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/tests/blcp/blcp-frontend/node_modules/.pnpm/next@16.1.6_@babel+core@7.29.0_react-dom@19.2.6_react@19.2.6__react@19.2.6/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/tests/blcp/blcp-frontend/lib/auth.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Projects/tests/blcp/blcp-frontend/lib/db.ts [app-route] (ecmascript)");
;
;
;
async function GET(request, { params }) {
    try {
        const user = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getCurrentUser"])();
        const { id } = await params;
        if (!user) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Unauthorized'
            }, {
                status: 403
            });
        }
        const application = __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getApplicationById(id);
        if (!application) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Application not found'
            }, {
                status: 404
            });
        }
        // Check permissions
        if (user.role === 'applicant' && application.applicantId !== user.id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Forbidden'
            }, {
                status: 403
            });
        }
        if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["hasPermission"])(user.role, 'canViewAllApplications') && application.applicantId !== user.id) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                success: false,
                error: 'Forbidden'
            }, {
                status: 403
            });
        }
        // Enrich with user info
        const applicant = __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getUserById(application.applicantId);
        const reviewer = application.reviewerId ? __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getUserById(application.reviewerId) : null;
        const approver = application.approverId ? __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getUserById(application.approverId) : null;
        // Get documents
        const documents = __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getDocumentsByApplication(application.id);
        // Get audit log for this application
        const auditLog = __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].getAuditLogForApplication(application.id);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            application: {
                ...application,
                applicantName: applicant?.name || 'Unknown',
                applicantEmail: applicant?.email || 'Unknown',
                reviewerName: reviewer?.name || null,
                reviewerEmail: reviewer?.email || null,
                approverName: approver?.name || null,
                approverEmail: approver?.email || null
            },
            documents,
            auditLog
        });
    } catch (error) {
        console.error('Get application error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$Projects$2f$tests$2f$blcp$2f$blcp$2d$frontend$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$6_$40$babel$2b$core$40$7$2e$29$2e$0_react$2d$dom$40$19$2e$2$2e$6_react$40$19$2e$2$2e$6_$5f$react$40$19$2e$2$2e$6$2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            error: 'Internal server error'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__7cef8194._.js.map