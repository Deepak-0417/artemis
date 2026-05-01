import { apiClient } from "./client";
import type {
  SaveGLMappingsRequest,
  SaveGLMappingsResponse,
} from "@shared/api";

export const saveGLMappings = (body: SaveGLMappingsRequest) =>
  apiClient<SaveGLMappingsResponse>("/gl-mappings", {
    method: "POST",
    body: JSON.stringify(body),
  });
