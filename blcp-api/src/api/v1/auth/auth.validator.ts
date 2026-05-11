import zod from "zod";

export const LoginSchema = zod.object({
  email: zod
    .string()
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email format",
    ),
  password: zod.string().min(6),
});

export const RefreshTokenSchema = zod.object({
  refreshToken: zod.string(),
});
