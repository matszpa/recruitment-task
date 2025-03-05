const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");
const Order = require("./Order");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    }, //dodane z powodu duplikatu produktu z takim samym id, lepszym rozwiazaniem byłoby utworzenie klucza złożonego z idproduktu i idzamowienia
    productID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Order,
        key: "orderID",
      },
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
Product.belongsTo(Order, { foreignKey: "orderID" });
module.exports = Product;
