const router = require("express").Router();
const authCheck = require("../middleware/auth.middleware");
const User = require("../model/user.model");

router.post("/singup", authCheck, async (req, res) => {
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );
  if (user) {
    console.log("User Updated!");
    res.send({ user });
  } else {
    const newUser = await new User({ name, email, picture }).save();
    console.log('user created!')
    res.send({ newUser });
  }
});

router.post("/login", (req, res) => {
  res.send("something from login server");
});

module.exports = router;
