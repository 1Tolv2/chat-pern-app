import { Sequelize } from "sequelize";
import { User } from "./user";
import { Post } from "./post";

export const sequelize = new Sequelize(
  `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@localhost:${process.env.DATABASE_PORT}/chatdatabase`
);

Post.belongsTo(User, {
  foreignKey: "userId",
});
User.hasMany(Post);
