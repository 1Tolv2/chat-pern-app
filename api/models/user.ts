import { DataTypes, Model, CreationOptional, Optional } from "sequelize";
import { sequelize } from "../config/env/test";
import { Post } from "./Post";
import crypto from "crypto";

interface UserAttributes {
  id: string;
  username: string;
  email: string | null;
  password: string;
  role: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public readonly id = crypto.randomUUID(); //special type that marks field as optional
  public readonly username!: string;
  public email!: string | null;
  public password!: string;
  public role!: string
  public readonly created_at!: CreationOptional<Date>;
  public readonly updated_at!: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    tableName: "users",
    sequelize,
  }
);

export const createUser = async (username: string, email: string, password: string, role: string) => {
  const newUser = await User.create({
    username,
    email,
    password,
    role
  });
  return newUser;
};

export const findAll = async (): Promise<UserOutput[]> => {
  return User.findAll({ raw: true });
};

// export const findUserById = async (id: number) => {
//   return User.findOne({ raw: true, where: { id } });
// };

export const findUserWithPosts = async (id: string) => {
  return User.findOne({
    raw: true,
    where: { id },
    include: { model: Post, as: "posts" },
  });
};

export { User };
