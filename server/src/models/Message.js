import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const Message = sequelize.define("Message", {
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  reply: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "unresolved"
  }
});

export default Message;
