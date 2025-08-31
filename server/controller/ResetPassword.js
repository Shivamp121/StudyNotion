const User=require("../models/user");
const mailSender=require("../Utils/mailSender");
const bcrypt=require("bcrypt");
const crypto = require("crypto");
exports.resetPasswordToken=async(req,res)=>{
    try{
//fetch data from request body
        const email=req.body.email;
//validate the data
        const user=await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:"Your email is not registered"
            })
        }
//generate Token    
        const token=crypto.randomUUID();
//update user data in db
        
       const updatedDetails= await User.findOneAndUpdate(
                                                  {email:email},
                                                  {
                                                    token:token,
                                                    resetPasswordExpires:Date.now()+5*60*1000,
                                                  },
                                                  {new:true});
//create url
      const url =  `http://localhost:3000/update-password/${token}`;
       //send mail containing the url
       await mailSender(email,"password reset link",`password reset link:${url}`);
       //return response
       return res.json({ 
        success:true,
        message:"Email sent successfully,please check email and reset password"
       })
                                                  

    }catch(error){
  
        console.log(error);
        return res.status(500).json({
          success:false,
          message:"Error while reset password "
        })
        
    }
}
exports.resetPassword=async(req,res)=>{
    try{
//fetch data
const{password,confirmPassword,token}=req.body;
//validation
if(password!==confirmPassword){
    return res.json({
        success:false,
        message:"Password do not match",
    })
}

//get user details from db using token
const userDetails=await User.findOne({token:token});
//if no entry-invalid token
if(!userDetails){
    return res.json({
        success:false,
        message:"Token is invalid",
    })
}
//token time check
if (new Date(userDetails.resetPasswordExpires).getTime() < Date.now()){
    return res.json({
        success:false,
        message:"Token is expired,Please regenerate your token again"
    })
}
//hash pwd
const hashedPassword=await bcrypt.hash(password,10);
//password update
await User.findOneAndUpdate(
    {token:token},
    {password:hashedPassword},
    {new:true},
);
return res.status(200).json({
    success:true,
    message:"Password reset successfully",
    email:userDetails.email
})
//return response
    }catch(error){
        console.log(error)
            return res.status(500).json({
                success:false,
                message:"Something went wrong while updating password"
            })
        
    }
}