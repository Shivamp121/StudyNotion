const RatingAndReview= require("../models/ratingAndReviews");
const Course=require("../models/course");
const User=require("../models/user");
const course = require("../models/course");
const ratingAndReviews = require("../models/ratingAndReviews");
const { default: mongoose } = require("mongoose");
exports.createRating=async(req ,res)=>{
    try{

        const userId=req.user.id;
        const{rating,review,courseId}=req.body;
        const courseDetails= await Course.findOne({_id:courseId,studentsEnrolled:{$elemMatch:{$eq:userId}}});
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student is not enrolled in this course",
            })
        }
        const alreadyReviewed=await RatingAndReview.findOne({
            user:userId,
            course:courseId,
        });
        if(alreadyReviewed){
            return res.status(404).json({
                success:false,
                message:"Student is already reviewed this course",
            }) 
        }
        const ratingReview=await RatingAndReview.create({
            rating,
            review,
            course:courseId,
            user:userId
        });
        await Course.findByIdAndUpdate(courseId,
            {
                $push:{
                    ratingAndReviews:ratingReview,
                }
            },
            {new:true},
        )
        return res.status(200).json({
            success:true,
            message:"Rating and review created successfully",
            ratingReview
        })


    }catch(error){
     console.log(error);
      return res.status(500).json({
                success:false,
                message:"Rating and review can not be created",
            }) 
    }
}

exports.getAverageRating=async(req ,res)=>{
    try{

        const courseId=req.body.courseId;
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                }
            }
        ])
    
        if(result.length>0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,
            })
        }
        return res.status(200).json({
            success:true,
            message:"No rating is given to this course till now",
            averageRating:0,
        })
        
    }catch(error){
     console.log(error);
      return res.status(500).json({
                success:false,
                message:error.message,
            }) 
    }
}

exports.getAllRating=async(req ,res)=>{
    try{

        const allReviews=await RatingAndReview.find({})
                                               .sort({rating:"desc"})
                                               .populate({
                                                path:"user",
                                                select:"firstName lastName email image",

                                               })
                                               .populate({
                                                path:"course",
                                                select:"courseName",
                                               })
                                               .exec();
                                               return res.status(200).json({
                                                success:true,
                                                message:"All reviews fetched successfully",
                                                data:allReviews,
                                               })

    }catch(error){
      console.log(error);
      return res.status(500).json({
                success:false,
                message:error.message,
            }) 
    }
}