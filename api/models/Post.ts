import { DataTypes, Model, CreationOptional, Optional } from "sequelize";
import { sequelize } from "./index";

interface PostAttributes {
  id: CreationOptional<number>;
  name: string;
  body: string;
}

export interface PostInput extends Optional<PostAttributes, "id"> {}
export interface PostOutput extends Required<PostAttributes> {}

class Post extends Model<PostAttributes, PostInput> implements PostAttributes {
  public id!: CreationOptional<number>; //special type that marks field as optional
  public readonly name!: string;
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
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
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

export { Post };
