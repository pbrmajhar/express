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
const subcategory = require("./routes/subcategory.routes");
const product = require("./routes/product.routes");
const upload = require("./routes/file.routes");

const PORT = process.env.PORT || 4000;

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api", authRoutes);
app.use("/api/cat", categoryRoutes);
app.use("/api/sub/cat", subcategory);
app.use("/api/product", product);
app.use("/api/", upload);

app.listen(PORT, () => {
  console.log(`express server is running on port ${PORT}`);
});
