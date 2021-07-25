const router = require("express").Router();
const { authCheck, adminCheck } = require("../middleware/auth.middleware");
const Product = require("../model/product.model");
const slugify = require("slugify");

router.post("/create", authCheck, adminCheck, async (req, res) => {
  try {
    console.log(req.body);
    req.body.slug = slugify(req.body.title);
    const product = await new Product(req.body).save();
    res.send(product);
  } catch (error) {
    console.log(error);
  }
});

router.get("/products", async (req, res) => {
  try {
    const result = await Product.find();
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
