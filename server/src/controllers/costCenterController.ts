import type { RequestHandler } from "express";
import { getCostCenterTables } from "../services/costCenterService.js";

const getCompany = (value: unknown) =>
  typeof value === "string" && value.trim() ? value.trim() : null;

export const listCostCenterTables: RequestHandler = async (req, res) => {
  const co = getCompany(req.query.co);

  if (!co) {
    res.status(400).json({ error: "co query parameter is required" });
    return;
  }

  try {
    res.json(await getCostCenterTables(co));
  } catch (error) {
    console.error("Failed to load cost center tables", error);
    res.status(500).json({ error: "Failed to load cost center tables" });
  }
};
