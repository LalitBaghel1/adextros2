const express = require("express");
const app = express();
const path = require("path");
const multer  = require('multer');
const task = require("./modal/task");
const router = require("./controller/router");

// admin 
const admin = require("./admin/dashboard");
require("./db/conn");
const PORT = process.env.PORT || 3000;
// paths All
const ejsPth = path.join(__dirname, "views/templates");
// const adminPath = path.join(__dirname, "views/admin");
const staticPath = path.join(__dirname, "public");

app.set("view engine", "ejs");
app.set('views', ejsPth);

app.use(express.static(staticPath));
app.use("/admin", express.static(staticPath));
app.use("/admin/blogeditble", express.static(staticPath));
app.use(express.urlencoded({extended:true}));
app.use(express.json({}));
app.use(router);
app.use("/admin", admin);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploadimages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '_' +path.extname(file.originalname); 
      cb(null, file.fieldname + '_' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage }).single("file");

app.get("/uploadfile", (req,res)=>{
    res.render("uploadfile");  
});
app.post("/uploadfile", upload, (req,res)=>{
    res.render("uploadfile");
});
app.listen(PORT, ()=>{
    try{
        console.log(`Port ${PORT} Connection SuccessFull`)
    }catch(err){
        console.log(err);
    }
});