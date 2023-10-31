const User = require('../models/User');

const getAllUsers = async (req, res) => {
    const users = await User.find({}).exec();
    if (req.session.user) {
        if (req.session.user.role == "admin") {
            return res.render('list', { users });
        } else {
            return res.redirect('/user/detail');
        }
    } else {
        return res.redirect('/user/login');
    }
}

const getFormLogin = (req, res) => {
    res.render('login', { data: null, error: null });
}

const checkLogin = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
        //đăng ký session chính là user
        req.session.user = user;
        return res.redirect('/user');
    } else {
        return res.render('login', { error: 'fail', data: { email, password } });
    }
}

const getFormCreateUser = (req, res) => {
    if (req.session.user) {
        if (req.session.user.role == "admin") {
            return res.render('create', { data: null, errors: null });
        } else {
            return res.redirect('/user/detail');
        }
    } else {
        return res.redirect('/user/login');
    }
}

const createUser = async (req, res) => {
    const data = req.body;
    await User.create(data)
        .then(result => {
            req.session.message = "user created successfully";
            res.redirect("/user");
        })
        .catch(err => {
            if (err.name === 'ValidationError') {
                let errors = {};
                for (const field in err.errors) {
                    errors[field] = err.errors[field].message;
                }
                res.render('create', { errors, data });
            }
        })
}

const deleteUser = (req, res) => {
    const userId = req.params.id;
    User.findByIdAndRemove(userId, (err) => {
        req.session.message = "user deleted successfully";
    });
}

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/user/login');
}

const getDetailUser = (req, res) => {
    //dựa vào session để in thông tin ra
    res.render('detail');
}

module.exports = {
    getFormLogin, checkLogin, getAllUsers, getFormCreateUser, createUser, deleteUser, logout, getDetailUser
}