import { sequelize } from "../config/db.js";
import { CDept1 } from "./CDept1.js";
import { CDept2 } from "./CDept2.js";
import { CDept3 } from "./CDept3.js";
import { CDept4 } from "./CDept4.js";
import { CDept5 } from "./CDept5.js";
import { CDed } from "./CDed.js";
import { CEarn } from "./CEarn.js";
import { GLCodeMapping } from "./GLCodeMapping.js";
import { GLCodeMappingSplit } from "./GLCodeMappingSplit.js";

export { sequelize };
export {
  CDept1,
  CDept2,
  CDept3,
  CDept4,
  CDept5,
  CDed,
  CEarn,
  GLCodeMapping,
  GLCodeMappingSplit,
};

export const initModels = () => {
  return {
    CDept1,
    CDept2,
    CDept3,
    CDept4,
    CDept5,
    CDed,
    CEarn,
    GLCodeMapping,
    GLCodeMappingSplit,
  };
};
