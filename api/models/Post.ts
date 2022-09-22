import { DataTypes, Model, CreationOptional, Optional } from "sequelize";
import { sequelize } from "../config/env/test";
import { User } from "./User";

interface PostAttributes {
  id: CreationOptional<number>;
  userId: number;
  body: string;
}

export interface PostInput extends Optional<PostAttributes, "id"> {}
export interface PostOutput extends Required<PostAttributes> {}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
  public id!: CreationOptional<number>; //special type that marks field as optional
  public readonly userId!: number;
  public body!: string;
  public readonly createdAt!: CreationOptional<Date>;
  public readonly updatedAt!: CreationOptional<Date>;
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "posts",
    sequelize,
  }
);

// Post.belongsTo(User, {
//   foreignKey: "userId",
// });
// User.hasMany(Post);


export const createPost = async (userId: number, body: string) => {
  const newPost = await Post.create({
    userId,
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
  return posts
};

export { Post };
