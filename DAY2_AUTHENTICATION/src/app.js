const express = require("express");
const path = require("path");
const session = require("express-session");
const rootRouter = require("./routers/rootRouter");
//const mongoose = require('mongoose');
const { default: mongoose } = require('mongoose');
const app = express();
mongoose.connect('mongodb://127.0.0.1:27017/userdb')
    .then(() => {
        console.log("connect success");
    })
    .catch(error => {
        console.log("error: ", error);
    });
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs'); 

//cài đặt session
app.use(session({
    secret: 'abc123', //mã để đọc session
    resave: false,
    saveUninitialized: false
}))

//xử lý middleware
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(rootRouter);

const PORT = 3000;
app.listen(PORT);