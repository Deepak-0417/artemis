import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/db.js";

export type GLCodeType = "EARNING" | "DEDUCTION";

export class GLCodeMapping extends Model<
  InferAttributes<GLCodeMapping>,
  InferCreationAttributes<GLCodeMapping>
> {
  declare id: CreationOptional<number>;
  declare co: string;
  declare codeType: GLCodeType;
  declare code: string;
  declare description: string | null;
  declare fallbackAccount: string | null;
  declare isSelected: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

GLCodeMapping.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    co: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    codeType: {
      type: DataTypes.ENUM("EARNING", "DEDUCTION"),
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    fallbackAccount: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    isSelected: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: "Y",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "GLCodeMapping",
    timestamps: true,
    indexes: [
      {
        name: "UQ_GLCodeMapping_co_code",
        unique: true,
        fields: ["co", "codeType", "code"],
      },
      {
        name: "IX_GLCodeMapping_co",
        fields: ["co"],
      },
    ],
  },
);
