const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema({
    name:{
        type:String
    }
});

const task = new mongoose.model("TaskData", taskSchema);
module.exports = task;