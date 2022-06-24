import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
const Survey = db.define(
  "Survey",
  {
    SID: {
      type: DataTypes.STRING,
    },
    Creator: {
      type: DataTypes.STRING,
    },
    CreatedAt: {
      type: DataTypes.DATE,
    },
    OpenTill: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

export default Survey;
