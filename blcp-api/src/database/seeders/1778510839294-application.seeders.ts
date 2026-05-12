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

    const [reviewer, supervisor, applicant] = await Promise.all([
      userRepo.findOne({ where: { role: UserRole.REVIEWER } }),
      userRepo.findOne({ where: { role: UserRole.SUPERVISOR } }),
      userRepo.findOne({ where: { role: UserRole.APPLICANT } }),
    ]);

    const applicationData = data.applications.map((item) => {
      if (item.status === ApplicationStatus.REVIEWED) {
        return {
          ...item,
          reviewerId: reviewer?.id ?? null,
          reviewRecommendation: ReviewRecommendation.RECOMMEND_APPROVAL,
          reviewComment: "Looks good to me.",
          reviewedAt: new Date(),
        };
      }

      if (item.status === ApplicationStatus.APPROVED) {
        return {
          ...item,
          reviewerId: reviewer?.id ?? null, // approved implies reviewed
          reviewRecommendation: ReviewRecommendation.RECOMMEND_APPROVAL,
          reviewComment: "Looks good to me.",
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

    const applications = repo.create(
      applicationData as DeepPartial<Application>[],
    );
    await repo.save(applications);
  } catch (error) {
    console.error("Error seeding applications:", error);
    throw error;
  }
};
