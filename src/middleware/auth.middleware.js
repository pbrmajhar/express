const admin = require("../firebase");

const authCheck = async (req, res, next) => {
  try {
    const user = await admin.auth().verifyIdToken(req.headers.token);
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error });
  }
};

module.exports = authCheck;
