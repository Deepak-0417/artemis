import { CDed, CEarn } from "../models/index.js";

export type CodeRow = {
  code: string;
  description: string;
};

const toCodeRow = (row: { ecode: string; description: string | null }) => ({
  code: row.ecode,
  description: row.description ?? "",
});

export const getEarningCodes = async (co: string): Promise<CodeRow[]> => {
  const rows = await CEarn.findAll({
    attributes: ["ecode", "description"],
    where: { co },
    order: [["ecode", "ASC"]],
  });

  return rows.map(toCodeRow);
};

export const getDeductionCodes = async (co: string): Promise<CodeRow[]> => {
  const rows = await CDed.findAll({
    attributes: ["ecode", "description"],
    where: { co },
    order: [["ecode", "ASC"]],
  });

  return rows.map(toCodeRow);
};
