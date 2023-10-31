const express = require('express');
const path = require('path');
const session = require('express-session');
const rootRouter = require('./routers/rootRouter');
const { default:mongoose } = require('mongoose');
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/userdb')
    .then( ()=> console.log("connect success"))
    .catch(error => console.log("error:",error));

app.use(express.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//cai dat session
app.use(session({
    secret: 'abc123', //ma de doc session tu client
    resave: false,
    saveUninitialized: false
}))

//xu ly middleware
app.use((req, res,next)=>{
    res.locals.user = req.session.user;
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.use(rootRouter);

const PORT = 3000;
app.listen(PORT, ()=> {
    console.log(`server is running on http://localhost:${PORT}`);
})