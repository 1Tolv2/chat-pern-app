import { User } from "./User";
import { Post } from "./Post";

Post.belongsTo(User, {
  foreignKey: "userId",
});
User.hasMany(Post);
