import { createPool } from "slonik";
import dotenv from "dotenv";

dotenv.config();

let pool: any = null;
export const setUpDatabase = async (url: string) => {
  try {
    console.info("Setting up Postgres database connection");
    pool = await createPool(url);
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Error connecting to Postgres: ${err.message}`);
      throw err;
    }
  }
};

export { pool };
