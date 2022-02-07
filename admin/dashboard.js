const express = require("express");
const admin = express.Router();
const users = require("../modal/user");
const blog = require("../modal/blog");
const slider = require("../modal/sliders");
const testimonial = require("../modal/testimonial");
const aboutus = require("../modal/about");
var bcrypt = require("bcrypt");
const multer  = require('multer');
const path = require("path");
const sliders = require("../modal/sliders");
const service = require("../modal/service");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploadimages')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '_' +path.extname(file.originalname); 
      cb(null, file.fieldname + '_' + uniqueSuffix)
    }
  })
  
  const upload = multer({ storage: storage }).single("filename");
admin.get("/", (req, res)=>{
    res.status(202).render("admin-login");
});
admin.get("/dashboard", (req, res)=>{
    res.status(202).render("dashboard");
});
admin.get("/edit", (req, res)=>{
    res.status(202).render("edit");
});
admin.post("/", async(req, res)=>{
    // res.status(202).redirect("/admin/dashboard");
    try{
        const loginemail = req.body.email;
            let loginUserDetails = await users.findOne({email:loginemail});
            if(!loginUserDetails){
                res.status(202).render("admin-login", {err: "Enter Input Fields Values"});
            }else{
                res.status(202).redirect("/admin/dashboard");
            }
        
    }catch(err){
        console.log(err);
        res.status(404).send("Not Submited Form !");
    }
});
admin.get("/blogform", (req, res)=>{
    res.status(202).render("blogform");
});

admin.post("/blogform", upload, async(req, res)=>{
    try{
        await blog({
            title:req.body.title,
            discription:req.body.discription,
            filename:req.file.filename
        }).save();
        res.status(201).redirect("/admin/dashboard");

    }catch(err){
        res.status(404).send(err);
    }
    
});

admin.get("/homeslider", (req, res)=>{
    res.status(202).render("homeslider");
})
admin.post("/homeslider",upload, async (req, res)=>{
    try{
        await sliders({
            title:req.body.title,
            discription:req.body.title,
            filename:req.file.filename
        }).save();
        res.status(201).redirect("/admin/dashboard");
    }catch(err){
        res.status.send(err);
    }
});
admin.get("/Testimonialsform", (req, res)=>{
    res.render("Testimonialsform");
});

admin.post("/Testimonialsform", upload, async(req, res)=>{
    try{
        await testimonial({
            review:req.body.review,
            name:req.body.name,
            authType:req.body.authType,
            filename:req.file.filename
        }).save();
        res.status(201).redirect("/admin/dashboard");    
    }catch(err){
        res.status(404).send(err);
    }
});

admin.get("/serviceform", (req,res)=>{
    res.render("serviceform");
});

admin.post("/serviceform", upload, async(req, res)=>{
    try{
        await service({
            title:req.body.title,
            discription:req.body.discription,
            filename:req.file.filename
        }).save();
        res.status(201).redirect("/admin/dashboard");    
    }catch(err){
        res.status(404).send(err);
    }
});
admin.get("/aboutform", (req,res)=>{
    res.render("aboutform");
});
admin.post("/aboutform", upload, async(req, res)=>{
    try{
        await aboutus({
            title:req.body.title,
            discription:req.body.discription,
            filename:req.file.filename
        }).save();
        res.status(201).redirect("/admin/dashboard");    
    }catch(err){
        res.status(404).send(err);
    }
});

// start edit blog
admin.get("/edit-blog", async(req, res)=>{
    const blogdata= await blog.find({})
    .sort({_id:-1});
    res.status(201).render("edit-blog",
    {
        blogdata:blogdata
    });
});

// start edit blog
admin.get("/blogeditble/:id?", async(req, res)=>{
    try{
        const blogdata= await blog.findById(req.params.id);
        if(blogdata==null){
            res.status(201).redirect("/admin/dashboard");
        }
        res.status(201).render("edit-blog-form",
            {
                blogdata:blogdata
            }
        );
    }catch(err){
        res.status(404).send(err);
    }
});
admin.post("/blogeditble/:id?", async(req, res)=>{
    // try{
        const abc =  await blog.findOneAndUpdate(req.params.id, (err, docs)=>{
            if(err){
                console.log(err)
            }else{
                console.log(docs);
            }
        });
        console.log(abc);
        res.status(201).redirect("/admin/dashboard");
    // }catch(err){
    //     res.status(404).send(err);
    // }
    
})
admin.get("/blogeditble/delete/:id?", async(req, res)=>{
    try{
        await blog.findByIdAndDelete(req.params.id);
        res.status(201).redirect("/admin/dashboard");
    }catch(err){
        res.status(404).send(err);
    }
})





module.exports = admin;