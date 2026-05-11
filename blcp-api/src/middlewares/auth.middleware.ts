import type { Request, Response, NextFunction } from "express";
import HttpError from "../helpers/express.helper";
import { verifyAccessToken } from "../helpers/jwt.helpers";
import { AppDataSource } from "../database";
import { User } from "../database/entity";
import { UserRole } from "../database/entity/User";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) {
      throw new HttpError("Authorization header missing", 401);
    }

    const token = header.split(" ")[1];
    if (!token) {
      throw new HttpError("Token missing", 401);
    }

    const tokenPayload = verifyAccessToken(token);
    const user = await AppDataSource.getRepository(User).findOneBy({
      id: tokenPayload.userId,
    });

    if (!user) {
      throw new HttpError("Invalid access token", 401);
    }

    req["user"] = user;
    next();
  } catch (error) {
    const err = error as HttpError;
    return res.status(err.statusCode || 500).json({
      error: err.message || "Internal Server Error",
    });
  }
};

const recordBelongsToCurrentUser = (
  req: Request,
  userIdKey: string,
): boolean => {
  const userIds = [req.params[userIdKey], req.body[userIdKey]].filter(Boolean);
  return userIds.includes(req.user?.id);
};

const currentUserHasRole = (
  req: Request,
  roles: (UserRole | "self")[],
): boolean => {
  return roles.includes(req.user?.role as UserRole);
};

export const authorize = ({
  roles,
  userIdKey = "id",
}: {
  roles: (UserRole | "self")[];
  userIdKey?: string;
}) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const hasSelfRole = roles.includes("self");
    const isSelf = hasSelfRole && recordBelongsToCurrentUser(req, userIdKey);
    const hasRole = currentUserHasRole(req, roles);

    if (isSelf || hasRole) {
      return next();
    }

    return res.status(403).json({ message: "Unauthorized" });
  };
};
