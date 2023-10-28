// Import thư viện express để tạo router.
const express = require('express');

// Import router của user (userRouter) từ tệp userRouter.js.
const userRouter = require('./userRouter');

// Tạo một router mới bằng express.Router().
const rootRouter = express.Router();

// Sử dụng userRouter khi nhận yêu cầu đến '/user'.
rootRouter.use('/user', userRouter);

// Xuất router này để sử dụng trong ứng dụng chính.
module.exports = rootRouter;
