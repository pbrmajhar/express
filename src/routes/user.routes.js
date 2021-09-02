const router = require("express").Router();
const { authCheck } = require("../middleware/auth.middleware");
const Cart = require("../model/cart.model");
const User = require("../model/user.model");
const Product = require("../model/product.model");

router.post("/cart", authCheck, async (req, res) => {
  const { cart } = req.body;
  let products = [];

  const user = await User.findOne({ email: req.user.email });
  let oldCart = await Cart.findOne({ orderdBy: user._id });

  if (oldCart) {
    oldCart.remove();
    console.log("cart is removed!");
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
  console.log(newCart);
});

module.exports = router;
