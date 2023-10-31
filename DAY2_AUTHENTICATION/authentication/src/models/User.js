const {Schema, default : mongoose} = require('mongoose');
const userShema = new Schema({
    name:{
        type:String,
        required:[true,'Name is required']
    },
    email:{
        type:String,
        required:[true,'Email is required']
    },
    passwod:{
        type:String,
        required:[true,'Password is required']
    },
    age:{
        type:Number,
        required:[true,'Age is required'],
        min:[10, 'Min age is 10'],
        max:[60, 'Max age is 60']
    },
    role:{
        type:String,
        required:[true,'Role is required']
    },
});

const User = mongoose.model("User", userShema);
module.exports = User;