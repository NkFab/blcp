import request from "supertest";
import app from "./app";

describe("App", () => {
  const server = request(app);
  it("should return Hello World!", async () => {
    const res = await server.get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual("Hello World!");
  });

  it("should return status ok for health check", async () => {
    const res = await server.get("/api/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({ status: "ok" });
  });
});
