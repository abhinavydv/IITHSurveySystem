import { Sequelize } from "sequelize";
const db = new Sequelize("iss_db", "abhinav", "1141", {
  host: "localhost",
  dialect: "mysql",
});
export default db;
