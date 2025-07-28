const express = require("express");

const app = express();

const PORT = 3000;

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

// Define and listen port
app.listen(PORT, () => {
  console.log(`APP RUNNING on PORT: ${PORT}`);
});
