const mongoose = require("mongoose");
const sliderSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    filename:{
        type:String
    },
    createdAt:{
        type:Date,
        required:true,
        default:()=>Date.now()
    }
});

module.exports = new mongoose.model("HomeSlider", sliderSchema);