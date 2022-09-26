import { User } from "./User";
import { Post } from "./Post";
import { Channel } from "./Channel";
import { sequelize } from "../config/env/test";
import { DataTypes } from "sequelize";

Channel.hasMany(Post, {
  foreignKey: "channel_id",
});
Post.belongsTo(Channel);

User.hasMany(Post, {
  foreignKey: "user_id",
});
Post.belongsTo(User, { as: "user" });

const ChannelUsers = sequelize.define(
  "channel_users",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false},
    user_id: { type: DataTypes.STRING, primaryKey: true },
    channel_id: { type: DataTypes.STRING, primaryKey: true },
  },
  { timestamps: false }
);

Channel.belongsToMany(User, { through: ChannelUsers, foreignKey: "user_id" });
User.belongsToMany(Channel, { through: ChannelUsers, foreignKey: "channel_id"  });
