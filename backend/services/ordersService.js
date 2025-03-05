const axios = require("axios");
const Order = require("../models/Order");
const Product = require("../models/Product");

const fetchAndStoreOrders = async () => {
  try {
    console.log("key", process.env.IDOSELL_API_KEY);
    const response = await axios.get(
      "https://zooart6.yourtechnicaldomain.com/api/admin/v5/orders/orders",
      {
        params: { limit: "" },
        headers: {
          "X-API-KEY": process.env.IDOSELL_API_KEY,
        },
      }
    );
    const orders = response.data.Results;
    let ordersArray = [];
    let productsArray = [];
    for (const order of orders) {
      let orderWorth = 0;
      const products = order.orderDetails.productsResults.map((product) => {
        orderWorth += product.productOrderPrice * product.productQuantity;
        return {
          productID: product.productId,
          orderID: order.orderId,
          quantity: product.productQuantity,
        };
      });
      if (products.length > 0) productsArray.push(...products);
      ordersArray.push({
        orderID: order.orderId,
        orderWorth: parseFloat(orderWorth.toFixed(2)),
      });
    }
    await Order.bulkCreate(ordersArray, {
      updateOnDuplicate: ["orderWorth"],
    });
    await Product.truncate();
    await Product.bulkCreate(productsArray);

    console.log("Orders and products updated");
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};
module.exports = { fetchAndStoreOrders };
