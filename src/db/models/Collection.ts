'use restrict'
import { DataTypes, Model } from 'sequelize';
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
            primaryKey: true
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
        createdAt: true,
        updatedAt: 'updateTimestamp'
    }
);

Collection.hasMany(User)
Collection.belongsTo(User)

export default Collection;