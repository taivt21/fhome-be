const jwt = require("jsonwebtoken");
const serviceAccount = require("../config/serviceAccount.json");
const User = require("../models/user");
var admin = require("firebase-admin");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});



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
      const domain = googlePayload.email.substring(
        googlePayload.email.lastIndexOf("@") + 1
      );

      if (domain === "fpt.edu.vn") {
        const newUser = {
          fullname: googlePayload.name || "",
          email: googlePayload.email,
          img: googlePayload.picture,
          phoneNumber: googlePayload.phoneNumber || "",
          roleName: "fptmember",
          status: true,
        };
        
        const createdUser = await User.create(newUser);

        const payload = {
          id: createdUser.id,
          fullname: createdUser.fullname,
          email: createdUser.email,
          phoneNumber: createdUser.phoneNumber,
          img: createdUser.img,
          status: createdUser.status,
          roleName: createdUser.roleName,
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
        const newUser = {
          fullname: googlePayload.name || "",
          email: googlePayload.email,
          img: googlePayload.picture,
          phoneNumber: googlePayload.phoneNumber || "",
          roleName: "landlord",
          status: false,
        };

        await User.create(newUser);

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


module.exports = {
  login,
};
