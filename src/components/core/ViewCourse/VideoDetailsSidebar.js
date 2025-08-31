import { useEffect, useState } from "react"
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../../common/IconBtn"

export default function VideoDetailsSidebar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  useEffect(() => {
    ;(() => {
      if (!courseSectionData.length) return
      const currentSectionIndx = courseSectionData.findIndex(
        (data) => data._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSection.findIndex((data) => data._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSection?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <>
     <div className="flex h-[calc(100vh-3.5rem)] w-full sm:w-[320px] max-w-full sm:max-w-[350px] flex-col border-r border-richblack-700 bg-richblack-800">
  {/* Header */}
  <div className="px-4 sm:px-5 flex flex-col gap-2 border-b border-richblack-600 py-4 sm:py-5 text-base sm:text-lg font-bold text-richblack-25">
    <div className="flex items-center justify-between">
      <button
        onClick={() => navigate(`/dashboard/enrolled-courses`)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-richblack-100 text-richblack-700 hover:scale-90"
        title="Back"
      >
        <IoIosArrowBack size={24} />
      </button>
      <IconBtn
        text="Add Review"
        customClasses="ml-auto text-sm sm:text-base"
        onclick={() => setReviewModal(true)}
      />
    </div>
    <div className="flex flex-col">
      <p className="truncate">{courseEntireData?.courseName}</p>
      <p className="text-xs sm:text-sm font-semibold text-richblack-500">
        {completedLectures?.length} / {totalNoOfLectures}
      </p>
    </div>
  </div>

  {/* Sections */}
  <div className="flex-1 overflow-y-auto">
    {courseSectionData.map((course, index) => (
      <div
        key={index}
        className="mt-2 cursor-pointer text-sm text-richblack-5"
        onClick={() => setActiveStatus(course?._id)}
      >
        {/* Section Header */}
        <div className="flex justify-between items-center bg-richblack-600 px-4 sm:px-5 py-3 sm:py-4">
          <div className="w-[70%] font-semibold truncate">
            {course?.sectionName}
          </div>
          <span
            className={`${
              activeStatus === course?._id ? "rotate-0" : "rotate-180"
            } transition-transform duration-300`}
          >
            <BsChevronDown />
          </span>
        </div>

        {/* Subsections */}
        {activeStatus === course?._id && (
          <div className="transition-all duration-300 ease-in-out">
            {course.subSection.map((topic, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2 text-sm sm:text-base ${
                  videoBarActive === topic._id
                    ? "bg-yellow-200 font-semibold text-richblack-800"
                    : "hover:bg-richblack-900"
                }`}
                onClick={() => {
                  navigate(
                    `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
                  )
                  setVideoBarActive(topic._id)
                }}
              >
                <input
                  type="checkbox"
                  checked={completedLectures.includes(topic?._id)}
                  onChange={() => {}}
                  className="accent-yellow-200"
                />
                <span className="truncate">{topic.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
</div>

    </>
  )
}