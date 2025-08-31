const Course=  require("../models/course");
const Section=  require("../models/section");

exports.createSection=async(req ,res )=>{
    try{
     const{sectionName,courseId}=req.body;
      if(!sectionName||!courseId){
        return res.status(400).json({
            success:false,
            message:"All fields are required",
        })
      }
      const newSection = await Section.create({sectionName});
      const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,
                                  {$push: { courseContent: newSection._id }},
                                  { new: true })
                                  .populate({
                                  path: "courseContent",
                                  populate: {
                                    path: "subSection",
                                  }})
                                  .exec()
   return res.status(200).json({
    success:true,
    message:"Section created successfully",
    data:updatedCourseDetails
   })
    }catch(error){
     return res.status(500).json({
        success:false,
        message:"Unable to create section",
        error:error.message
     })
    }
}
exports.updateSection=async(req ,res )=>{
    try{
    const{sectionName,sectionId}=req.body;
    if(!sectionName||!sectionId){
        return res.status(400).json({
            success:false,
            message:"All fields are required",
        })
      }
      const section=await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
      return res.status(200).json({
        success:true,
        message:"Section updated successfully",
      })

    }catch(error){
     return res.status(500).json({
        success:false,
        message:"Unable to update section",
        error:error.message
     })
    }
}
exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body; 
    await Section.findByIdAndDelete(sectionId);
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: updatedCourse, // <-- send updated course
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section",
      error: error.message,
    });
  }
};

