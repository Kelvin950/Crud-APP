const User =  require("../model/User");
const crypto  = require("crypto");
const {errorHandler} = require("../../util/errorHandler");
const bcrypt =  require("bcryptjs");
const nodemailer =  require("nodemailer");
const jwt =  require("jsonwebtoken");
const sengridTransport =  require("nodemailer-sendgrid-transport");
const Token =  require("../model/token");
require("dotenv").config();

const {validationResult}  =  require("express-validator");

const transporter = nodemailer.createTransport(sengridTransport({
    auth:{
        api_key:process.env.api_key
    }
}));

const checkErrors =  function(req , res, next , errorMessage , errorStatusCode ){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       errorHandler(req , res, next , errorMessage , errorStatusCode , errors.array());
    }
}
exports.signUp= async (req ,res, next)=>{

try{
    checkErrors(req,res,next , "Validation failed" , 422);
   
    
     const name =  req.body.name ;
     const email =  req.body.email;
     const password =  req.body.password;

const hashedpassword =  await bcrypt.hash(password , 12);
    console.log(hashedpassword);
    const user =  new User({
        name:name,
        email :email,
        password:hashedpassword
    })
 const newUser =await user.save();
 console.log(newUser);
const info = await transporter.sendMail({
    to:email,
    from:process.env.myemail,
    subject:"Verify your email",
    html:"<h1>Verify email</h1>"
});
 res.status(200).json({

    message:"User created" , 
    user:newUser
 });

    }catch(err){
        if(!err.statusCode){
            err.statusCode =500;
        }
            next(err);
}
};


exports.login = async (req,res,next)=>{

   try{
    checkErrors(req,res,next , "Validation failed" , 422);
    const email =  req.body.email;
    const password  = req.body.password;

const user =  await User.findOne({email:email});
if(!user){

    errorHandler(req , res, next , "User does not exist" , 401);
} 
     const isEqual =  await bcrypt.compare(password , user.password);
    if(!isEqual){
        errorHandler(req , res,next , "password  do not match" , 401);
    }
    console.log(req.useragent);
    console.log(req.ip);
    const logInInfo  = await transporter.sendMail({
        to:email,
        from:process.env.myemail,
        subject:"You just logged in",
        html:`<h1>You just logged in </h1><p>IpAddress:${req.ip}</p><p>Browser:${req.useragent.browser}</p>
        <a href="http://localhost:8080/page/page1?q=2">Link</a>`
    })
    const token =  jwt.sign({email:user.email , id:user._id.toString()} , process.env.secret , {expiresIn:"1h"});
   res.status(200).json({
       message:"Logged in",
       token:token
   }) 
   }
   catch(err){
               if(!err.statusCode){
                   err.statusCode  =500;
               }
               next(err);
   }
   
};

exports.requestPasswordReset =  async(req,res,next)=>{

try{


    const email =  req.body.email;

    const user = await User.findOne({email:email});

    if(!user){
        errorHandler(req ,res,next , "No user with email found" , 404);
    }

     let token =  await Token.findOne({user:user._id});
     if(token){
         
        await token.deleteOne();
     }
    
    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken , 12);

    await new Token({

        user:user._id,
        token:hash,
        createdAt:Date.now()
    }).save();

    await transporter.sendMail({
        to:email,
        from:process.env.myemail,
        subject:"Password reset",
        html:`<p>Password reset click     <a href="http://localhost:8080?resetToken=${resetToken}&id=${user._id}">Link</a></p>`,
    });

    res.status(200).json({
        message:"Email sent successfully"
    });

}catch(err){


    if(!err.statusCode){
        err.statusCode =  500;

    }
     next(err);
}
}


exports.resetPassword = async (req,res,next)=>{

    try{
    const {resetToken , id}=  req.body;
    const password=  req.body.password;
    const passwordToken = await Token.findOne({user:id});
    if(!passwordToken){
        errorHandler(res,req,next , "Invalid token or token has expired", 404);
    }
    console.log(passwordToken);
    const  isValid = await bcrypt.compare(resetToken , passwordToken.token);
    if(!isValid){
        errorHandler(res,req,next , "Invalid token or token has expired", 404);
    }  
  
   

    const hashedPassword =  await bcrypt.hash(password , 12);
  await User.updateOne({_id :id} , {$set:{password:hashedPassword}} , {new:true});

 const user=  await User.findById(id);

 await transporter.sendMail({
    to:user.email,
    from:process.env.myemail,
    subject:"Password reset successfully",
    html:`<p>Password reset click successfully</p>`,
 });

 await passwordToken.deleteOne();

 res.status(200).json({message:"Password reset successfully"})

    }catch(err){
        if(!err.statusCode){
            err.statusCode =  500;
        }
        next(err);
    }
}