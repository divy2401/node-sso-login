// Include Sequelize module
const Sequelize = require("sequelize");

// connnect mySql DB
const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const config = {
  // Explicitly specifying
  // mysql database
  dialect: "mysql",
  host,
};

// Creating new Object of Sequelize
const sequelize = new Sequelize(database, user, password, config);

sequelize
  .authenticate()
  .then(() => {
    sequelize.sync({
      // force: true,
    });
    console.log("Connection established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Exporting the sequelize object.
// We can use it in another file
// for creating models
module.exports = sequelize;
