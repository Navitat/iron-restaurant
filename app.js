const express = require("express");

const app = express();

const PORT = 3000;

// GET /
app.get("/", (req, res, next) => {
  console.log("received request to the root path...");
  res.send("This is the Homepage");
});

// GET /contact
app.get("/contact", (req, res, next) => {
  console.log("received request to the contact page...");
  res.send("This is the Contact page");
});

// Define port
app.listen(PORT, () => {
  console.log(`APP RUNNING on PORT: ${PORT}`);
});
