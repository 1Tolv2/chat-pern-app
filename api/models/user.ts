import { DataTypes, Model, CreationOptional, Optional, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "../config/env/test";
import { Post } from "./Post";
import crypto from "crypto";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string
  declare username: string
  declare email: string | null
  declare password: string
  declare role: string
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "users",
    sequelize,
  }
);

export const createUser = async (username: string, email: string, password: string, role: string) => {
  const newUser = await User.create({
    id: crypto.randomUUID(),
    username,
    email,
    password,
    role
  });
  return newUser;
};

export const findAll = async () => {
  return User.findAll({ raw: true });
};

export const findUserWithPosts = async (id: string) => {
  return User.findOne({
    raw: true,
    where: { id },
    include: { model: Post, as: "posts" },
  });
};

export { User };
