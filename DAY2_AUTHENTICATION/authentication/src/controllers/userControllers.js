const User = require('../models/User');

const getAllUsers = async (req, res) =>{
    const users = await User.find({}).exec();
    if(req.session.user){
        if(req.session.user.role == "admin"){
            return res.render('list', {users});
        }else{
            return res.redirect('/user/detail');
        }
    }else{
        return res.redirect('/user/login');
    }
}

const getFormLogin = (req, res) =>{
    res.render('login', {data:null, error:null});
}

const checkLogin = async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({email, password});
    if(user){
        req.session.user = user;
        return res.redirect('/user');
    }else{
        return res.render('login', {error: 'fail', data: {email, password}});
    }
}

const getFormCreateUser = (req, res) =>{
    // if(req.session.user){
    //     if(req.session.user.role == "admin"){
    //         return res.render('create', {data:null, error:null});
    //     }else{
    //         return res.redirect('/user/detail');
    //     }
    // }else{
    //     return res.redirect('/user/login');
    // }    

    return res.render('create', {data:null, error:null});
}

module.exports = {
    getFormLogin, checkLogin, getAllUsers, getFormCreateUser
}