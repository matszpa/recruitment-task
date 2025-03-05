const express = require("express");
const { Op } = require("sequelize");
const Order = require("../models/Order");
const Product = require("../models/Product");
const { Parser } = require("json2csv");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { minWorth, maxWorth } = req.query;
    const whereClause = {};

    if (minWorth) whereClause.orderWorth = { [Op.gte]: parseFloat(minWorth) };
    if (maxWorth)
      whereClause.orderWorth = {
        ...whereClause.orderWorth,
        [Op.lte]: parseFloat(maxWorth),
      };
    const orders = await Order.findAll({
      where: whereClause,
      include: {
        model: Product,
        attributes: ["productID", "quantity"],
      },
    });

    const formattedOrders = orders.map((order) => ({
      orderID: order.orderID,
      orderWorth: order.orderWorth,
      products: order.Products.map(
        (p) => `productID: ${p.productID}, quantity: ${p.quantity}`
      ).join(" , "),
    }));

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(formattedOrders);

    res.header("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=orders.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: "Error creating csv" });
  }
});
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const order = await Order.findOne({
      where: {
        orderID: id,
      },
      include: { model: Product, attributes: ["productID", "quantity"] },
    });
    if (!order) return res.status(404).json({ error: "Order not found" });
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving order" });
  }
});

module.exports = router;
