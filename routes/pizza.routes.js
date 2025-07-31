const router = require("express").Router();
const Pizza = require("../models/Pizza.model.js");

// POST /pizzas -- create a new pizza
router.post("/pizzas", (req, res, next) => {
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
router.get("/pizzas", (req, res, next) => {
  const { maxPrice } = req.query;

  let filter = {};

  if (maxPrice !== undefined) {
    filter = { price: { $lte: maxPrice } };
  }

  Pizza.find(filter)
    .populate("cook")
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
router.get("/pizzas/:pizzaId", (req, res, next) => {
  const { pizzaId } = req.params;

  Pizza.findById(pizzaId)
    .populate("cook")
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
router.put("/pizzas/:pizzaId", (req, res, next) => {
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
router.delete("/pizzas/:pizzaId", (req, res, next) => {
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

module.exports = router;
