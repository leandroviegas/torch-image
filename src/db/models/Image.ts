import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

// Models
import User from './User';

class Image extends Model { }

Image.init(
    // Model attributes
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
        },
        sourceId: {
            type: DataTypes.STRING,
        },
        sourceImageURL: {
            type: DataTypes.STRING,
        },
        imageLink: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        previewLink: {
            type: DataTypes.STRING,
        },
        imageWidth: {
            type: DataTypes.NUMBER,
        },
        imageHeight: {
            type: DataTypes.NUMBER,
        },
        owner: {
            // {
            //     profilePicture: string;
            //     username: string;
            //     userLink: string;
            // }
            type: DataTypes.JSON,
        },
        likes: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            references: {
                model: User,
                key: 'id'
            }
        },
        provider: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Image',
        createdAt: true,
        updatedAt: 'updateTimestamp'
    }
);

Image.hasMany(User)

export default Image;