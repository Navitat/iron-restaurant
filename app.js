const pizzasArr = require("./data/pizzas.js");
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const Pizza = require("./models/Pizza.model.js");
const Cook = require("./models/Cook.model.js");

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

//
// Example of custom middleware
//

function sayHello(req, res, next) {
  console.log("Hellooo~");
  next();
}
function sayHello2(req, res, next) {
  console.log("Hellooo 2!~");
  next();
}

app.use("/", sayHello);
app.use("/", sayHello2);

// ROUTES

// GET /
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/views/home.html");
});

// GET /contact
app.get("/contact", (req, res, next) => {
  res.sendFile(__dirname + "/views/contact.html");
});

// POST /pizzas -- create a new pizza
app.post("/pizzas", (req, res, next) => {
  const newPizza = req.body;

  Pizza.create(newPizza)
    .then((pizzaFromDb) => {
      res.status(201).json(pizzaFromDb); // 201: created
    })
    .catch((error) => {
      console.log("Error creating new pizza in DB");
      console.log(error);
      res.status(500).json({ error: "Failed to create a new pizza" });
    });
});

// GET /pizzas
// GET /pizzas?maxPrice=xxx
app.get("/pizzas", (req, res, next) => {
  const { maxPrice } = req.query;

  let filter = {};

  if (maxPrice !== undefined) {
    filter = { price: { $lte: maxPrice } };
  }

  Pizza.find(filter)
    .then((pizzas) => {
      console.log("Retrieved pizzas: ", pizzas);
      res.json(pizzas);
    })
    .catch((err) => {
      console.log("Error getting pizzas from DB...");
      console.log(err);
      res.status(500).json({ error: "Failed to get list of pizzas" });
    });
});

// GET /pizzas/:pizzaId
app.get("/pizzas/:pizzaId", (req, res, next) => {
  const { pizzaId } = req.params;

  Pizza.findById(pizzaId)
    .then((pizza) => {
      res.json(pizza);
    })
    .catch((error) => {
      console.log("Error getting pizza details from DB");
      console.log(error);
      res.status(500).json({ error: "Failed to get pizza details" });
    });
});

// PUT /pizzas/:pizzaId
app.put("/pizzas/:pizzaId", (req, res, next) => {
  const { pizzaId } = req.params;
  const newDetails = req.body;

  Pizza.findByIdAndUpdate(pizzaId, newDetails, { new: true }) // new: true to receive the new one
    .then((pizza) => {
      res.json(pizza);
    })
    .catch((error) => {
      console.log("Error updating pizza...");
      console.error(error);
      res.status(500).json({ error: "Failed to update the pizza" });
    });
});

// DELETE /pizzas/:pizzaId
app.delete("/pizzas/:pizzaId", (req, res, next) => {
  const { pizzaId } = req.params;

  Pizza.findByIdAndDelete(pizzaId)
    .then((pizza) => {
      res.json(pizza);
    })
    .catch((error) => {
      console.log("Error deleting pizza.");
      console.log(error);
      res.status(500).json({ error: "Failed to delete Pizza." });
    });
});

// POST /cooks -- create new cook
app.post("/cooks", (req, res, next) => {
  const newCook = req.body;

  Cook.create(newCook)
    .then((cook) => {
      res.status(201).json(cook);
    })
    .catch((error) => {
      console.log("Error creating new cook.");
      console.log(error);
      res.status(500).json({ error: "Failed to create new cook" });
    });
});

// Define and listen port
app.listen(PORT, () => {
  console.log(`APP RUNNING on PORT: ${PORT}`);
});
