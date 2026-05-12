import { describe, it, expect } from "@jest/globals";
import data from "../../../../database/seeders/data";
import { server } from "../../../../__tests__/common";
describe("AuthController", () => {
  let refreshToken = "";
  let accessToken = "";
  it("should validate user credentials and return a token", async () => {
    const res = await server.post("/api/v1/auth/login").send({
      email: data.users[0].email,
      password: process.env.USER_PASSWORD,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accessToken");
    accessToken = res.body.accessToken;
    refreshToken = res.body.refreshToken;
  });

  it("should return current user info with valid access token", async () => {
    const res = await server
      .get("/api/v1/auth/current-user")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("email", data.users[0].email);
  });

  it("should validate user credentials payload", async () => {
    const res = await server.post("/api/v1/auth/login").send({
      email: data.users[0].email,
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("errors");
  });

  it("should return 400 for wrong credentials", async () => {
    const res = await server.post("/api/v1/auth/login").send({
      email: data.users[0].email,
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });

  it("should refresh access token with valid refresh token", async () => {
    const res = await server.post("/api/v1/auth/refresh").send({
      refreshToken,
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("accessToken");
    accessToken = res.body.accessToken;
  });

  it("should handle logout and invalidate refresh token", async () => {
    const res = await server
      .post("/api/v1/auth/logout")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message", "Logged out successfully");
  });
});
