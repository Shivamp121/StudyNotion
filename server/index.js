const express=require("express");
const app=express();
const userRoute=require("./route/userRoute");
const profileRoute=require("./route/profileRoute");
const paymentRoute=require("./route/paymentsRoute");
const contactRoute=require("./route/Contact");
const courseRoute=require("./route/courseRoute");
const database=require("./config/database");
const cookieParser=require("cookie-parser");
const cors = require("cors");
const{cloudinaryConnect}=require("./config/cloudinary");
const fileUpload=require("express-fileupload");

require("dotenv").config();
const PORT=process.env.PORT ||4000;

app.use(express.json());
app.use(cookieParser());


app.use(cors({
  origin: "http://localhost:3000", // match exactly with your React app
  credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(
   fileUpload({
      useTempFiles:true,
      tempFileDir:"/tmp",
   })
);
cloudinaryConnect();
app.use("/api/v1/auth",userRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/payment",paymentRoute);
app.use("/api/v1/profile",profileRoute);
app.use("/api/v1/reach",contactRoute );

app.get("/",(req,res)=>{
   return res.json({
      success:true,
      message:"your server is up and running"
   });
});


app.listen(PORT,()=>{
   console.log(`App is running at port no.${PORT}`);
})
database.connect();
