const mongoose = require("mongoose");


const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: String,
    detail: String,
    price: String,
    qty: String,

  })
);

module.exports = Product;

