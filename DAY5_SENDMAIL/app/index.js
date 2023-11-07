const express = require('express');
const path = require('path');
const session = require('express-session');
const emailRouter = require('./routers/mail.router');
const app = express();

const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//static file
const publicDirectory = path.join(__dirname, "public");
app.use(express.static(publicDirectory));

//gọi session use router
app.use(
    session({
        secret: 'abc123', //ma de doc session tu client
        resave: true,
        saveUninitialized: false,
        cookie: { maxAge: 60000 }
    })
);

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
})

app.get("/", (req, res) => {
    res.send("hello world");
})

app.use(emailRouter);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server is running on http://localhost:${PORT}/email`);
})
