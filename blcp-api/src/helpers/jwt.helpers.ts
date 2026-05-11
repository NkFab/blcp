import jsonwebtoken from "jsonwebtoken";
import { UserRole } from "../database/entity/User";

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export const generateTokens = (payload: JwtPayload) => {
  const accessToken = jsonwebtoken.sign(
    payload,
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "60m" },
  );

  const expiresIn = 60 * 60 * 24 * 1000; // 1 day in milliseconds
  const refreshToken = jsonwebtoken.sign(
    { userId: payload.userId },
    process.env.JWT_REFRESH_SECRET!,
    {
      expiresIn,
    },
  );

  return { accessToken, refreshToken, expiresIn };
};

export const verifyAccessToken = (token: string): JwtPayload => {
  return jsonwebtoken.verify(
    token,
    process.env.JWT_ACCESS_SECRET!,
  ) as JwtPayload;
};

export const verifyRefreshToken = (token: string): { userId: string } => {
  return jsonwebtoken.verify(token, process.env.JWT_REFRESH_SECRET!) as {
    userId: string;
  };
};
