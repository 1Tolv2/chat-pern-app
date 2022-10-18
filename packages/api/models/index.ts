import { createPool } from "slonik";
import dotenv from "dotenv";

dotenv.config();

export const pool = createPool(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB}`
);
