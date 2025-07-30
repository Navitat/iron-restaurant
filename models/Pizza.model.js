const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pizzaSchema = new Schema({
  title: { type: String, required: true, unique: true },
  price: { type: Number, required: true, min: 1, max: 99 },
  isVeggie: { type: Boolean, default: false },
  ingredients: [String],
  dough: {
    type: String,
    enum: ["thin", "thick", "with garlic", "with cheese"],
  },
  cook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Cook", // the other collection
  },
});

const Pizza = mongoose.model("Pizza", pizzaSchema);

module.exports = Pizza;
