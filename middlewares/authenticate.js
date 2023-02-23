
// const admin = require("../config");

// const authenticate = async (req, res, next) => {
//   try {
//     const idToken = req.headers.authorization.split(" ")[1];
//     const decodedToken = await admin.auth().verifyIdToken(idToken);
//     req.user = decodedToken;
//     next();
//   } catch (err) {
//     console.error(err);
//     return res.status(401).send({ message: "Unauthorized" });
//   }
// };

// module.exports = authenticate;






// // const admin = require('../config').admin;

// // const authenticate = async (req, res, next) => {
// //   try {
// //     const headerToken = req.header('Authorization');
// //     if (!headerToken) {
// //       return res.status(401).send({ message: 'Missing auth token' });
// //     }

// //     const token = headerToken.split(' ')[1];
// //     const decodedToken = await admin.auth().verifyIdToken(token);

// //     req.user = decodedToken;
// //     next();
// //   } catch (error) {
// //     console.error(error);
// //     return res.status(401).send({ message: 'Unauthorized' });
// //   }
// // };

// // module.exports = authenticate;