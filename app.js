const pizzasArr = require("./data/pizzas.js");
const express = require("express");
const logger = require("morgan");

const app = express();

const PORT = 3000;

//setup request logger to run on each request
app.use(logger("dev"));

//Make the static files inside "public" folder publicly to the end-user
app.use(express.static("public"));

// JSON middleware to parse incoming HTTP requests that contain JSON
app.use(express.json());

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

// GET /
app.get("/", (req, res, next) => {
  res.sendFile(__dirname + "/views/home.html");
});

// GET /contact
app.get("/contact", (req, res, next) => {
  res.sendFile(__dirname + "/views/contact.html");
});

// GET /pizzas, send json response
// GET /pizzas?maxPrice=x
app.get("/pizzas", (req, res, next) => {
  const { maxPrice } = req.query; //will give undefined if no req.params

  if (maxPrice === undefined) {
    res.json(pizzasArr);
    return;
  }

  const filteredPizzas = pizzasArr.filter(
    (pizza) => pizza.price <= parseFloat(maxPrice) //in this case it can be a decimal
  );

  res.json(filteredPizzas);
});

// GET /pizzas/:pizzaId json response
app.get("/pizzas/:pizzaId", (req, res, next) => {
  let { pizzaId } = req.params;
  pizzaId = parseInt(pizzaId); //from req.params

  const result = pizzasArr.find((pizza) => pizza.id === pizzaId);

  res.json(result);
});

// Define and listen port
app.listen(PORT, () => {
  console.log(`APP RUNNING on PORT: ${PORT}`);
});
