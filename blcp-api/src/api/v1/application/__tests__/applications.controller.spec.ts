import { afterEach, describe, expect, it, jest } from "@jest/globals";
import { ApplicationStatus, UserRole } from "../../../../database/entity";
import { getAuthToken, server } from "../../../../__tests__/common";
import { appEventEmitter } from "../../../../events";
import { beforeEach } from "node:test";

const newApplicationPayload = {
  referenceNumber: new Date().getTime().toString(),
  institutionName: "ABC Bank",
  institutionType: "commercial_bank",
  capitalAmount: 50000000000000,
  licenceType: "commercial_licence",
  status: "draft",
  documents: [
    {
      fileType: "image",
      url: "https://storage.example.com/uploads/photo.jpg",
      originalFileName: "photo.jpg",
      type: "SOURCE_OF_FUNDS",
      mimeType: "image/jpeg",
      fileSize: 204800,
    },
  ],
};

jest.mock("../../../../events", () => {
  const originalModule =
    jest.requireActual<typeof import("../../../../events")>(
      "../../../../events",
    );
  return {
    ...originalModule,
    appEventEmitter: {
      ...originalModule.appEventEmitter,
      emit: jest.fn(),
    },
  };
});

describe("ApplicationsController", () => {
  let createdApplicationId: string = "";
  let emitMock: jest.Mock = appEventEmitter.emit as jest.Mock;

  beforeEach(() => {
    emitMock = appEventEmitter.emit as jest.Mock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("Applicant Actons", () => {
    const applicationToken = getAuthToken(UserRole.APPLICANT);
    describe("GET /applications", () => {
      it("should return a list of applications for the authenticated user", async () => {
        const res = await server
          .get("/api/v1/applications")
          .set("Authorization", `Bearer ${applicationToken}`);

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.data)).toBe(true);
      });

      it("should return 401 if no auth token is provided", async () => {
        const res = await server.get("/api/v1/applications");
        expect(res.statusCode).toEqual(401);
      });

      it("should not access applications of other users", async () => {
        // try to access the application with a different user token
        const reviewerToken = getAuthToken(UserRole.REVIEWER);
        const getRes = await server
          .get(`/api/v1/applications/6f0161d2-8690-4ff2-bd33-77b72d739074`)
          .set("Authorization", `Bearer ${reviewerToken}`);

        expect(getRes.statusCode).toEqual(404);
      });
    });

    describe("POST /applications", () => {
      it("should validate application payload and reject invalid data", async () => {
        const res = await server
          .post("/api/v1/applications")
          .send({
            name: "Test App",
            description: "A test application",
            ownerId: "invalid-uuid",
          })
          .set("Authorization", `Bearer ${applicationToken}`)
          .set("Content-Type", "application/json");

        expect(res.statusCode).toEqual(400);
        expect(res.body).toHaveProperty("errors");
      });

      it("should create a new application with valid data", async () => {
        const res = await server
          .post("/api/v1/applications")
          .send(newApplicationPayload)
          .set("Authorization", `Bearer ${applicationToken}`)
          .set("Content-Type", "application/json");

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("id");
        expect(res.body.referenceNumber).toEqual(
          newApplicationPayload.referenceNumber,
        );
        expect(res.body.institutionName).toEqual(
          newApplicationPayload.institutionName,
        );
        expect(res.body.institutionType).toEqual(
          newApplicationPayload.institutionType,
        );
        expect(res.body.capitalAmount).toEqual(
          newApplicationPayload.capitalAmount,
        );
        expect(res.body.licenceType).toEqual(newApplicationPayload.licenceType);
        expect(res.body.status).toEqual(newApplicationPayload.status);
        expect(res.body.documents).toHaveLength(
          newApplicationPayload.documents.length,
        );

        expect(emitMock).toHaveBeenCalledWith(
          "application:audit",
          expect.objectContaining({
            action: "create",
            applicationId: res.body.id,
            userId: res.body.applicantId,
            snapshot: {
              before: null,
              after: expect.objectContaining({
                id: res.body.id,
                status: newApplicationPayload.status,
              }),
            },
          }),
        );
        createdApplicationId = res.body.id;
      });
      it("should validate version on application submission and reject if version is outdated", async () => {
        const res = await server
          .put(`/api/v1/applications/${createdApplicationId}`)
          .send({
            status: "submitted",
          })
          .set("Authorization", `Bearer ${applicationToken}`)
          .set("Content-Type", "application/json");
        expect(res.statusCode).toEqual(400);
      });

      it("should not accept update with stale version", async () => {
        const res = await server
          .put(`/api/v1/applications/${createdApplicationId}`)
          .send({
            status: "submitted",
            version: 30030, // simulate stale version
          })
          .set("Authorization", `Bearer ${applicationToken}`)
          .set("Content-Type", "application/json");
        expect(res.statusCode).toEqual(409);
      });

      it("should update the application status to submit, and increment the version on update", async () => {
        const res = await server
          .put(`/api/v1/applications/${createdApplicationId}`)
          .send({
            status: "submitted",
            version: 1,
          })
          .set("Authorization", `Bearer ${applicationToken}`)
          .set("Content-Type", "application/json");

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty("id");
        expect(res.body.id).toEqual(createdApplicationId);
        expect(res.body.status).toEqual("submitted");

        expect(emitMock).toHaveBeenCalledWith(
          "application:audit",
          expect.objectContaining({
            action: "update",
            applicationId: createdApplicationId,
            userId: res.body.applicantId,
            snapshot: {
              before: expect.objectContaining({
                id: createdApplicationId,
                status: "draft",
                version: 1,
              }),
              after: expect.objectContaining({
                id: createdApplicationId,
                status: "submitted",
                version: 2,
              }),
            },
          }),
        );
      });
    });
  });

  describe("Reviewer Actions", () => {
    const reviewerToken = getAuthToken(UserRole.REVIEWER);
    let applicationForReview: Record<string, unknown> = {};

    it("should return a list of applications for review", async () => {
      const res = await server
        .get("/api/v1/applications")
        .set("Authorization", `Bearer ${reviewerToken}`);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      applicationForReview = res.body.data.find(
        (app: Record<string, unknown>) =>
          app.status === ApplicationStatus.SUBMITTED,
      );
      expect(applicationForReview).toBeDefined();
    });

    it("should review an application and update its status to reviewed", async () => {
      const res = await server
        .put(`/api/v1/applications/${applicationForReview.id}/review`)
        .send({
          reviewComment: "Hello world",
          reviewRecommendation: "recommended_approval",
          version: applicationForReview.version,
        })
        .set("Authorization", `Bearer ${reviewerToken}`)
        .set("Content-Type", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body.id).toEqual(applicationForReview.id);
      expect(res.body.status).toEqual("reviewed");
      expect(emitMock).toHaveBeenCalledWith(
        "application:audit",
        expect.objectContaining({
          action: "review",
          applicationId: applicationForReview.id,
          userId: res.body.reviewerId,
          snapshot: {
            before: expect.objectContaining({
              id: applicationForReview.id,
              status: "submitted",
              version: applicationForReview.version,
            }),
            after: expect.objectContaining({
              id: applicationForReview.id,
              status: "reviewed",
              version: (applicationForReview.version as number) + 1,
            }),
          },
        }),
      );
    });

    it("should not review an application with stale version", async () => {
      const res = await server
        .put(`/api/v1/applications/${applicationForReview.id}/review`)
        .send({
          reviewComment: "Hello world",
          reviewRecommendation: "recommended_approval",
          version: (applicationForReview.version as number) - 1,
        })
        .set("Authorization", `Bearer ${reviewerToken}`)
        .set("Content-Type", "application/json");

      expect(res.statusCode).toEqual(409);
    });
  });

  describe("Approver Actions", () => {
    const approverToken = getAuthToken(UserRole.SUPERVISOR);
    let applicationForApproval: Record<string, unknown> = {};

    it("should return a list of applications for approval", async () => {
      const res = await server
        .get("/api/v1/applications")
        .set("Authorization", `Bearer ${approverToken}`);

      expect(res.statusCode).toEqual(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      applicationForApproval = res.body.data.find(
        (app: Record<string, unknown>) => app.status === "reviewed",
      );
      expect(applicationForApproval).toBeDefined();
    });

    it("should approve an application and update its status to approved", async () => {
      const res = await server
        .put(`/api/v1/applications/${applicationForApproval.id}/approve`)
        .send({
          approvalComment: "This is looking good",
          status: "approved",
          version: applicationForApproval.version,
        })
        .set("Authorization", `Bearer ${approverToken}`)
        .set("Content-Type", "application/json");

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("id");
      expect(res.body.id).toEqual(applicationForApproval.id);
      expect(res.body.status).toEqual("approved");
      expect(emitMock).toHaveBeenCalledWith(
        "application:audit",
        expect.objectContaining({
          action: "approve",
          applicationId: applicationForApproval.id,
          userId: res.body.approverId,
          snapshot: {
            before: expect.objectContaining({
              id: applicationForApproval.id,
              status: "reviewed",
              version: applicationForApproval.version,
            }),
            after: expect.objectContaining({
              id: applicationForApproval.id,
              status: "approved",
              version: (applicationForApproval.version as number) + 1,
            }),
          },
        }),
      );
    });

    it("should not approve an application with stale version", async () => {
      const res = await server
        .put(`/api/v1/applications/${applicationForApproval.id}/approve`)
        .send({
          approvalComment: "This is looking good",
          status: "approved",
          version: (applicationForApproval.version as number) - 1,
        })
        .set("Authorization", `Bearer ${approverToken}`)
        .set("Content-Type", "application/json");

      expect(res.statusCode).toEqual(409);
    });
  });

  describe("Concurrent Update Handling", () => {
    const reviewerToken = getAuthToken(UserRole.REVIEWER);
    it("should handle concurrent review updates gracefully and return 409 status code", async () => {
      const [request1, request2] = await Promise.all([
        server
          .put(`/api/v1/applications/${createdApplicationId}/review`)
          .send({
            reviewComment: "Concurrent review 1",
            reviewRecommendation: "recommended_approval",
            version: 2,
          })
          .set("Authorization", `Bearer ${reviewerToken}`)
          .set("Content-Type", "application/json"),
        server
          .put(`/api/v1/applications/${createdApplicationId}/review`)
          .send({
            reviewComment: "Concurrent review 2",
            reviewRecommendation: "recommended_rejection",
            version: 2,
          })
          .set("Authorization", `Bearer ${reviewerToken}`)
          .set("Content-Type", "application/json"),
      ]);

      // the first request should success
      expect(request1.statusCode).toEqual(200);
      // the second request should fail with 409 due to version conflict
      expect(request2.statusCode).toEqual(409);
    });

    it("should handle concurrent approval updates gracefully and return 409 status code", async () => {
      const approverToken = getAuthToken(UserRole.SUPERVISOR);
      const [request1, request2] = await Promise.all([
        server
          .put(`/api/v1/applications/${createdApplicationId}/approve`)
          .send({
            approvalComment: "Concurrent approval 1",
            status: "approved",
            version: 3,
          })
          .set("Authorization", `Bearer ${approverToken}`)
          .set("Content-Type", "application/json"),
        server
          .put(`/api/v1/applications/${createdApplicationId}/approve`)
          .send({
            approvalComment: "Concurrent approval 2",
            status: "rejected",
            version: 3,
          })
          .set("Authorization", `Bearer ${approverToken}`)
          .set("Content-Type", "application/json"),
      ]);

      // the first request should success
      expect(request1.statusCode).toEqual(200);
      // the second request should fail with 409 due to version conflict
      expect(request2.statusCode).toEqual(409);
    });
  });
});
