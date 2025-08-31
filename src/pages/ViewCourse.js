import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal"
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar"
import { getFullDetailsOfCourse } from "../services/operation/courseDetailsApi"
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/ViewCoursesSlices"

export default function ViewCourse() {
  const { courseId } = useParams()
  const { token } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [reviewModal, setReviewModal] = useState(false)

  useEffect(() => {
    ;(async () => {
      const courseData = await getFullDetailsOfCourse(courseId, token)
      // console.log("Course Data here... ", courseData.courseDetails)
      dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
      dispatch(setEntireCourseData(courseData.courseDetails))
      dispatch(setCompletedLectures(courseData.completedVideos))
      let lectures = 0
      courseData?.courseDetails?.courseContent?.forEach((sec) => {
        lectures += sec.subSection.length
      })
      dispatch(setTotalNoOfLectures(lectures))
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
     <div className="relative flex flex-col sm:flex-row min-h-[calc(100vh-3.5rem)]">
  {/* Sidebar */}
  <div className="w-full sm:w-[320px] max-w-full sm:max-w-[350px] border-r border-richblack-700 bg-richblack-800">
    <VideoDetailsSidebar setReviewModal={setReviewModal} />
  </div>

  {/* Main Content */}
  <div className="flex-1 h-full overflow-auto px-4 sm:px-6 md:px-8 py-4">
    <Outlet />
  </div>
</div>

{reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}

    </>
  )
}