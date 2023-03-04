"use strict";

var express = require("express");
var cors = require("cors");
var path = require("path");
var bodyParser = require("body-parser");
var userRouter = require("./routers/user-routers.js");
var app = express();
var mongoose = require("mongoose");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
var connectDB = require("./db/mongoose.js");
connectDB();
app.use(userRouter);
app.listen(8000, function () {
  console.log("app is running on 8000");
});

// cd F:/reactjs/portfolio-builder