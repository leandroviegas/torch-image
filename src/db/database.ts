import { Sequelize } from "sequelize";

const dbConnectionString: string = process.env.DB_CONNECTION_STRING || "";

const sequelize = new Sequelize(dbConnectionString, { ssl: true, dialectModule: require('pg') });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("re-sync done!");
  })
  .catch((e) => console.error("Can't syncronize", e));

export default sequelize;
