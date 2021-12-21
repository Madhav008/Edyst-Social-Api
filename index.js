const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");
const cors = require("cors");
dotenv.config();
mongoose.connect(
  process.env.Mongo_Uri,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.log("Connected To Mongo");
  }
);

app.use(cors());
//middleware
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome To HomePage");
});
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

app.listen(8000, () => {
  console.log("Backed Is Conected");
});
