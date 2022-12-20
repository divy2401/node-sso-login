const express = require("express"); //Import the express dependency
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();
const app = express(); //Instantiate an express app, the main work horse of this server

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Init DB connection
require("./config/database.config");

// imports the API from the apis folder
const loginController = require("./controllers/login.controller");
app.use("/api", loginController);

app.listen(process.env.PORT, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${process.env.PORT}`);
});
