import { DataTypes, Model, CreationOptional, Optional } from "sequelize";
import { sequelize } from "../config/env/test";
import crypto from "crypto";

interface ChannelAttributes {
  id: string;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface ChannelInput extends Optional<ChannelAttributes, "id"> {}
export interface ChannelOutput extends Required<ChannelAttributes> {}

class Channel
  extends Model<ChannelAttributes, ChannelInput>
  implements ChannelAttributes
{
  public readonly id: string = crypto.randomUUID();
  public name!: string;
  public description: string = "";
  public readonly created_at!: CreationOptional<Date>;
  public updated_at!: CreationOptional<Date>;
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
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    tableName: "channels",
    sequelize,
  }
);

export const createChannel = async (name: string, description: string) => {
  const newChannel = (await findChannelByName(name))
    ? null
    : await Channel.create({
        name,
        description,
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

export { Channel };
