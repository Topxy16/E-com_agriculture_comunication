const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.Oder = require("./by_order.model");
db.Product = require("./sl_product.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;