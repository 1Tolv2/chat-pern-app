import dotenv from "dotenv";
dotenv.config();

const PORT: string = process.env.PORT || "8800";
const BASE_URL = `http://localhost:${PORT}`;
const ALTER_DATABASE: boolean = process.env.ALTER_DATABASE === "true" || false;
const CORS_ORIGINS: string[] = ["http://localhost:3000"];

export { PORT, BASE_URL, ALTER_DATABASE, CORS_ORIGINS };
