const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json()); //xử lý dữ liệu json
app.use(bodyParser.urlencoded({ extended: true })); //xử lý dữ liệu từ form
app.get("/", function (req, res) {
    console.log("get/");
    res.send("hello world");
});

app.get("/hello", function (req, res) {
    console.log("get: /hello");
    res.send("hello world from get /hello");
});

app.post("/hello", (req, res) => {
    const postData = req.body; //lấy dữ liệu từ yêu cầu post
    console.log(JSON.stringify(postData));
    res.send("received from client:", JSON.stringify(postData));
});

app.listen(3000);