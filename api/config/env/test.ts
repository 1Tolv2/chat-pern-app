import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@localhost:${process.env.DATABASE_PORT}/chatdatabase`
  );