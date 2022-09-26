import { DataTypes, Model, InferAttributes, InferCreationAttributes } from "sequelize";
import { sequelize } from "../config/env/test";
import crypto from "crypto";

class Channel extends Model<InferAttributes<Channel>, InferCreationAttributes<Channel>> {
  declare id: string
  declare name: string
  declare description?: string
}

Channel.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  },
  {
    timestamps: true,
    underscored: true,
    tableName: "channels",
    sequelize,
  }
);

export const createChannel = async (name: string, description: string) => {
  const newChannel = (await findChannelByName(name))
    ? null
    : await Channel.create({
        id: crypto.randomUUID(),
        name,
        description
      });
  return newChannel;
};

export const findChannelByName = async (name: string) => {
  const channel = await Channel.findOne({ raw: true, where: { name } });
  return channel;
};

export const findAllChannels = async () => {
  const channelList = await Channel.findAll({ raw: true });
  return channelList;
};

export const findChannelWithPosts = async (channelId: string) => {
  type Post = {
    id: string;
    user: string;
    body: string;
    created_at: Date;
    updated_at: Date;
  };
  const rawChannelData = await Channel.findOne({ where: { id: channelId } });
  interface PostList {
    posts: Post[] | null;
  }
  type ChannelObject = Channel & PostList;

  const channel: ChannelObject = {
    ...rawChannelData?.get({ plain: true }),
    posts: [],
  } as unknown as ChannelObject;
  channel.posts = (
    await sequelize.query(
      `SELECT p.id, u.username AS user, p.body, p.created_at, p.updated_at FROM posts AS p
      RIGHT JOIN users as u ON p.user_id = u.id
      WHERE p.channel_id = '${channelId}';`
    )
  )[0] as Post[];
  return {channel};
};

export const findChannelUsers = async (channelId: string) => {
  const channel = await sequelize.query(
  `SELECT u.* FROM users AS u 
  JOIN posts AS p ON u.id = p.user_id
  JOIN channels AS c ON p.channel_id = c.id;`)
  
return {users: channel[0]}
}


export { Channel };
