"use strict";

var mongoose = require("mongoose");
require("dotenv").config;
function connectDB() {
  if (process.env.PORTFOLIO_DBURL.startsWith("mongodb://") || process.env.PORTFOLIO_DBURL.startsWith("mongodb+srv://")) {
    mongoose.connect(process.env.PORTFOLIO_DBURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(function () {
      return console.log("db connected");
    })["catch"](function (err) {
      return console.log(err);
    });
  }
  var connection = mongoose.connection;
}
module.exports = connectDB;