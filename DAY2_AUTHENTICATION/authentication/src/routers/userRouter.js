const express =  require('express');
const {getFormLogin, checkLogin, getAllUsers, getFormCreateUser} 
            = require('../controllers/userControllers')

const userRouter = express.Router();
userRouter.get('/', getAllUsers);
userRouter.get('/login', getFormLogin);
userRouter.post('/login', checkLogin);
userRouter.get('/create',getFormCreateUser);

module.exports = userRouter;