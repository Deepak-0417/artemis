import { sequelize } from "../config/db.js";
import {
  GLCodeMapping,
  GLCodeMappingSplit,
} from "../models/index.js";
import type { GLCodeType } from "../models/GLCodeMapping.js";

type SaveGLMappingSplit = {
  ccTable: string;
  ccCode: string;
  ccName?: string | null;
  accountNumber: string;
  sortOrder: number;
};

type SaveGLCodeMapping = {
  codeType: GLCodeType;
  code: string;
  description?: string | null;
  fallbackAccount?: string | null;
  splits: SaveGLMappingSplit[];
};

type SaveGLMappingsRequest = {
  co: string;
  mappings: SaveGLCodeMapping[];
};

type SaveGLMappingsResponse = {
  ok: boolean;
  mappingCount: number;
  splitCount: number;
};

const clean = (value: string | null | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
};

export const saveGLMappings = async ({
  co,
  mappings,
}: SaveGLMappingsRequest): Promise<SaveGLMappingsResponse> => {
  const cleanCo = clean(co);

  if (!cleanCo) {
    throw new Error("co is required");
  }

  return sequelize.transaction(async (transaction) => {
    await GLCodeMapping.destroy({
      where: { co: cleanCo },
      transaction,
    });

    let mappingCount = 0;
    let splitCount = 0;

    for (const mapping of mappings) {
      const code = clean(mapping.code);

      if (!code) {
        continue;
      }

      const createdMapping = await GLCodeMapping.create(
        {
          co: cleanCo,
          codeType: mapping.codeType,
          code,
          description: clean(mapping.description),
          fallbackAccount: clean(mapping.fallbackAccount),
          isSelected: "Y",
        },
        { transaction },
      );
      mappingCount += 1;

      const splitRows = mapping.splits
        .map((split, index) => ({
          mappingId: createdMapping.id,
          ccTable: clean(split.ccTable),
          ccCode: clean(split.ccCode),
          ccName: clean(split.ccName),
          accountNumber: clean(split.accountNumber),
          sortOrder: split.sortOrder ?? index + 1,
        }))
        .filter(
          (split): split is {
            mappingId: number;
            ccTable: string;
            ccCode: string;
            ccName: string | null;
            accountNumber: string;
            sortOrder: number;
          } => Boolean(split.ccTable && split.ccCode && split.accountNumber),
        );

      if (splitRows.length > 0) {
        await GLCodeMappingSplit.bulkCreate(splitRows, { transaction });
        splitCount += splitRows.length;
      }
    }

    return {
      ok: true,
      mappingCount,
      splitCount,
    };
  });
};
