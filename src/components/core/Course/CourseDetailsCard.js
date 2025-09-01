import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart,removeFromCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const {cart}=useSelector((state)=>state.cart)
   
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course
const isCourseInCart = cart?.some((item) => item._id === courseId)
  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }
  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(courseId))
    
  }

  // console.log("Student already enrolled ", course?.studentsEnroled, user?._id)

  return (
    <>
      <div
        className={`flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5`}
      >
        {/* Course Image */}
        {/* Course Image */}
<img
  src={ThumbnailImage}
  alt={course?.courseName}
  className="max-h-[300px] min-h-[180px] w-full overflow-hidden rounded-2xl object-cover"
/>

<div className="px-4">
  <div className="space-x-3 pb-4 text-3xl font-semibold">
    Rs. {CurrentPrice}
  </div>
  <div className="flex flex-col gap-4">
    {/* Buy Button */}
    <button
      className="yellowButton block w-full z-10"
      onClick={
        user && course?.studentsEnrolled.includes(user?._id)
          ? () => navigate("/dashboard/enrolled-courses")
          : handleBuyCourse
      }
    >
      {user && course?.studentsEnrolled.includes(user?._id)
        ? "Go To Course"
        : "Buy Now"}
    </button>

    {/* Cart Buttons */}
    {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
      isCourseInCart ? (
        <button
          onClick={() => {
            console.log("Remove clicked"); // debug
            handleRemoveFromCart();
          }}
          className="blackButton block w-full z-10"
        >
          Remove from Cart
        </button>
      ) : (
        <button
          onClick={() => {
            console.log("Add clicked"); // debug
            handleAddToCart();
          }}
          className="blackButton block w-full z-10"
        >
          Add to Cart
        </button>
      )
    )}
  </div>
</div>

      </div>
    </>
  )
}

export default CourseDetailsCard