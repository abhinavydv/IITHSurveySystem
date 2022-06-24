import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
// console.log(DataTypes)
// console.log(DataTypes.DATETIME)
const Response = db.define(
  "Response",
  {
    RID: {
      type: DataTypes.STRING,
    },
    Respondant: {
      type: DataTypes.STRING,
    },
    RespondedAt: {
      type: DataTypes.DATE,
    },
    SID: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

export default Response;
