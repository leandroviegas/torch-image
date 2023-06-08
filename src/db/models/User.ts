'use restrict'
import Sequelize, { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import { hash } from 'bcrypt';

class User extends Model {
    declare id: string;
    declare username: string;
    declare email: string;
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
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [3,24],
                    msg: "username-must-be-3-24-len"
                },   
            }
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
        hooks: {
            async beforeCreate(newUser: any) {
                newUser.password = await hash(newUser.password, 8);
                return newUser;
            },
        },
        updatedAt: 'updateTimestamp'
    }
);

User.hasMany(
    User,
    {
        as: 'like_list',
        foreignKey: 'likes'
    }
)

export default User;