const admin = require("../firebase");
const User = require("../model/user.model");

exports.authCheck = async (req, res, next) => {
  try {
    const user = await admin.auth().verifyIdToken(req.headers.token);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error });
  }
};

exports.adminCheck = async (req, res, next) => {
  try {
    const isAdmin = await User.findOne({email: req.user.email})
    if(isAdmin.role !== 'admin'){
      res.status(401).send('you are not authorized')
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send({ error });
  }
};
