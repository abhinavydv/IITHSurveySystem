import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;
const User = db.define(
  "User",
  {
    UID: {
      type: DataTypes.STRING,
    },
    Name: {
      type: DataTypes.STRING,
    },
    CreatedAt: {
      type: DataTypes.DATE,
    },
    Password: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

export default User;
