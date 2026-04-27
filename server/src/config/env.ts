export type ServerEnv = {
  nodeEnv: string;
  port: number;
  databaseUrl?: string;
  dbHost: string;
  dbPort: number;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbLogging: boolean;
};

const readNumber = (value: string | undefined, fallback: number) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env: ServerEnv = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: readNumber(process.env.PORT, 3001),
  databaseUrl: process.env.DATABASE_URL,
  dbHost: process.env.DB_HOST ?? "localhost",
  dbPort: readNumber(process.env.DB_PORT, 3306),
  dbName: process.env.DB_NAME ?? "gl_export_wizard",
  dbUser: process.env.DB_USER ?? "root",
  dbPassword: process.env.DB_PASSWORD ?? "",
  dbLogging: process.env.DB_LOGGING === "true",
};
