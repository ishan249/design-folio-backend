"use strict";

var mongoose = require("mongoose");
var multer = require("multer");
var fileSchema = new mongoose.Schema({
  // here we setup the file name so how our file going to store
  data: Buffer,
  contentType: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});
var userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  description: String,
  linkedinlink: String,
  githublink: String,
  behancelink: String,
  skill: [String],
  projects: [{
    projectName: String,
    projectDescription: String,
    projectLink: String
  }]
});
var File = mongoose.model("File", fileSchema);
;
var User = mongoose.model("User", userSchema);
module.exports = {
  User: User,
  File: File
};