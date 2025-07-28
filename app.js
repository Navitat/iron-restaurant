const pizzasArr = require("./data/pizzas.js");
const express = require("express");
const logger = require("morgan");

const app = express();

const PORT = 3000;

//setup request logger to run on each request
app.use(logger("dev"));

//Make the static files inside "public" folder publicly to the end-user
app.use(express.static("public"));

// GET /
app.get("/", (req, res, next) => {
  console.log("received request to the root path...");
  // res.send();
  res.sendFile(__dirname + "/views/home.html");
});

// GET /contact
app.get("/contact", (req, res, next) => {
  console.log("received request to the contact page...");
  // res.send();
  res.sendFile(__dirname + "/views/contact.html");
});

// GET /pizzas, send json response
app.get("/pizzas", (req, res, next) => {
  console.log("received request to the pizzas data");
  res.json(pizzasArr);
});

// Define and listen port
app.listen(PORT, () => {
  console.log(`APP RUNNING on PORT: ${PORT}`);
});
