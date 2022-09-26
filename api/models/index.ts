import { User } from "./User";
import { Post } from "./Post";
import {Channel} from "./Channel";

Channel.hasMany(Post, {
  foreignKey: "channelId",
});
User.hasMany(Post, {
  foreignKey: "userId",
});

Post.belongsTo(User);
Post.belongsTo(Channel);