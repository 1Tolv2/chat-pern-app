import { DataTypes, Model, CreationOptional, Optional } from "sequelize";
import { sequelize } from "../config/env/test";
import { Post } from "./Post";

interface UserAttributes {
  id: CreationOptional<number>;
  name: string;
  nickname: string | null;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: CreationOptional<number>; //special type that marks field as optional
  public readonly name!: string;
  public nickname!: string | null;
  public readonly createdAt!: CreationOptional<Date>;
  public readonly updatedAt!: CreationOptional<Date>;
}

User.init(
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
    nickname: {
      type: DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "users",
    sequelize,
  }
);

Post.belongsTo(User, {
  foreignKey: "userId",
});
User.hasMany(Post);

export const createUser = async (name: string, nickname: string) => {
  const newUser = await User.create({
    name,
    nickname,
  });
  return newUser;
};

export const findAll = async (): Promise<UserOutput[]> => {
  return User.findAll({ raw: true });
};

// export const findUserById = async (id: number) => {
//   return User.findOne({ raw: true, where: { id } });
// };

export const findUserWithPosts = async (id: number) => {
  return User.findOne({ raw: true, where: { id }, include: {model: Post, as: 'posts'} });
};

export { User };
