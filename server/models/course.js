const mongoose=require("mongoose");

const course=new mongoose.Schema({
  
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    courseName:{
        type:String,
    },
    courseDescription:{
        type:String,
    },
    courseContent: [
        { type: mongoose.Schema.Types.ObjectId, ref: "Section" }
    ],
   
    whatYouWillLearn:{
        type:String,
    },
    
    ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReviews",
    }],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    },
    tag:[{
        type:[String],
        required:true,
    }],
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }],
    instruction:{
        type:[String],
    },
    status:{
      type:String,
      enum:["Draft","Published"]
    }

});

module.exports = mongoose.model("Course",course);