
const User = require("../models/user");
const jwt = require("jsonwebtoken");

function authorize(roles) {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (!roles.includes(req.user.roleName)) {
        return res.status(403).send({ message: "Forbidden" });
      }
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  }
}


module.exports = authorize;
