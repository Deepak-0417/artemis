import { Router } from "express";
import {
  listDeductionCodes,
  listEarningCodes,
} from "../controllers/codeController.js";

export const codesRouter = Router();

codesRouter.get("/earning-codes", listEarningCodes);
codesRouter.get("/deduction-codes", listDeductionCodes);
