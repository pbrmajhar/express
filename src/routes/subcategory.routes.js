const router = require("express").Router();
const { authCheck, adminCheck } = require("../middleware/auth.middleware");
const Subcategory = require("../model/subcategory.model");
const slugify = require("slugify");

router.post("/create", authCheck, adminCheck, async (req, res) => {
  const { name, id } = req.body;
  try {
    const result = await new Subcategory({
      name,
      slug: slugify(name),
      parent: id,
    }).save();
    res.send(result);
  } catch (error) {
    res.send("something went wrong");
  }
});

router.get("/categories", async (req, res) => {
  try {
    const result = await Subcategory.find().sort({ createdAt: -1 });
    res.send(result);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

router.get("/category/:slug", async (req, res) => {
  try {
    const result = await Subcategory.findOne({ slug: req.params.slug });
    res.send(result);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

router.delete("/category/:slug", authCheck, adminCheck, async (req, res) => {
  try {
    const deleteCat = await Subcategory.findOneAndDelete({
      slug: req.params.slug,
    });
    res.send(deleteCat);
  } catch (error) {
    res.send(error);
  }
});

router.patch("/category/:slug", authCheck, adminCheck, async (req, res) => {
  try {
    const result = await Subcategory.findOneAndUpdate(
      { slug: req.params.slug },
      {
        name: req.body.name,
        slug: slugify(req.body.name),
        parent: req.body.parentCat,
      },
      { new: true }
    );
    res.send(result);
  } catch (error) {
    res.status(400).send("something went wrong");
  }
});

module.exports = router;
