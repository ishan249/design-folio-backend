const mongoose = require("mongoose");
const multer = require("multer");

const fileSchema = new mongoose.Schema({
  // here we setup the file name so how our file going to store
   data: Buffer,
   contentType: String,
  user:{ type: mongoose.Schema.Types.ObjectId,
    ref: 'User'}
});




const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  description:String,
  linkedinlink: String,
  githublink: String,
  behancelink:String,
  skill: [String],
  projects: [
    {
      projectName: String,
      projectDescription: String,
      projectLink: String,
    },
  ],
});



const File = mongoose.model("File", fileSchema);;
const User = mongoose.model("User", userSchema);
module.exports = {User,File};
