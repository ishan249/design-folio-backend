"use strict";

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "./src/uploads/");
  },
  filename: function filename(req, file, cb) {
    var date = new Date();
    cb(null, file.originalname + "" + date.getSeconds());
  }
});
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000 * 100
  }
});
module.exports = upload;