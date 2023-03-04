const admin = require("firebase-admin");

// Initialize Firebase Admin SDK only if there are no apps already initialized
if (!admin.apps.length) {
  const serviceAccount = require("../config/serviceAccount.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const authenticate = async (req, res, next) => {
  try {
    // Get the ID token from the request's authorization header
    const idToken = req.headers.authorization.split("Bearer ")[1];
    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    // Add the user's ID to req.user
    req.user = decodedToken;
    console.log(decodedToken);
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = authenticate;
