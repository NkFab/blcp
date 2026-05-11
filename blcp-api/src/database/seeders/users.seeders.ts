import { DataSource } from "typeorm";
import { User, UserRole } from "../entity/User";

export default async (datasource: DataSource) => {
  try {
    const repo = datasource.getRepository(User);

    const users = repo.create([
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
    ]);

    await repo.save(users);
    console.log("✅ Seeded users");
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
};
