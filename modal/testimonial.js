const mongoose = require("mongoose");
const testSchema = new mongoose.Schema({
    review:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    authType:{
        type:String,
        required:true
    },
    filename:{
        type:String
    },
    createdAt:{
        type:Date,
        required:true,
        default:()=> Date.now()
    }
});

module.exports = new mongoose.model("testimonial", testSchema);