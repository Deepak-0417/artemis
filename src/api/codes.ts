import { apiClient } from "./client";
import type { CodeRow } from "@shared/api";

const withCompany = (path: string, co: string) =>
  `${path}?co=${encodeURIComponent(co)}`;

export const getEarningCodes = (co: string) =>
  apiClient<CodeRow[]>(withCompany("/earning-codes", co));

export const getDeductionCodes = (co: string) =>
  apiClient<CodeRow[]>(withCompany("/deduction-codes", co));
