
const admin = require("../config/serviceAccount.json");

exports.authenticate = async (req, res, next) => {
  try {
    const idToken = req.headers.authorization.split("Bearer ")[1];

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    console.log(decodedToken)
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({ message: "Unauthorized" });
  }
};

// module.exports = authenticate;





