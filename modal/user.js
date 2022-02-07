const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    FullName:{
        type:String,
        required:true
    },
    MobileNumber:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String
    },
    created:{
        type:Date,
        required:true,
        default:()=>Date.now()
    }
});

const user = new mongoose.model("User", userSchema);

module.exports = user;

