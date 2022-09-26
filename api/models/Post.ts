import { DataTypes, Model, InferAttributes, InferCreationAttributes, ForeignKey, CreationOptional } from "sequelize";
import { sequelize } from "../config/env/test";
import crypto from "crypto";
import { Channel } from "./Channel";
import { User } from "./User";

class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: string;
  declare user_id: ForeignKey<User['id']>;
  declare channel_id: ForeignKey<Channel['id']>;
  declare body: string;
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
    }
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "posts",
    sequelize,
  }
);

export const createPost = async (
  userId: string,
  channelId: string,
  body: string
) => {
  const newPost = await Post.create({
    id: crypto.randomUUID(),
    user_id: userId,
    channel_id: channelId,
    body
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
