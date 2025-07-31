const router = require("express").Router();
const Cook = require("../models/Cook.model");

// POST /cooks -- create new cook
router.post("/cooks", (req, res, next) => {
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

module.exports = router;
