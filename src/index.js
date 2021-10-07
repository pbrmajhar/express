const express = require("express");
const path = require("path");
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
const userRouter = require("./routes/user.routes");
const paymentRouter = require('./routes/payment.routes')

const PORT = process.env.PORT || 4000;

app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());

// routes
app.use("/api", authRoutes);
app.use("/api/cat", categoryRoutes);
app.use("/api/sub/cat", subcategory);
app.use("/api", product);
app.use("/api/user", userRouter);
app.use("/api/payment", paymentRouter);

app.listen(PORT, () => {
  console.log(`express server is running on port ${PORT}`);
});
