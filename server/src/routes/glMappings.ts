import { Router } from "express";
import { createGLMappings } from "../controllers/glMappingController.js";

export const glMappingsRouter = Router();

glMappingsRouter.post("/gl-mappings", createGLMappings);
