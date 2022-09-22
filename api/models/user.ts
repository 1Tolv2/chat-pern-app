import {
  Sequelize,
  DataTypes,
  Model,
  CreationOptional,
  Optional,
} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize(
  `postgres://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@localhost:${process.env.DATABASE_PORT}/chatdatabase`
);

interface UserAttributes {
  id: CreationOptional<number>;
  name: string;
  nickname: string | null
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
    }
  },
  {
    timestamps: true,
    tableName: "users",
    sequelize, // passing the `sequelize` instance is required
  }
);

const getAll = async (): Promise<UserOutput[]> => {
  return User.findAll()
}

const createUser = async (name: string, nickname: string) => {
  const newUser = await User.create({
    name,
    nickname
  })
  console.log(newUser.id, newUser.name, newUser.nickname);
}

export { sequelize, User, getAll, createUser };
