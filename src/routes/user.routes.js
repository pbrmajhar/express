const router = require("express").Router();
const { authCheck } = require("../middleware/auth.middleware");
const Cart = require("../model/cart.model");
const User = require("../model/user.model");
const Product = require("../model/product.model");

router.post("/cart", authCheck, async (req, res) => {
  const { cart } = req.body;
  let products = [];

  const user = await User.findOne({ email: req.user.email });
  let oldCart = await Cart.findOne({ orderedBy: user._id });

  if (oldCart) {
    oldCart.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    let { price } = await Product.findById(cart[i]._id).select("price");
    object.price = price;
    products.push(object);
  }

  let cartTotal = 0;

  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  //   console.log('cart product :', products)
  //   console.log('cart total :', cartTotal)

  const newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();
  res.send({ ok: true });
});

router.get("/cart", authCheck, async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  if (!user) {
    res.status(404).send({ error: 'user not found, or please login in again' })
    console.log('user not found, or please login in again')
  }
  const cart = await Cart.findOne({ orderedBy: user._id }).populate(
    "products.product",
    "_id title price"
  );

  const { products, cartTotal } = cart;
  res.send({ products, cartTotal });
});


router.post("/address", authCheck, async (req, res) => {
  const user = await User.findOne({ email: req.user.email })
  const result = await User.findOneAndUpdate({email: req.user.email},{ address: req.body.address }, {new: true})
  res.send({ address: result.address })
})

router.get('/address', authCheck, async (req, res) => {
  const user = await User.findOne({email: req.user.email})
  res.send({address: user.address})
  console.log('getting the user address')
})


module.exports = router;
