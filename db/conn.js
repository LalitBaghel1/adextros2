const mongoose = require("mongoose");
const ConnectionString = "mongodb+srv://lalitbaghel:lalit1234@dashboardnodedatabase.lyg7e.mongodb.net/Datablog?retryWrites=true&w=majority";
mongoose.connect(ConnectionString)
.then(()=>{
    console.log("mongoose Database Connection Successfull")
}).catch((err)=>{
    console.log(err);
})