'use restrict'
import Sequelize, { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

// Models
import User from './User';

class Image extends Model {
    declare id: string;
    declare identification: string;
    declare likes: string[];
    declare provider: string;
}

Image.init(
    // Model attributes
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        identification: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        likes: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            references: {
                model: User,
                key: 'id'
            },
            defaultValue: [],
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Image',
        tableName: 'images',
        createdAt: true,
        updatedAt: 'updateTimestamp',
        freezeTableName: true,
    }
);

Image.hasMany(
    User,
    {
        as: 'like_list',
        foreignKey: 'likes'
    }
)

export default Image;