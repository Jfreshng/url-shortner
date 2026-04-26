import { PrismaMssql } from "@prisma/adapter-mssql";
import { PrismaClient } from "../generated/prisma/client.js";
import { appConfig } from "../src/config/config.js";

const adapter = new PrismaMssql({
  server: appConfig.server_name,
  port: Number(appConfig.db_port),
  database: appConfig.db_name,
  authentication: {
    type: "default",
    options: {
      userName: appConfig.db_username,         // your SQL Server username
      password: appConfig.db_password // your SQL Server password
    }
  },
  options: {
    trustServerCertificate: true,
  },
})


// const adapter = new PrismaMssql(conn);
export const prismaInstance = new PrismaClient({ adapter });