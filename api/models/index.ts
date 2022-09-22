import { User } from "./user";
import { Post } from "./Post";

Post.belongsTo(User, {
  foreignKey: "userId",
});
User.hasMany(Post);
