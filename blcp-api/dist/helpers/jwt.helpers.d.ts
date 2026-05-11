import { UserRole } from "../database/entity/User";
export interface JwtPayload {
    userId: string;
    email: string;
    role: UserRole;
}
export declare const generateTokens: (payload: JwtPayload) => {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
};
export declare const verifyAccessToken: (token: string) => JwtPayload;
export declare const verifyRefreshToken: (token: string) => {
    userId: string;
};
//# sourceMappingURL=jwt.helpers.d.ts.map