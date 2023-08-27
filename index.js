// Dependencies
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
require("dotenv").config();
const dbConnection = require("./utils/dbConnection");

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Routes
const itemsRoute = require("./routes/Items.routes");
const customerRoute = require("./routes/customers.routes");
const vechileRoute = require("./routes/vechiles.routes");
const orderRoute = require("./routes/order.routes");
app.get('/', (req, res) => {
  res.status(200).json({ message : "You are in home route "})
})
app.use("/items", itemsRoute);
app.use("/customer", customerRoute);
app.use("/vechile", vechileRoute);
app.use("/order", orderRoute);

// Db connection
dbConnection();
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
