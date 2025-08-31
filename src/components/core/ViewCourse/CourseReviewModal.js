import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operation/courseDetailsApi"
import IconBtn from "../../common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ratingChanged = (newRating) => {
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm p-4">
      <div className="w-full max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800 shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-4 sm:p-5">
          <p className="text-lg sm:text-xl font-semibold text-richblack-5">
            Add Review
          </p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-xl sm:text-2xl text-richblack-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6">
          {/* User Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 sm:gap-x-4 text-center sm:text-left">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-12 sm:w-[50px] rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs sm:text-sm text-richblack-5">
                Posting Publicly
              </p>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center gap-4"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />

            <div className="flex w-full flex-col space-y-2">
              <label
                className="text-sm text-richblack-5"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style min-h-[100px] sm:min-h-[130px] w-full resize-none rounded-md p-3"
              />
              {errors.courseExperience && (
                <span className="ml-1 text-xs tracking-wide text-pink-200">
                  Please Add Your Experience
                </span>
              )}
            </div>

            <div className="mt-4 sm:mt-6 flex w-full justify-end gap-x-2">
              <button
                type="button"
                onClick={() => setReviewModal(false)}
                className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-2 px-4 font-semibold text-richblack-900 text-sm sm:text-base"
              >
                Cancel
              </button>
              <IconBtn text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
