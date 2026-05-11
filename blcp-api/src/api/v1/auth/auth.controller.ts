import { Token } from "../../../database/entity/Token";
import { User } from "../../../database/entity/User";
import { MainModel } from "../../../database/main.model";
import HttpError, { asyncRouterHandler } from "../../../helpers/express.helper";
import {
  generateTokens,
  verifyRefreshToken,
} from "../../../helpers/jwt.helpers";
import { LoginSchema, RefreshTokenSchema } from "./auth.validator";

class AuthController extends MainModel<User> {
  tokenRepo = this.dataSource.getRepository(Token);
  constructor() {
    super(User);
  }

  login = asyncRouterHandler(async (req, res) => {
    const payload = LoginSchema.parse(req.body);
    const user = await this.dataSource
      .getRepository(this.repository)
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email: payload.email })
      .getOne();

    if (!user) {
      throw new HttpError("Invalid credentials", 401);
    }

    const isValidPassword = await user.comparePassword(payload.password);

    if (!isValidPassword) {
      throw new HttpError("Invalid credentials", 401);
    }

    const tokens = await this.generateAndSaveTokens(user);
    return res.json(tokens);
  });

  refreshToken = asyncRouterHandler(async (req, res) => {
    const payload = RefreshTokenSchema.parse(req.body);

    const existingToken = await this.tokenRepo.findOneBy({
      token: payload.refreshToken,
    });

    if (!existingToken || existingToken.expiresAt < new Date()) {
      throw new HttpError("Invalid refresh token", 401);
    }

    const refreshTokenPayload = verifyRefreshToken(payload.refreshToken);
    const user = await this.findById(refreshTokenPayload.userId);
    if (!user) {
      throw new HttpError("Invalid refresh token", 401);
    }
    await this.tokenRepo.delete({ id: existingToken.id });

    const tokens = await this.generateAndSaveTokens(user);
    return res.json(tokens);
  });

  logout = asyncRouterHandler(async (req, res) => {
    const { id } = req.user;
    await this.tokenRepo.delete({ userId: id });
    return res.json({ message: "Logged out successfully" });
  });

  getCurrentUser = asyncRouterHandler(async (req, res) => {
    return res.json(req.user);
  });

  private async generateAndSaveTokens(user: User) {
    const tokens = generateTokens({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // save new refresh token
    await this.tokenRepo.save(
      this.tokenRepo.create({
        token: tokens.refreshToken,
        userId: user.id,
        expiresAt: new Date(new Date().getTime() + tokens.expiresIn),
      }),
    );

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }
}

export default new AuthController();
