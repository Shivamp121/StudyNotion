
const jwt=require("jsonwebtoken");
require("dotenv").config;
const User=require("../models/user");
//auth

exports.auth=async(req,res,next)=>{
    try{
console.log("Token received:", req?.cookies?.token, req?.body?.token, req?.header("Authorization"));

        const token=req?.cookies?.token||
                    req?.body?.token||
                    req?.header("Authorization").replace("Bearer ", "");
                    console.log("token is 1",token)
            if(!token){
                return res.status(500).json({
                    success:false,
                    message:"Token is missing"
                })
            }
            try{

                const decode= jwt.verify(token,process.env.JWT_SECRET);
                
                req.user=decode;

            }catch(error){

                 return res.status(401).json({
                    success:false,
                    message:"token is invalid"
                })

            }
            next();

    }catch(error){
console.log("eror is ",error);
         return res.status(401).json({
                    success:false,
                    message:"Something went wrong in validating the token"
                })

    }
}

//isStudent
exports.isStudent=async(req,res,next)=>{
    try{

        if(req.user.accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for students"
            })
        }
       next();
    }catch(error){

         return res.status(500).json({
                    success:false,
                    message:"User role can not be verified"
                })

    }
}
//isInstructor
exports.isInstructor=async(req,res,next)=>{
    try{

        if(req.user.accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Instructor"
            })
        }
       next();
    }catch(error){

         return res.status(500).json({
                    success:false,
                    message:"User role can not be verified"
                })

    }
}
//isAdmin
exports.isAdmin=async(req,res,next)=>{
    try{

        if(req.user.accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"This is protected route for Admin"
            })
        }
       next();
    }catch(error){

         return res.status(500).json({
                    success:false,
                    message:"User role can not be verified"
                })

    }
}