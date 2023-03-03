
const admin = require("../config");

const authenticate = async (req, res, next) => {
  try {
    const idToken = req.headers('Authorize').split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = authenticate;





