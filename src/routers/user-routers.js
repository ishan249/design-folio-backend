const express = require("express");
const fs = require("fs");
const nodemailer = require("nodemailer"); 
const router = new express.Router();
const upload = require("../middleware/upload.js");
const MongoClient = require("mongodb").MongoClient;
const {User,File} = require("../models/user.js");
require("dotenv").config();
const client = new MongoClient(process.env.PORTFOLIO_DBURL);
client.connect();

const smtpProtocol = nodemailer.createTransport({
  service: "gmail",
  auth: {
      user: "ishanp2022@gmail.com",
      pass: process.env.EMAIL_PASSWORD
  },
  tls: {
      rejectUnauthorized: false
  }
})
router.post("/user/create", upload.single("myFile"),async (req, res) => {
 
  const {
    name,
    email,
    role,
    description,
    githublink,
    behancelink,
    linkedinlink,
    skill,
    projects,
  } = req.body;
  const user = new User({
    name,
    email,
    role,
    description,
    githublink,
    behancelink,
    linkedinlink,
    skill,
    projects,
  });
  try {
    await user.save();
    if (!req.file) {
     console.log("all fields are required")
    }

    else {
      const file = new File({
        data: fs.readFileSync("./src/uploads/" + req.file.filename),
        contentType: "image/png",
        user: user._id,
      });
      const response = await file.save();
      res.status(201).json({message: "new user with image created" });
    }
  } catch (e) {
    res.send("can't add user");
  }
});

router.get("/user/data", async (req,res)=>{
  const {urlMail} = req.query;
  const user = await User.findOne({email:urlMail});
  const userId = user._id;
  const file = await File.findOne({user:userId});
  res.status(201).json([{user,file}]);
});


router.post("/email/validate",async (req,res)=>{
  const {email} = req.query;
  const {otp}= req.query;
  const findEmail = await User.findOne({email:email});
  if(!findEmail){
    var mailOptions = {
        from: "ishanp2022@gmail.com",
        to: email,
        subject: "OTP for verification",
        html:`Your otp for verification is : ${otp}`
    }
    smtpProtocol.sendMail(mailOptions, function (err, success) {
      if (err) {
          console.log(err);
      }
      else {
        res.send("user not found");
      }
      smtpProtocol.close();
  });
  }
  else{
    res.send("User found");
  }
});


router.post("/find/user", async (req,res)=>{
  const {email} = req.query;
  const findEmail = await User.findOne({email:email})
  if(!findEmail){
    res.send("User not found");
  }
  else{
    res.send("User found");
  }
})

module.exports = router;
