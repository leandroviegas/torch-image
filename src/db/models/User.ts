'use restrict'
import Sequelize, { DataTypes, Model } from 'sequelize';
import sequelize from '../database';
import { hash } from 'bcrypt';

class User extends Model {
    declare id: string;
    declare username: string;
    declare link: string;
    declare email: string;
    declare role: string;
    declare profilePicture: string;
    declare password: string;
}

User.init(
    // Model attributes
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV4
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 24],
                    msg: "username-must-be-3-24-len"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        profilePicture: {
            type: DataTypes.STRING,
        },
        role: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        link: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 24],
                    msg: "link-must-be-3-24-len"
                }
            }
        },
        password: {
            type: DataTypes.STRING
        }
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        createdAt: true,
        hooks: {
            async beforeCreate(user: any) {
                if (user.password)
                    user.password = await hash(user.password, 8);
                return user;
            },
        },
        updatedAt: 'updateTimestamp',
        freezeTableName: true,
    }
);

export default User;