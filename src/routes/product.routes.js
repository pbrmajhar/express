const router = require("express").Router();
const { authCheck, adminCheck } = require("../middleware/auth.middleware");
const Product = require("../model/product.model");
const slugify = require("slugify");
const multer = require('multer')

const storage = multer.memoryStorage({})
const upload = multer({storage: storage})

router.post("/create", authCheck, adminCheck, upload.single("file"), async (req, res) => {
  try {
    console.log({title: req.body.title});
    console.log({title: req.file.buffer});
    //req.body.slug = slugify(req.body.title);
    // const product = await new Product(req.body).save();
    res.send('hello');
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
