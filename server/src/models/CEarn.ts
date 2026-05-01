import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/db.js";

export class CEarn extends Model<
  InferAttributes<CEarn>,
  InferCreationAttributes<CEarn>
> {
  declare co: string;
  declare ecode: string;
  declare description: string | null;
  declare shortDescription: string | null;
  declare eamType: string | null;
  declare w2Field: string | null;
  declare printOnCheckStub: string | null;
  declare minimum: string | null;
  declare maximum: string | null;
  declare annualMaximum: string | null;
  declare overrideRate: string | null;
  declare addToRate: string | null;
  declare rateMultiplier: string | null;
  declare overrideShift: string | null;
  declare unitDescription: string | null;
  declare autoDrop: string;
  declare reduceAutoPay: string;
  declare guidfield: string;
  declare lastChange: Date;
  declare lastChangeUser: string;
  declare Obsolete: string;
  declare worked: string;
}

CEarn.init(
  {
    co: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
    ecode: {
      type: DataTypes.STRING(10),
      allowNull: false,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    shortDescription: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    eamType: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    w2Field: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    printOnCheckStub: {
      type: DataTypes.CHAR(1),
      allowNull: true,
    },
    minimum: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: true,
    },
    maximum: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: true,
    },
    annualMaximum: {
      type: DataTypes.DECIMAL(14, 2),
      allowNull: true,
    },
    overrideRate: {
      type: DataTypes.DECIMAL(14, 6),
      allowNull: true,
    },
    addToRate: {
      type: DataTypes.DECIMAL(14, 6),
      allowNull: true,
    },
    rateMultiplier: {
      type: DataTypes.DECIMAL(14, 6),
      allowNull: true,
    },
    overrideShift: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    unitDescription: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    autoDrop: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
    },
    reduceAutoPay: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
    },
    guidfield: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      unique: "UQ_CEarn_guidfield",
    },
    lastChange: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    lastChangeUser: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "",
    },
    Obsolete: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
    },
    worked: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "N",
    },
  },
  {
    sequelize,
    tableName: "CEarn",
    timestamps: false,
    indexes: [
      {
        name: "IX_APS_CEarn_ecodeCo_inc_DescriptionDedType",
        fields: ["co", "ecode"],
      },
      {
        name: "UQ_CEarn_guidfield",
        unique: true,
        fields: ["guidfield"],
      },
    ],
  },
);
