const admin = require("../firebase");

const authCheck = async (req, res, next) => {
  try {
    console.log(req.headers.token)
    const user = await admin.auth().verifyIdToken(req.headers.token);
    console.log('user with auth ',user);
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error });
  }
};

module.exports = authCheck;
