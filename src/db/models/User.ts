import { DataTypes, Model } from 'sequelize';
import sequelize from '../database';

class User extends Model { }

User.init(
    // Model attributes
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'User',
        createdAt: true,
        updatedAt: 'updateTimestamp'
    }
);

export default User;