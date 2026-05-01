export type HealthResponse = {
  ok: boolean;
  service: string;
};

export type CodeRow = {
  code: string;
  description: string;
};

export type CostCenterTable = {
  id: string;
  name: string;
  accounts: {
    num: string;
    name: string;
  }[];
};

export type GLCodeType = "EARNING" | "DEDUCTION";

export type SaveGLMappingSplit = {
  ccTable: string;
  ccCode: string;
  ccName?: string | null;
  accountNumber: string;
  sortOrder: number;
};

export type SaveGLCodeMapping = {
  codeType: GLCodeType;
  code: string;
  description?: string | null;
  fallbackAccount?: string | null;
  splits: SaveGLMappingSplit[];
};

export type SaveGLMappingsRequest = {
  co: string;
  mappings: SaveGLCodeMapping[];
};

export type SaveGLMappingsResponse = {
  ok: boolean;
  mappingCount: number;
  splitCount: number;
};

export type ApiErrorResponse = {
  error: string;
};
