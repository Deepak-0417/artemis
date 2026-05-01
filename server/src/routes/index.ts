import { Router } from "express";
import { codesRouter } from "./codes.js";
import { costCentersRouter } from "./costCenters.js";
import { glMappingsRouter } from "./glMappings.js";
import { healthRouter } from "./health.js";

export const apiRouter = Router();

apiRouter.use("/health", healthRouter);
apiRouter.use("/", codesRouter);
apiRouter.use("/", costCentersRouter);
apiRouter.use("/", glMappingsRouter);
