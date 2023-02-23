const express = require('express');
const userController = require('../controllers/userController');
const authorize = require('../middlewares/authorize');
const router = express.Router();

// Thêm người dùng mới
router.post('/users', authorize(['admin']), userController.createUser);

// Lấy thông tin tất cả người dùng
router.get('/users', authorize(['admin', 'landlord']), userController.getAllUsers);

// Lấy thông tin một người dùng
router.get('/users/:id', authorize(['admin', 'landlord']), userController.getUserById);

// Cập nhật thông tin người dùng
router.put('/users/:id', authorize(['admin', 'landlord']), userController.updateUser);

// Xóa người dùng
router.delete('/users/:id', authorize(['admin']), userController.deleteUser);

module.exports = router;