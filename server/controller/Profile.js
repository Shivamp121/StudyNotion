const Profile=require("../models/profile");
const User=require("../models/user");
const CourseProgress=require("../models/courseProgress");
const {uploadImageToCloudinary}=require("../Utils/imageUploader")
const Course =require("../models/course")
require("dotenv").config();
const { convertSecondsToDuration } = require("../Utils/secToDuration")
exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    const id = req.user.id;

    if (!contactNumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Fetch user and profile
    const userDetails = await User.findById(id).populate("additionalDetails");
    const profileDetails = userDetails.additionalDetails;

    // Update profile fields
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;
    await profileDetails.save();

    // Fetch updated user with populated profile
    const updatedUser = await User.findById(id).populate("additionalDetails");

    return res.status(200).json({
      success: true,
      message: "Profile Updated Successfully",
      updatedUserDetails: updatedUser, // ✅ This matches frontend expectations
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error while updating profile",
      error: error.message,
    });
  }
};


exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id
console.log("id:", id, "type:", typeof id, "length:", id?.length);    const user = await User.findById(id)
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }
    // Delete Assosiated Profile with the User
    await Profile.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(user.additionalDetails),
    })
    for (const courseId of user.courses) {
      await Course.findByIdAndUpdate(
        courseId,
        { $pull: { studentsEnroled: id } },
        { new: true }
      )
    }
    // Now Delete User
    await User.findByIdAndDelete(id)
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    })
    await CourseProgress.deleteMany({ userId: id })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" })
  }
}
exports.getAllUserDetails=async(req ,res)=>{
    try{
    const id=req.user.id;
    const userDetails=await User.findById(id).populate("additionalDetails").exec();
      return res.status(200).json({
        success:true,
        message:"All details fetched successfully",
        
     })
    
    }catch(error){
       return res.status(500).json({
        success:false,
        message:"User can not be deleted",
        error:error.message
     })
    }
}
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
      .populate({
        path: "courses",
        populate: {
        path: "courseContent",
        populate: {
          path: "subSection",
        },
        },
      })
      .exec()

      userDetails = userDetails.toObject()
	  var SubsectionLength = 0
	  for (var i = 0; i < userDetails.courses.length; i++) {
		let totalDurationInSeconds = 0
		SubsectionLength = 0
		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		  totalDurationInSeconds += userDetails.courses[i].courseContent[
			j
		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
			totalDurationInSeconds
		  )
		  SubsectionLength +=
			userDetails.courses[i].courseContent[j].subSection.length
		}
		let courseProgressCount = await CourseProgress.findOne({
		  courseID: userDetails.courses[i]._id,
		  userId: userId,
		})
		courseProgressCount = courseProgressCount?.completedVideos.length
		if (SubsectionLength === 0) {
		  userDetails.courses[i].progressPercentage = 100
		} else {
		  // To make it up to 2 decimal point
		  const multiplier = Math.pow(10, 2)
		  userDetails.courses[i].progressPercentage =
			Math.round(
			  (courseProgressCount / SubsectionLength) * 100 * multiplier
			) / multiplier
		}
	  }

      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });
    console.log("Printing courseDetails", courseDetails);

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled?.length || 0;
      const totalAmountGenerated = totalStudentsEnrolled * (course.price || 0);

      return {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
        price: course.price,        
        thumbnail: course.thumbnail,
        instructor: course.instructor,
      };
    });

    return res.status(200).json({ courses: courseData });

  }
	catch(error) {
    console.log("Instructor ID:", req.user?.id);
		console.error(error);
		res.status(500).json({message:"Internal Server Error",
      error:error});
	}
}