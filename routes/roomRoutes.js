const express = require("express");
const router = express.Router();
const uploadImage = require("../middlewares/uploadImage");
const roomController = require("../controllers/roomController");


router.post('/rooms', uploadImage, roomController.createRoom);
router.get('/getBuildings',roomController.getBuildings)
// Lấy thông tin post
router.get('/users', userController.getAllUsers);

// Lấy thông tin post
router.get('/users/:id', authorize(['admin', 'landlord']), userController.getUserById);

// Cập nhật thông tin người dùng
router.put('/users/:id', authorize(['admin', 'landlord']), userController.updateUser);

// Xóa người dùng
router.delete('/users/:id', authorize(['admin']), userController.deleteUser);
