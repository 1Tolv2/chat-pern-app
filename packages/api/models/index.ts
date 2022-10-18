import { createPool } from "slonik";
import dotenv from "dotenv";

dotenv.config();
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("DB: ", process.env.POSTGRES_DEV_URL);
const DATABASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.POSTGRES_DEV_URL
    : process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_TEST_URL
    : process.env.POSTGRES_DEV_URL;
export const pool = createPool(DATABASE_URL || "");
