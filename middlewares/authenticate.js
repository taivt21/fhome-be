
require("dotenv").config();
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  // Lấy token từ header Authorization
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    console.log("err");
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Kiểm tra xem token đã hết hạn chưa
    const now = Math.floor(Date.now() / 1000);
    const exp = decoded.exp;

    if (now >= exp) {
      // Token đã hết hạn, kiểm tra refresh token
      const refreshToken = decoded.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          return res.status(401).json({ message: 'Unauthorized' });
        }

        // Tạo access token mới từ refresh token
        const payload = { ...decoded, exp: now + 3600 };
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET);

        // Lưu access token mới vào header Authorization
        req.headers.authorization = `Bearer ${accessToken}`;
        req.user = payload;

        next();
      });
    } else {
      // Token còn hiệu lực, lưu thông tin user vào request
      req.user = decoded;
      next();
    }
  });
};

module.exports = authenticate;