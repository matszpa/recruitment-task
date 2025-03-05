const Order = require("./Order");
const Product = require("./Product");

Order.hasMany(Product, { foreignKey: "orderID" });
Product.belongsTo(Order, { foreignKey: "orderID" });

module.exports = { Order, Product };
