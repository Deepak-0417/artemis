import { Sequelize } from "sequelize";
import { env } from "./env.js";

export type DatabaseConfig = {
  url?: string;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  logging: boolean;
};

export const databaseConfig: DatabaseConfig = {
  url: env.databaseUrl,
  host: env.dbHost,
  port: env.dbPort,
  database: env.dbName,
  username: env.dbUser,
  password: env.dbPassword,
  logging: env.dbLogging,
};

export const assertDatabaseConfigured = () => {
  if (!databaseConfig.url && !databaseConfig.database) {
    throw new Error("DATABASE_URL or DB_NAME is required before enabling database-backed APIs.");
  }
};

export const sequelize = databaseConfig.url
  ? new Sequelize(databaseConfig.url, {
      dialect: "mysql",
      logging: databaseConfig.logging ? console.log : false,
    })
  : new Sequelize(
      databaseConfig.database,
      databaseConfig.username,
      databaseConfig.password,
      {
        dialect: "mysql",
        host: databaseConfig.host,
        port: databaseConfig.port,
        logging: databaseConfig.logging ? console.log : false,
      },
    );

export const authenticateDatabase = async () => {
  await sequelize.authenticate();
};
