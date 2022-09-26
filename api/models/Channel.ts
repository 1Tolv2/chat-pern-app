import { DataTypes, Model, CreationOptional, Optional } from "sequelize";
import { sequelize } from "../config/env/test";
import crypto from "crypto";

interface ChannelAttributes {
  id: string;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
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
  public readonly createdAt!: CreationOptional<Date>;
  public updatedAt!: CreationOptional<Date>;
}

Channel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
  },
  {
    timestamps: true,
    tableName: "channel",
    sequelize,
  }
);

export const createChannel = async (name: string, description: string) => {
  const newChannel = await Channel.create({
    name,
    description,
  });
  return newChannel;
};

export const findAllChannels = async () => {
  const channelList = await Channel.findAll({ raw: true });
    return channelList;
};

export {Channel}
