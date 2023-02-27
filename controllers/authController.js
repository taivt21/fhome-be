const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const serviceAccount = require("../config/serviceAccount.json");
const User = require("../models/user");
var admin = require("firebase-admin");
const mongoose = require("mongoose");
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

    const userLogin = await User.findOne({
      email: googlePayload.email,
      status: true,
    });
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
      console.log(payload);
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
      if (checkEmailDomain(googlePayload.email, ["fpt.edu.vn"])) {
        register(req, res);
      } else {
          debugger
          const newUser = {
            fullname: googlePayload.name || "",
            email: googlePayload.email,
            img: googlePayload.picture,
            phoneNumber: googlePayload.phoneNumber || "",
            status: false,
          };
          console.log(googlePayload);
          await User.insertMany(newUser)
          res.status(400).json({
            status: "Fail",
            messages:
              "Your email domain is not supported. Please contact your administrator to support your account!",
          });
        
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
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
      await User.insertMany(decodeUser).then((user) => {
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
const getData = async (req, res) => {
  try {
    const users = await User.find({ status: false });
    res.status(200).json({
      status: "Success",
      messages: "Get users successfully!",
      data: {
        users
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
}
const setUserStatus = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { status: true},
      { new: true } // trả về user sau khi đã update
    );
    if (!updatedUser || !updatedUser.status) {
      return res.status(404).json({
        status: "Fail",
        messages: "User not found or status is not true",
      });
    }
    res.status(200).json({
      status: "Success",
      messages: "User status updated successfully!",
      data: {
        user: updatedUser
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        status: "Fail",
        messages: "User not found",
      });
    }

    res.status(200).json({
      status: "Success",
      messages: "User deleted successfully!",
      data: {
        user: deletedUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

module.exports = {
  login,
  register,
  getData,
  setUserStatus,
  deleteUser
};
