//otp send

const User=require("../models/user");

const OTP=require("../models/otp");

require("dotenv").config();

const bcrypt=require("bcrypt");

const jwt=require("jsonwebtoken");

const otpGenerator=require("otp-generator");

const profile=require("../models/profile");

exports.sendOtp = async(req,res)=>{
try{

    const{email}=req.body;
 
    const checkUserPresent=await User.findOne({email});

    if(checkUserPresent){
        return res.status(401).json({
        success:false,
        message:"User already exist"
    })
   }

   var otp=otpGenerator.generate(6,{
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false
   });
   console.log("otp-generated",otp);

   let result=await OTP.findOne({otp:otp});

   while(result){
    otp=otpGenerator.generate(6,{
    upperCaseAlphabets:false,
    lowerCaseAlphabets:false,
    specialChars:false
   });

   result=await OTP.findOne({otp:otp});
   }
   const otpPayload={email,otp};
   const otpBody=await OTP.create(otpPayload);
   console.log(otpBody);
   return res.status(200).json({
    success:true,
    message:"OTP send successfully",
    otp:otp
   });

}catch(error){
console.log(error);
return res.status(500).json({
    success:false,
    message:error.message,
})
}
}


//signup

exports.signup=async(req,res)=>{
   try{

     const{
     firstName,
     lastName,
     email,
     password,
     confirmPassword,
     accountType,
     contactNumber,
     otp  
    }=req.body;
    if(!firstName||!lastName||!email||!password||!confirmPassword||!otp){
        return res.status(403).json({
            success:false,
            message:"All fields are required"
        });
    }
    if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Password and Confirm Password do not match, Fill carefully"
        });
    }

    const userCheck=await User.findOne({email});
    if(userCheck){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        });
    }

    const recentOtp=await OTP.findOne({email}).sort({createdAt:-1}).limit(1);
    console.log(recentOtp);
    if(otp!==recentOtp.otp){
         return res.status(400).json({
            success:false,
            message:"Invalid Otp"
        });
    }
    else if(recentOtp.length == 0){
         return res.status(400).json({
            success:false,
            message:"Otp Not Found"
        });
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const profileDetails=await profile.create({
        gender:null,
        dateOfBirth:null,
        contactNumber:null,
        about:null
    })
 
    const user = await User.create({
        firstName,
        lastName,
        email,
        contactNumber,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails.id,
        image:`https://ui-avatars.com/api/?name=${firstName} ${lastName}`

    })

     return res.status(200).json({
            success:true,
            message:"User Registered Successfully",
            user,
        });

   }catch(error){
 
    console.log(error)

    return res.status(500).json({
            success:false,
            message:"User cannot create. Please try again later",
            
        });

   }

}








//login
exports.login=async (req,res)=>{
   try{

     //fetch email and password from req body

    const{email,password}=req.body;

    //validata the data

    if(!email||!password){
        return res.status(403).json({
            success:false,
            message:"All fields are required"
        })
    }

    //check user exists

    const user=await User.findOne({email});

    if(!user){
         return res.status(401).json({
            success:false,
            message:"User does not exist"
        })
    }

    //create jwt after password matching
  
    if(await bcrypt.compare(password,user.password)){
        const payload={
            email:user.email,
            id:user._id,
            accountType:user.accountType,
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h",
        });
        user.token=token;
        user.password=undefined;

        const options={
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
        }

        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            user,
            message:"User Logged in Successfully",
        })

    }

    else{
        return res.status(401).json({
            success:false,
            message:"Password do not match",
        })
    }

    //create cookie and send in response

   }catch(error){
    console.log(error);
    return res.status(500).json({
        success:false,
        message:"Login failure,Please try again later"
    })

   }

}
//change password
const bcrypt = require("bcrypt");
const User = require("../models/User"); // adjust path to your User model

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Validate fields
    if (!oldPassword || !newPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (oldPassword === newPassword) {
      return res.status(403).json({
        success: false,
        message: "New password cannot be the same as old password",
      });
    }

    // Find user (assuming you’re using auth middleware to set req.user.id)
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Check old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password
    user.password = hashedPassword;
    await user.save();

    // (Optional) send email notification here

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("CHANGE PASSWORD ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Password could not be changed",
    });
  }
};
