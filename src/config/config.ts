import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  db_url: process.env.DATABASE_URL,
  server_name: process.env.SERVER_NAME,
  db_name: process.env.DB_NAME,
  db_port: process.env.DB_PORT,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
}