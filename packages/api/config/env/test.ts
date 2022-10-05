import { createPool } from 'slonik';

export const pool = createPool(
  `postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB}`
);