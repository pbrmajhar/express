const router = require("express").Router();
const { authCheck, adminCheck } = require("../middleware/auth.middleware");
const Category = require("../model/category.model");
const slugify = require("slugify");

router.post("/create", authCheck, adminCheck, async (req, res) => {
  const { name } = req.body;
  try {
    const result = await new Category({ name, slug: slugify(name) }).save();
    res.send(result);
  } catch (error) {
    res.send("something went wrong");
  }
});

router.get("/categories", async (req, res) => {
  try {
    const result = await Category.find().sort({ createdAt: -1 });
    res.send(result);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

router.get("/category/:slug", async (req, res) => {
  try {
    const result = await Category.findOne({ slug: req.params.slug });
    res.send(result);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

router.delete("/category/:slug", authCheck, adminCheck, async (req, res) => {
  try {
    const deleteCat = await Category.findOneAndDelete({
      slug: req.params.slug,
    });
    res.send(deleteCat);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/category/:slug", authCheck, adminCheck, async (req, res) => {
  try {
    const result = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name: req.body.name, slug: slugify(req.body.name) },
      { new: true }
    );
    res.send(result);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

module.exports = router;
