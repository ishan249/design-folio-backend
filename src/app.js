const express = require("express");
const cors = require("cors")
const path = require("path");
const bodyParser = require("body-parser");
const userRouter = require("./routers/user-routers.js");
const app = express();

app.use(cors({
  origin:["http://localhost:3000", "https://designfolio.onrender.com"],
}));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

const connectDB = require("./db/mongoose.js");
connectDB();
app.use(userRouter)

const port = process.env.PORT || 8000

app.listen(port, () => console.log(`Server is running on ${port}`))

// cd F:/reactjs/portfolio-builder