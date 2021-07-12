const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const mongoose = require("./model");
const app = express();

// import routes
const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");

const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api", authRoutes);
app.use("/api/cat", categoryRoutes);

app.listen(PORT, () => {
  console.log(`express server is running on port ${PORT}`);
});
