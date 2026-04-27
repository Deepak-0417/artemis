import cors from "cors";
import express from "express";
import { apiRouter } from "./routes/index.js";

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use("/api", apiRouter);

  app.use((_req, res) => {
    res.status(404).json({
      error: "Not found",
    });
  });

  return app;
};
