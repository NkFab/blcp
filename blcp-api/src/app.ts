import express from "express";
import type { Express } from "express";
import type { Request, Response } from "express";
import { v1 } from "./api";

const app: Express = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.use("/api/v1", v1);

export default app;
