import { DeepPartial, EntityManager } from "typeorm";
import {
  Application,
  ApplicationStatus,
  ReviewRecommendation,
  User,
  UserRole,
} from "../entity";
import data from "./data";

export default async (manager: EntityManager) => {
  try {
    const repo = manager.getRepository(Application);
    const userRepo = manager.getRepository(User);

    const reviewer = await userRepo.findOne({
      where: { role: UserRole.REVIEWER },
    });
    const supervisor = await userRepo.findOne({
      where: { role: UserRole.SUPERVISOR },
    });
    const applicant = await userRepo.findOne({
      where: { role: UserRole.APPLICANT },
    });

    const applicationData = data.applications.map((item) => {
      if (item.status === ApplicationStatus.REVIEWED) {
        return {
          ...item,
          applicantId: applicant?.id ?? null,
          reviewerId: reviewer?.id ?? null,
          reviewRecommendation: ReviewRecommendation.RECOMMEND_APPROVAL,
          reviewComment: "Recommended for approval.",
          reviewedAt: new Date(),
        };
      }

      if (item.status === ApplicationStatus.APPROVED) {
        return {
          ...item,
          applicantId: applicant?.id ?? null,
          reviewerId: reviewer?.id ?? null,
          reviewRecommendation: ReviewRecommendation.RECOMMEND_APPROVAL,
          reviewComment: "Recommended for approval.",
          reviewedAt: new Date(),
          approverId: supervisor?.id ?? null,
          approvedAt: new Date(),
          updatedAt: new Date(),
        };
      }

      return {
        ...item,
        applicantId: applicant?.id ?? null,
      };
    });

    for (const item of applicationData) {
      const existing = await repo.findOne({
        where: { referenceNumber: item.referenceNumber },
      });

      if (existing) {
        continue;
      }

      await repo.save(repo.create(item as DeepPartial<Application>));
    }
  } catch (error) {
    console.error("Error seeding applications:", error);
    throw error;
  }
};
