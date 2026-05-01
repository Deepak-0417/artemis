import type { CodeRow, CostCenterTable } from "@shared/api";

export type { CodeRow, CostCenterTable };

export const earningCodes: CodeRow[] = [
  { code: "1", description: "Salary" },
  { code: "12DD", description: "Total Health Care Cost" },
  { code: "2", description: "Regular Hours" },
  { code: "3", description: "Overtime Hours" },
  { code: "B", description: "Bonus" },
  { code: "Bar", description: "Bartender" },
  { code: "BarB", description: "Barback" },
  { code: "Bus", description: "Busser" },
  { code: "Srv", description: "Server" },
  { code: "Hst", description: "Host" },
  { code: "Cook", description: "Line Cook" },
  { code: "Dish", description: "Dishwasher" },
];

export const deductionCodes: CodeRow[] = [
  { code: "401K", description: "401K Contribution" },
  { code: "FED", description: "Federal Tax" },
  { code: "MED", description: "Medicare" },
  { code: "SS", description: "Social Security" },
  { code: "HLTH", description: "Health Insurance" },
  { code: "UNIF", description: "Uniform Deduction" },
  { code: "DENT", description: "Dental Insurance" },
  { code: "VIS", description: "Vision Insurance" },
];

export type CostCenterTable = {
  id: string;
  name: string;
  accounts: { num: string; name: string }[];
};

export const costCenterTables: CostCenterTable[] = [
  {
    id: "CC1",
    name: "CC1 - Front of House",
    accounts: [
      { num: "1", name: "Front Door" },
      { num: "2", name: "Main Dining Room" },
      { num: "3", name: "Patio" },
      { num: "4", name: "Bar Area" },
      { num: "5", name: "Restrooms" },
    ],
  },
  {
    id: "CC2",
    name: "CC2 - Back of House",
    accounts: [
      { num: "1", name: "Kitchen" },
      { num: "2", name: "Prep Area" },
      { num: "3", name: "Line 1" },
      { num: "4", name: "Line 2" },
      { num: "5", name: "Dishwashing" },
      { num: "6", name: "Walk-in Cooler" },
      { num: "7", name: "Storage" },
    ],
  },
  {
    id: "CC3",
    name: "CC3 - Administration",
    accounts: [
      { num: "1", name: "Admin Office" },
      { num: "2", name: "HR" },
      { num: "3", name: "Accounting" },
      { num: "4", name: "IT" },
    ],
  },
];

export const glAccounts = [
  "5000 - Salaries Expense",
  "5100 - Hourly Wages",
  "5200 - Overtime Expense",
  "5300 - Bonus Expense",
  "5400 - Benefits Expense",
  "5101 - FOH Front Door",
  "5102 - FOH Dining Room",
  "5103 - FOH Patio",
  "5104 - FOH Bar",
  "5105 - FOH Restrooms",
  "6000 - Tax Expense",
  "6100 - Insurance Expense",
];
