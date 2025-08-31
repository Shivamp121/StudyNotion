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
exports.changePassword=async(req,res)=>{

    try{

        //fetch old password,new password,confirm new password,
        const{oldPassword,newPassword,confirmNewPassword}=req.body;

        //validate the data
        if(!oldPassword||!newPassword||!confirmNewPassword){
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }

         if(oldPassword===newPassword){
            return res.status(403).json({
                success:false,
                message:"New Password cant be the same as old password",
            })
        }

        if(confirmNewPassword!==newPassword){
            return res.status(403).json({
                success:false,
                message:"New password and Confirm new password do not match",
            })
        }
        //match old password and password stored in db
        const user=await User.findOne({email});
        if(!user){
            return res.status(403).json({
                success:false,
                message:"User is not registered",
            })
        }
        
        //if matched then update the entry in db
        if(await bcrypt.compare(oldPassword,User.password)){
            const updatedPassword=User.findByIdAndUpdate()
        }
        //send mail that password has been updates successfully
        //return response

    }catch(error){

    }

}