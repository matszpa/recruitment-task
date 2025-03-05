// server.js
const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cron = require("node-cron");
const authMiddleware = require("./middleware/auth");
const ordersRoutes = require("./routes/orders");
const { syncDatabase } = require("./config/database");
require("./models/associations");
const { fetchAndStoreOrders } = require("./services/ordersService");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(authMiddleware);
app.use("/orders", ordersRoutes);

syncDatabase({ force: true }).then(() => {
  fetchAndStoreOrders();
});

cron.schedule("0 1 * * *", () => {
  fetchAndStoreOrders();
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
