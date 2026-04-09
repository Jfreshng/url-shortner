import dotenv from "dotenv";

dotenv.config();

export const appConfig = {
  db: process.env.DATABASE_URL
}