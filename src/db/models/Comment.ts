import Sequelize, { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class Comment extends Model {
  declare id: string;
  declare UserId: string;
  declare ImageId: string;
  declare content: string;
  declare createdAt: string;
  declare updatedAt: string;
}

Comment.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    content: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
    createdAt: true,
    updatedAt: true,
    freezeTableName: true,
  }
);

export default Comment;