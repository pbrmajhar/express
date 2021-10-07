const router = require("express").Router();
const { authCheck, adminCheck } = require("../middleware/auth.middleware");
const User = require("../model/user.model");

router.post("/singup", authCheck, async (req, res) => {
  const { name, picture, email } = req.user;
  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );
  if (user) {
    res.send(user);
  } else {
    const newUser = await new User({ name, email, picture }).save();
    res.send(newUser);
  }
});

router.post("/currentuser", authCheck, async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.send(user);
  });
});

router.post("/currentadmin", authCheck, adminCheck, async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.send(user);
  });
});



router.post("/login", (req, res) => {
  res.send("something from login server");
});

module.exports = router;
