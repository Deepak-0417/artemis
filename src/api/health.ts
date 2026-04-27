import { apiClient } from "./client";
import type { HealthResponse } from "@shared/api";

export const getHealth = () => apiClient<HealthResponse>("/health");
