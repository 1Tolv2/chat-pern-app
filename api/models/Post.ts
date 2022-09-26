import { DataTypes, Model, CreationOptional, Optional } from "sequelize";
import { sequelize } from "../config/env/test";
import crypto from "crypto";
import { Channel } from "./Channel";

interface PostAttributes {
  id: string;
  user_id: string;
  channel_id: string;
  body: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface PostInput extends Optional<PostAttributes, "id"> {}
export interface PostOutput extends Required<PostAttributes> {}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
  public id = crypto.randomUUID(); //special type that marks field as optional
  public readonly user_id!: string;
  public readonly channel_id!: string;
  public body!: string;
  public readonly created_at!: CreationOptional<Date>;
  public readonly updated_at!: CreationOptional<Date>;
}

Post.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channel_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    tableName: "posts",
    sequelize,
  }
);

Channel.hasMany(Post, {
  foreignKey: "channel_id",
});
Post.belongsTo(Channel);

export const createPost = async (
  userId: string,
  channelId: string,
  body: string
) => {
  const newPost = await Post.create({
    user_id: userId,
    channel_id: channelId,
    body,
  });
  return newPost;
};

export const findAll = async () => {
  const posts = await Post.findAll({ raw: true });
  return posts;
};

export const findPostsByChannelId = async (id: string) => {
  const posts = await Post.findAll({
    where: { channel_id: id },
    include: { model: Channel,
     attributes: ['name', 'id']},
    raw: true,
  });
  return posts;
};

export const findById = async (id: string) => {
  const posts = await Post.findAll({ raw: true, where: { id } });
  return posts;
};

export { Post };
