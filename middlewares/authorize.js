
const User = require("../models/user");

const authorize = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.uid);
      if (!user) {
        return res.status(404).send({ message: "User not found" });
      }
      if (user.roleName !== role) {
        return res.status(403).send({ message: "Forbidden" });
      }
      next();
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal Server Error" });
    }
  };
};

module.exports = authorize;








// function authorize(roles) {
//     return (req, res, next) => {
//       // Lấy thông tin người dùng từ token
//       const { role } = req.user;
  
//       // Kiểm tra xem người dùng có quyền truy cập vào API hay không
//       if (!roles.includes(role)) {
//         return res.status(403).json({ message: 'Forbidden.' });
//       }
  
//       next(); // Người dùng có quyền, chuyển tiếp yêu cầu đến controller
//     };
//   }
  
//   module.exports = authorize;