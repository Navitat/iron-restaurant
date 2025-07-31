const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

const PORT = 3000;

//setup request logger to run on each request
app.use(logger("dev"));

//Make the static files inside "public" folder publicly to the end-user
app.use(express.static("public"));

// JSON middleware to parse incoming HTTP requests that contain JSON
app.use(express.json());

//
// Connect to DB
//
mongoose
  .connect("mongodb://127.0.0.1:27017/express-restaurant")
  .then((x) =>
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  )
  .catch((err) => console.error("Error connecting to mongo", err));

// ROUTES

// GET /
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/views/home.html");
});

// GET /contact
app.get("/contact", (req, res, next) => {
  res.sendFile(__dirname + "/views/contact.html");
});

//
// MOUNT ROUTES
// 2 ways to do it:

// 1
const pizzaRoutes = require("./routes/pizza.routes.js");
app.use("/", pizzaRoutes);
// 2
app.use("/", require("./routes/cook.routes.js"));

// Define and listen port
app.listen(PORT, () => {
  console.log(`APP RUNNING on PORT: ${PORT}`);
});
