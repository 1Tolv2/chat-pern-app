import dotenv from "dotenv";
dotenv.config();

const PORT: string = process.env.PORT || "8800";
const BASE_URL = `http://localhost:${PORT}`;
const ALTER_DATABASE: boolean = process.env.ALTER_DATABASE === "true" || false;
const CORS_ORIGINS: string[] = [`${process.env.CORS_ORIGINS}`] || [
  "http://localhost:3000",
];

const POSTGRES_URL: string =
  (process.env.NODE_ENV === "test"
    ? process.env.POSTGRES_TEST_URL
    : process.env.POSTGRES_DEV_URL) || "";

export { PORT, BASE_URL, ALTER_DATABASE, CORS_ORIGINS, POSTGRES_URL };
