"use restrict";
import Sequelize, { DataTypes, Model } from "sequelize";
import sequelize from "../database";

// Models
import User from "./User";

class ImageLikes extends Model {
  declare UserId: string;
  declare ImageId: string;
  declare liked: boolean;
  declare createdAt: string;
}

class Image extends Model {
  declare id: string;
  declare identification: string;
  declare provider: string;
  declare likes?: (User & { image_likes: ImageLikes })[];
}

Image.init(
  // Model attributes
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    identification: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    provider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Image",
    tableName: "images",
    updatedAt: "updateTimestamp",
    freezeTableName: true,
  }
);

/* Collection Images Relation */
ImageLikes.init(
  {
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Image Likes",
    tableName: "image_likes",
    createdAt: true,
    updatedAt: false,
  }
);

Image.belongsToMany(User, { through: ImageLikes, as: "likes" });

User.belongsToMany(Image, { through: ImageLikes, as: "likes" });

export { ImageLikes };

export default Image;
