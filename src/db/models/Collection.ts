'use restrict'
import Sequelize, { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

// Models
import User from './User';
import Image from './Image';

class Collection extends Model { }

Collection.init(
    // Model attributes
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            references: {
                model: Image,
                key: 'id'
            }
        },
        likes: {
            type: DataTypes.ARRAY(DataTypes.UUID),
            references: {
                model: User,
                key: 'id'
            }
        },
        owner: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        modelName: 'Collection',
        tableName: 'collections',
        createdAt: true,
        updatedAt: 'updateTimestamp',
        freezeTableName: true,
    }
);

Collection.belongsTo(
    User,
    {
        as: 'owner',
        foreignKey: 'owner'
    }    
)

Collection.hasMany(
    User,
    {
        as: 'likes',
        foreignKey: 'likes'
    }
)

Collection.hasMany(
    Image,
    {
        as: 'image_list',
        foreignKey: 'images'
    }
)

export default Collection;