// Import thư viện express để tạo router.
const express = require('express');

// Import các route handlers từ userControllers.
const { getAllUsers, getFormLogin, checkLogin } = require('../controllers/userControllers');

// Tạo một router mới bằng express.Router().
const userRouter = express.Router();

// Xử lý yêu cầu GET đến route chính '/' bằng route handler "getAllUsers".
userRouter.get('/', getAllUsers);

// Xử lý yêu cầu GET đến route '/login' bằng route handler "getFormLogin".
userRouter.get('/login', getFormLogin);

// Xử lý yêu cầu POST đến route '/login' bằng route handler "checkLogin".
userRouter.post('/login', checkLogin);

// Xuất router này để sử dụng trong ứng dụng chính.
module.exports = userRouter;
