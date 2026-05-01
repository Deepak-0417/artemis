import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  ModelStatic,
} from "sequelize";
import { sequelize } from "../config/db.js";

export type CDeptKey = "cc1" | "cc2" | "cc3" | "cc4" | "cc5";

export class CDeptBase extends Model<
  InferAttributes<CDeptBase>,
  InferCreationAttributes<CDeptBase>
> {
  declare co: string;
  declare name: string | null;
  declare address1: string | null;
  declare address2: string | null;
  declare city: string | null;
  declare state: string | null;
  declare zip: string | null;
  declare county: string | null;
  declare country: string | null;
  declare overrideCheckCalcCode: string | null;
  declare wcc: string | null;
  declare overrideRateCode: string | null;
  declare overrideRate: string | null;
  declare overrideShift: string | null;
  declare overrideCheckAcctName: string | null;
  declare guidfield: string;
  declare lastChange: Date;
  declare lastChangeUser: string;
}

export const createCDeptModel = (
  tableName: `CDept${number}`,
  costCenterKey: CDeptKey,
): ModelStatic<CDeptBase> => {
  class CDeptModel extends CDeptBase {}

  return CDeptModel.init(
    {
      co: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      [costCenterKey]: {
        type: DataTypes.STRING(10),
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      address1: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      address2: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      state: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      zip: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      county: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      country: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      overrideCheckCalcCode: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      wcc: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      overrideRateCode: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      overrideRate: {
        type: DataTypes.DECIMAL(14, 6),
        allowNull: true,
      },
      overrideShift: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      overrideCheckAcctName: {
        type: DataTypes.STRING(40),
        allowNull: true,
      },
      guidfield: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        unique: `UQ_${tableName}_guidfield`,
      },
      lastChange: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      lastChangeUser: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName,
      timestamps: false,
      indexes: [
        {
          name: `IX_APS_${tableName}_Co${costCenterKey.toUpperCase()}`,
          fields: ["co", costCenterKey],
        },
        {
          name: `UQ_${tableName}_guidfield`,
          unique: true,
          fields: ["guidfield"],
        },
      ],
    },
  );
};
