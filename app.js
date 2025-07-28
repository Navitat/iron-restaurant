const express = require("express");

const app = express();

const PORT = 3000;

//Make the static files inside "public" folder publicly to the end-user
app.use(express.static("public"));

// GET /
app.get("/", (req, res, next) => {
  console.log("received request to the root path...");
  res.send(`
    <link rel="stylesheet" href="/css/main.css" />
    <h1>This is the HomePage</h1>
    <h2>Oh wow</h2>
    <img src="/images/home.jpg" alt="image of pizza slices"/>
    `);
});

// GET /contact
app.get("/contact", (req, res, next) => {
  console.log("received request to the contact page...");
  res.send("<h1>This is the Contact page</h1>");
});

// Define port
app.listen(PORT, () => {
  console.log(`APP RUNNING on PORT: ${PORT}`);
});
