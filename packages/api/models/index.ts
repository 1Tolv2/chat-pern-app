import { createPool } from "slonik";
import dotenv from "dotenv";

dotenv.config();

let pool: any = null;
export const connectToDatabase = async (url: string) => {
  try {
    console.info("Setting up Postgres database connection");
    pool = await createPool(url);
  } catch (err) {
    if (err instanceof Error) {
      throw err;
    }
  }
};

export { pool };
