import { createPool } from "slonik";
import dotenv from "dotenv";

dotenv.config();

const DATABASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.POSTGRES_DEV_URL
    : process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_TEST_URL
    : process.env.POSTGRES_DEV_URL;

process.env.NODE_ENV !== "test" && console.info("Connecting to Postgres db...");
export const pool = createPool(DATABASE_URL || "");
