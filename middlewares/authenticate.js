const admin = require("firebase-admin");

// Initialize Firebase Admin SDK only if there are no apps already initialized
if (!admin.apps.length) {
  const serviceAccount = require("../config/serviceAccount.json");

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
}
// module.exports = authenticate;





