import { DataTypes, Model, CreationOptional, Optional } from "sequelize";
import { sequelize } from "../config/env/test";
import crypto from "crypto";

interface PostAttributes {
  id: string;
  userId: string;
  channelId: string;
  body: string;
}

export interface PostInput extends Optional<PostAttributes, "id"> {}
export interface PostOutput extends Required<PostAttributes> {}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
  public id = crypto.randomUUID(); //special type that marks field as optional
  public readonly userId!: string;
  public readonly channelId!: string;
  public body!: string;
  public readonly createdAt!: CreationOptional<Date>;
  public readonly updatedAt!: CreationOptional<Date>;
}

Post.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channelId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    timestamps: true,
    tableName: "posts",
    sequelize,
  }
);

export const createPost = async (
  userId: string,
  channelId: string,
  body: string,
) => {
  const newPost = await Post.create({
    userId,
    channelId,
    body,
  });
  return newPost;
};

export const findAll = async () => {
  const posts = await Post.findAll({ raw: true });
  return posts;
};

export const findById = async (id: number) => {
  const posts = await Post.findAll({ raw: true, where: { id } });
  return posts;
};

export { Post };
