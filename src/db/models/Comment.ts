import Sequelize, { DataTypes, Model } from "sequelize";
import sequelize from "../database";

class Comment extends Model {
  declare id: string;
  declare UserId: string;
  declare ImageId: string;
  declare referenceId: string;
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
      validate: {
        len: {
          args: [3, 800],
          msg: "content/must-be-3-800-len",
        },
      },
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

Comment.belongsTo(Comment, { as: "parent", foreignKey: "referenceId" });

export default Comment;