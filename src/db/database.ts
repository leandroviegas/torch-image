import { Sequelize } from 'sequelize';

const dbConnectionString: string = process.env.DB_CONNECTION_STRING || "";

const sequelize = new Sequelize(dbConnectionString);

export default sequelize;