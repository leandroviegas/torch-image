"use restrict";
import Sequelize, { DataTypes, Model } from "sequelize";
import sequelize from "../database";
import { hash } from "bcrypt";

class User extends Model {
  declare id: string;
  declare username: string;
  declare link: string;
  declare email: string;
  declare role: string;
  declare profilePicture: string;
  declare password: string;
}

User.init(
  // Model attributes
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 24],
          msg: "username-must-be-3-24-len",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      }
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        len: {
          args: [3, 30],
          msg: "link-must-be-3-30-len",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    createdAt: true,
    hooks: {
      async beforeCreate(user: any) {
        if (user.password) user.password = await hash(user.password, 8);
        if (user.link) {
          const userLinkVerify = await User.findOne({
            where: { link: user.link },
          });
          if (userLinkVerify)
            user.link = `${user.link}-${Math.random().toString(36).slice(2, 7)}`
        }
        return user;
      },
    },
    updatedAt: "updateTimestamp",
    freezeTableName: true,
  }
);

export default User;
