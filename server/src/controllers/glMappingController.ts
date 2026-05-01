import type { RequestHandler } from "express";
import { saveGLMappings } from "../services/glMappingService.js";

export const createGLMappings: RequestHandler = async (req, res) => {
  try {
    const result = await saveGLMappings(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("Failed to save GL mappings", error);
    res.status(400).json({ error: "Failed to save GL mappings" });
  }
};
