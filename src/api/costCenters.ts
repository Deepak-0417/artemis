import { apiClient } from "./client";
import type { CostCenterTable } from "@shared/api";

const withCompany = (path: string, co: string) =>
  `${path}?co=${encodeURIComponent(co)}`;

export const getCostCenterTables = (co: string) =>
  apiClient<CostCenterTable[]>(withCompany("/cost-center-tables", co));
