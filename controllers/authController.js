const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const serviceAccount = require("../config/serviceAccount.json");
const User = require("../models/user");
var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const checkEmailDomain = (email, listDomain) => {
  const domain = email.substring(email.lastIndexOf("@") + 1);
  return listDomain.includes(domain);
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const login = async (req, res) => {
  try {
    const googlePayload = jwt.decode(
      req.body.accessToken,
      serviceAccount.private_key
    );

    const userLogin = await User.findOne({ email: googlePayload.email });
    if (userLogin) {
      const payload = {
        id: userLogin.id,
        fullname: userLogin.fullname,
        email: userLogin.email,
        phoneNumber: userLogin.phoneNumber,
        img: userLogin.img,
        status: userLogin.status,
        roleName: userLogin.roleName,
      };
      const accessToken = createAccessToken(payload);
      res.status(200).json({
        status: "Success",
        messages: "Login successfully!",
        data: {
          user: payload,
          accessToken,
        },
      });
    } else {
      // checkEmailDomain(googlePayload.email, ["fpt.edu.vn"])
      //   ? register(req, res)
      //   : res.status(400).json({
      //       status: "Fail",
      //       messages:
      //         "Please contact your administrator to support your account!",
      //     });
      res.status(400).json("err");
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      // messages: err.messages,
    });
  }
};

const register = async (req, res) => {
  try {
    const googlePayload = jwt.decode(
      req.body.accessToken,
      process.env.FIREBASE_SECRET
    );

    const decodeUser = {
      fullname: googlePayload.fullname,
      email: googlePayload.email,
      img: googlePayload.img,
      phoneNumber: googlePayload.phoneNumber,
      status: true,
    };

    const existingUser = await User.findOne({ email: decodeUser.email });

    if (existingUser) {
      res.status(400).json({
        status: "Fail",
        messages: "Email already exists",
      });
    } else {
      await User.insertOne(decodeUser).then((user) => {
        const payload = {
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          img: user.img,
          status: user.status,
          roleName: "fptmember",
        };
        const accessToken = createAccessToken(payload);
        res.status(200).json({
          status: "Success",
          messages: "Login successfully!",
          data: {
            user: payload,
            accessToken,
          },
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      messages: error.message,
    });
  }
};

module.exports = {
  login,
  register,
};
