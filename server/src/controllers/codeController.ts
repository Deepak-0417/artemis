import type { RequestHandler } from "express";
import {
  getDeductionCodes,
  getEarningCodes,
} from "../services/codeService.js";

const getCompany = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim() : null;

export const listEarningCodes: RequestHandler = async (req, res) => {
  const co = getCompany(req.query.co);

  if (!co) {
    res.status(400).json({ error: "co query parameter is required" });
    return;
  }

  try {
    res.json(await getEarningCodes(co));
  } catch (error) {
    console.error("Failed to load earning codes", error);
    res.status(500).json({ error: "Failed to load earning codes" });
  }
};

export const listDeductionCodes: RequestHandler = async (req, res) => {
  const co = getCompany(req.query.co);

  if (!co) {
    res.status(400).json({ error: "co query parameter is required" });
    return;
  }

  try {
    res.json(await getDeductionCodes(co));
  } catch (error) {
    console.error("Failed to load deduction codes", error);
    res.status(500).json({ error: "Failed to load deduction codes" });
  }
};
