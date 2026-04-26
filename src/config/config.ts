import dotenv from "dotenv";

dotenv.config();

// const requiredEnv = ["SERVER_NAME", "DB_NAME", "DB_PORT", "DB_USERNAME", "DB_PASSWORD"];

// requiredEnv.forEach((key) => {
//   if (!process.env[key]) {
//     throw new Error(`Missing env variable: ${key}`);
//   }
// });

export const appConfig = {
  db_url: process.env.DATABASE_URL,
  server_name: process.env.SERVER_NAME,
  db_name: process.env.DB_NAME,
  db_port: process.env.DB_PORT,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
}