const router = require("express").Router();
const { authCheck, adminCheck } = require("../middleware/auth.middleware");
const Product = require("../model/product.model");
const slugify = require("slugify");
const multer = require("multer");
const { count } = require("../model/product.model");

const storage = multer.memoryStorage({});
const upload = multer({ storage: storage });

// Creating post
router.post(
  "/create",
  authCheck,
  adminCheck,
  upload.single("file"),
  async (req, res) => {
    try {
      const product = await new Product({
        title: req.body.title,
        slug: slugify(req.body.title),
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        sub_category: req.body.sub_category,
        quantity: req.body.quantity,
        images: req.file.buffer,
        shipping: req.body.shipping,
        colors: req.body.colors,
        brands: req.body.brands,
        size: req.body.size,
      }).save();
      res.send(product);
    } catch (error) {
      console.log(error);
    }
  }
);

// Counting post
router.get("/products/:count", async (req, res) => {
  try {
    const count = req.params.count;
    const result = await Product.find()
      .limit(parseInt(count))
      .populate("category")
      .populate("sub_category");
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

// get all post
router.get("/products/", async (req, res) => {
  const { perpage, currentpage } = req.query;
  try {
    const result = await Product.find({})
      .limit(parseInt(perpage))
      .skip(parseInt(currentpage || 0) * perpage)
      .populate("category")
      .populate("sub_category");

    const total = await Product.countDocuments();
    res.send({ totalPages: Math.ceil(total / perpage), products: result });
  } catch (error) {
    console.log(error);
  }
});

// get a single post
router.get("/product/:slug", async (req, res) => {
  try {
    const response = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .populate("sub_category");
    res.send(response);
  } catch (error) {
    console.log(error);
  }
});

// delete a spacific post
router.delete("/product/:id", authCheck, adminCheck, async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.post("/product/search", async (req, res) => {
  const { search, price } = req.body;
  try {
    if (search) {
      const result = await Product.find({ $text: { $search: search } })
        .populate("category", "_id name")
        .populate("sub_category", "_id name");
      res.send(result);
    }
    if (price) {
      const result = await Product.find({
        price: {
          $gte: price[0],
          $lte: price[1],
        },
      })
        .populate("category", "_id name")
        .populate("sub_category", "_id name");
      res.send(result);
    }
    // console.log(result);
  } catch (error) {}
});

module.exports = router;
