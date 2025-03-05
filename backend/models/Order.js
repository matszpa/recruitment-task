const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    orderID: { type: DataTypes.STRING, primaryKey: true },
    orderWorth: { type: DataTypes.FLOAT },
  },
  {
    timestamps: false,
  }
);
module.exports = Order;
