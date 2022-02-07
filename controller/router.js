const express = require("express");
const router = express.Router();
const users = require("../modal/user");
var bcrypt = require("bcrypt");
const blog = require("../modal/blog");
const slider = require("../modal/sliders");
const testimonials = require("../modal/testimonial");
const services = require("../modal/service");
router.get("/", async(req, res)=>{
    const blogdata = await blog.find({})
    .limit(4).sort({ _id: -1});
    const sliderData = await slider.find({})
    .limit(2).sort({ _id: -1});
    const testiData = await testimonials.find({})
    .sort({ _id: -1});
    const serviceiData = await services.find({})
    .limit(5);
    res.status(202).render("index", 
        {
            blogdatas:blogdata,
            sliderData:sliderData,
            testiData:testiData,
            serviceiData:serviceiData
        }
    );
});

router.get("/signup", (req, res)=>{
    res.status(202).render("signup");
});

router.post("/signup", async (req, res)=>{
    const {email, FullName, MobileNumber, password, confirmPassword} = req.body;
    if(!email || !FullName || !MobileNumber || !password || !confirmPassword){
        res.status(202).render("signup", { 
            err: "All Field Required"    
        });
    }
    else if(password != confirmPassword){
        res.status(202).render("signup", { 
            err: "password not Match"    
        });
    }
    else{
       var oneUser = await users.findOne({email:email});
       if(oneUser){
        res.status(202).render("signup", { 
            err: "User Exists , Try Signup !"    
        });
       }else{
           var salt = await bcrypt.genSalt(12);
           var hash = await bcrypt.hash(password, salt);
           await users({
               email:email,
               FullName:FullName,
               MobileNumber:MobileNumber,
               password:hash
           }).save();
           res.status(202).redirect("/");
       }
    }
});

router.get("/login", (req, res)=>{
    res.status(202).render("login");
});
router.post("/login", async(req, res)=>{
    try{
        const loginemail = req.body.email;
            let loginUserDetails = await users.findOne({email:loginemail});
            console.log(loginemail);
            if(!loginUserDetails){
                res.status(202).render("login", {err: "Enter input Validate Information"});
            }else{
                res.status(202).redirect("/");
            }
        
    }catch(err){
        console.log(err);
    }
});



module.exports= router;