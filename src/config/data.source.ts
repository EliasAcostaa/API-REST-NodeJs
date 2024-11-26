import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

import { dirname, resolve } from "path";

dotenv.config({
  path:
    process.env.NODE_ENV !== undefined
      ? `.${process.env.NODE_ENV.trim()}.env`
      : ".env",
});

const isDevelopment = process.env.NODE_ENV !== "production";

const Config: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,   

  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,   

  //entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  //migrations: [__dirname + "/../migrations/*{.ts,.js}"],

  //entities: [
  //  isDevelopment
  //    ? __dirname + "/../**/*.entity.ts"
  //    : __dirname + "/../**/*.entity.js",
  //],
  //migrations: [
  //  isDevelopment
  //    ? __dirname + "/../migrations/*.ts"
  //    : __dirname + "/../migrations/*.js",
  //],
  entities: [
    isDevelopment
      ? resolve(dirname(import.meta.url), "../**/*.entity.ts")
      : resolve(dirname(import.meta.url), "../**/*.entity.js"),
  ],
  migrations: [
    isDevelopment
      ? resolve(dirname(import.meta.url), "../migrations/*.ts")
      : resolve(dirname(import.meta.url), "../migrations/*.js"),
  ],
  synchronize: false,
  migrationsRun: true,
  //logging: false,
  logging: true,
  namingStrategy: new SnakeNamingStrategy()
};

export const AppDataSource: DataSource = new DataSource(Config);