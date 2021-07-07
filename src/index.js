const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(bodyParser.json());
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log("Mongo DB is connected");
  })
  .catch((error) => {
    console.log('Something went wrong '+error);
  });

app.get("/", (req, res) => {
  res.send("Hello there");
});

app.listen(4000, () => {
  console.log("express server is running on port 4000");
});
