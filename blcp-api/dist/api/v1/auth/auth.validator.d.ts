import zod from "zod";
export declare const LoginSchema: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, zod.core.$strip>;
export declare const RefreshTokenSchema: zod.ZodObject<{
    refreshToken: zod.ZodString;
}, zod.core.$strip>;
//# sourceMappingURL=auth.validator.d.ts.map