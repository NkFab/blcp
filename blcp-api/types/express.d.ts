import { User } from "../src/database/entity";

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export {};
