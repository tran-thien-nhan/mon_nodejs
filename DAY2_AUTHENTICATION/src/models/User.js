const { Schema, default: mongoose } = require("mongoose");
const userSchema = new Schema({
    name: {
        type: String,
        require: [true, "Name is require"]
    },
    email: {
        type: String,
        require: [true, "Email is require"]
    },
    password: {
        type: String,
        require: [true, "Password is require"]
    },
    Age: {
        type: Number,
        require: [true, "Age is require"],
        min: [10, "Min age is 10"],
        max: [60, "Max age is 60"]
    },
    Role: {
        type: String,
        require: [true, "Role is require"]
    },
});

const User = mongoose.model("User", userSchema);
module.exports = User;