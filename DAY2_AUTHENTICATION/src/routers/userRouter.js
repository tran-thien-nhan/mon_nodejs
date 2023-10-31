const express = require('express');
const { getFormLogin, checkLogin, getAllUsers, getFormCreateUser, createUser, deleteUser }
    = require('../controllers/userControllers')

const userRouter = express.Router();
userRouter.get('/', getAllUsers);
userRouter.get('/login', getFormLogin);
userRouter.post('/login', checkLogin);
userRouter.get('/create', getFormCreateUser);
userRouter.post('/create', createUser);
userRouter.get('/delete/:id', deleteUser);

module.exports = userRouter;
