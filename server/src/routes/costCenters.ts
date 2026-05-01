import { Router } from "express";
import { listCostCenterTables } from "../controllers/costCenterController.js";

export const costCentersRouter = Router();

costCentersRouter.get("/cost-center-tables", listCostCenterTables);
