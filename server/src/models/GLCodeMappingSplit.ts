import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/db.js";
import { GLCodeMapping } from "./GLCodeMapping.js";

export class GLCodeMappingSplit extends Model<
  InferAttributes<GLCodeMappingSplit>,
  InferCreationAttributes<GLCodeMappingSplit>
> {
  declare id: CreationOptional<number>;
  declare mappingId: ForeignKey<GLCodeMapping["id"]>;
  declare ccTable: string;
  declare ccCode: string;
  declare ccName: string | null;
  declare accountNumber: string;
  declare sortOrder: CreationOptional<number>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

GLCodeMappingSplit.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    mappingId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: GLCodeMapping,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    ccTable: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    ccCode: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    ccName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    accountNumber: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    sortOrder: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
    tableName: "GLCodeMappingSplit",
    timestamps: true,
    indexes: [
      {
        name: "IX_GLCodeMappingSplit_mappingId",
        fields: ["mappingId"],
      },
      {
        name: "IX_GLCodeMappingSplit_cc",
        fields: ["ccTable", "ccCode"],
      },
    ],
  },
);

GLCodeMapping.hasMany(GLCodeMappingSplit, {
  foreignKey: "mappingId",
  as: "splits",
  onDelete: "CASCADE",
});

GLCodeMappingSplit.belongsTo(GLCodeMapping, {
  foreignKey: "mappingId",
  as: "mapping",
});
