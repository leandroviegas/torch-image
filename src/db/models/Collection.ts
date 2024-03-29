"use restrict";
import Sequelize, { DataTypes, Model } from "sequelize";
import sequelize from "../database";

// Models
import User from "./User";
import Image from "./Image";

class Collection extends Model {
  declare id: string;
  declare link: string;
  declare name: string;
  declare description: string;
  declare ownerId: string;
  declare images: (Image & { image_collection: Collection })[];
}

Collection.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 30],
          msg: "link/must-be-3-30-len",
        },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 15],
          msg: "name/must-be-3-15-len",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: "Collection",
    tableName: "collections",
    createdAt: true,
    updatedAt: "updateTimestamp",
    freezeTableName: true,
  }
);

/* Collection Owner Relation */
Collection.belongsTo(User, { as: "owner", foreignKey: "ownerId" });

User.hasMany(Collection, {
  as: "collections",
  onDelete: "CASCADE",
  foreignKey: "ownerId",
});

/* Collection Images Relation */
const CollectionLikes = sequelize.define(
  "collection_likes",
  {
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  { createdAt: true, updatedAt: false }
);

Collection.belongsToMany(User, { through: CollectionLikes });

User.belongsToMany(Collection, { through: CollectionLikes });

/* Collection Images Relation */
const CollectionImages = sequelize.define(
  "collection_images",
  {},
  { createdAt: true, updatedAt: false }
);

Collection.belongsToMany(Image, { as: "images", through: CollectionImages });

Image.belongsToMany(Collection, {
  through: CollectionImages,
  onDelete: "CASCADE",
});

export { CollectionImages };

export default Collection;
