import { Sequelize } from "sequelize";
import pg from "pg";

const dbConnectionString: string = process.env.DB_CONNECTION_STRING || "";

const sequelize = new Sequelize(dbConnectionString, { ssl: true, dialectModule: pg });

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("re-sync done!");
  })
  .catch((e) => console.error("Can't syncronize", e));

export default sequelize;
