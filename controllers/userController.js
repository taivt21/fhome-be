const User = require('../models/user');
const mongoose = require('mongoose');
// Lấy thông tin tất cả người dùng
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-__v');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin người dùng theo ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-__v');
    //bên url đặt biến là id thì bên này gọi id chứ không phải userID
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Tạo người dùng mới
exports.createUser = async (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    fullname: req.body.fullname,
    img: req.body.img,
    roleName: req.body.roleName,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Cập nhật thông tin người dùng
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (req.body.email) {
      user.email = req.body.email;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    if (req.body.phoneNumber) {
      user.phoneNumber = req.body.phoneNumber;
    }

    if (req.body.fullname) {
      user.fullname = req.body.fullname;
    }

    if (req.body.img) {
      user.img = req.body.img;
    }

    if (req.body.roleName) {
      user.roleName = req.body.roleName;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Xoá người dùng
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = 'inactive';
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//get data theo status false
exports.getData = async (req, res) => {
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
//set status user thành true
exports.setUserStatus = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(
      mongoose.Types.ObjectId(userId),
      { status: true, roleName: "landlord" },
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
//delete User theo id
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    console.log(deletedUser)

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
        // user: deletedUser,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "Fail",
      messages: err.message,
    });
  }
};

