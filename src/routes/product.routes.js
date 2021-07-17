const router = require("express").Router();
const { authCheck, adminCheck } = require("../middleware/auth.middleware");
const Product = require("../model/product.model");
const slugify = require("slugify");

router.post("/create", (req, res) => {
  try {
      
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(400).send("admin admin");
  }
});

module.exports = router;
