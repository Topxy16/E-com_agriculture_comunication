const mongoose = require("mongoose");


const Oder = mongoose.model(
  "Oder",
  new mongoose.Schema({
    idproduct: String,
    qty: String,
    sumprice: String,
    address: String,

  })
);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                
module.exports = Oder;
