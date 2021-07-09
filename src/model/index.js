const mongoose = require("mongoose");
require("dotenv").config();

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
    console.log("Something went wrong " + error);
  });

module.exports = mongoose;
