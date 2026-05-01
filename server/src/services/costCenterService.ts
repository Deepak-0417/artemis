import type { ModelStatic } from "sequelize";
import {
  CDept1,
  CDept2,
  CDept3,
  CDept4,
  CDept5,
} from "../models/index.js";
import type { CDeptBase, CDeptKey } from "../models/createCDeptModel.js";

export type CostCenterTable = {
  id: string;
  name: string;
  accounts: {
    num: string;
    name: string;
  }[];
};

type CostCenterConfig = {
  id: string;
  name: string;
  key: CDeptKey;
  model: ModelStatic<CDeptBase>;
};

const costCenterConfigs: CostCenterConfig[] = [
  { id: "CC1", name: "CC1", key: "cc1", model: CDept1 },
  { id: "CC2", name: "CC2", key: "cc2", model: CDept2 },
  { id: "CC3", name: "CC3", key: "cc3", model: CDept3 },
  { id: "CC4", name: "CC4", key: "cc4", model: CDept4 },
  { id: "CC5", name: "CC5", key: "cc5", model: CDept5 },
];

const getCostCenterTable = async ({
  id,
  name,
  key,
  model,
}: CostCenterConfig, co: string): Promise<CostCenterTable> => {
  const rows = await model.findAll({
    attributes: [key, "name"],
    where: { co },
    order: [[key, "ASC"]],
  });

  return {
    id,
    name,
    accounts: rows.map((row) => ({
      num: String((row.getDataValue as (attribute: string) => unknown)(key) ?? ""),
      name: row.name ?? "",
    })),
  };
};

export const getCostCenterTables = async (
  co: string,
): Promise<CostCenterTable[]> => {
  const tables = await Promise.all(
    costCenterConfigs.map((config) => getCostCenterTable(config, co)),
  );

  return tables.filter((table) => table.accounts.length > 0);
};
