const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite",
});

const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Database synced");
  } catch (error) {
    console.error("Error syncing database:", error);
  }
};

module.exports = { sequelize, syncDatabase };
