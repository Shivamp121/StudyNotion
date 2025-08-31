import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editCourseDetails } from "../../../../../services/operation/courseDetailsApi"
import { resetCourseState, setStep } from "../../../../../slices/courseSlice"
import { COURSE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { course } = useSelector((state) => state.course)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (course?.status === COURSE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [course, setValue])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToCourses = () => {
    dispatch(resetCourseState())
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    const isAlreadySet =
      (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)

    if (isAlreadySet) {
      goToCourses()
      return
    }

    const formData = new FormData()
    formData.append("courseId", course._id)
    formData.append(
      "status",
      getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
    )

    setLoading(true)
    const result = await editCourseDetails(formData, token)
    setLoading(false)

    if (result) goToCourses()
  }

  const onSubmit = (data) => {
    handleCoursePublish()
  }

  return (
    <div className="w-full max-w-3xl mx-auto rounded-md border border-richblack-700 bg-richblack-800 p-6 sm:p-8">
      <p className="text-2xl font-semibold text-richblack-5 mb-6">
        Publish Settings
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
        {/* Checkbox */}
        <label htmlFor="public" className="inline-flex items-center gap-2 text-richblack-400">
          <input
            type="checkbox"
            id="public"
            {...register("public")}
            className="h-4 w-4 rounded border-gray-300 bg-richblack-500 text-yellow-50 focus:ring-2 focus:ring-yellow-50"
          />
          <span>Make this course public</span>
        </label>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={goBack}
            disabled={loading}
            className="flex items-center justify-center gap-x-2 rounded-md bg-richblack-300 py-2 px-6 text-richblack-900 font-semibold hover:bg-richblack-400 transition-all"
          >
            Back
          </button>

          <IconBtn
            type="submit"
            text="Save Changes"
            disabled={loading}
            className="w-full sm:w-auto"
          />
        </div>
      </form>
    </div>
  )
}
