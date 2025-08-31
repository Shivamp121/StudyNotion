const nodemailer=require("nodemailer");
require("dotenv").config();
const mailSender=async(email,title ,body )=>{
    try{
      let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});
      let info=await transporter.sendMail({
        from:'Study Notion || Edtech By Shivam',
        to:`${email}`,
        subject:`${title}`,
        html:`${body}`,
      })
      console.log(info);
      return info;
    }
    catch(error){
   console.error("Mail sending failed:", error);
  throw error;
    }
}
module.exports=mailSender;