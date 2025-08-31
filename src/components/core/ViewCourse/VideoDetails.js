import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams, useLocation } from "react-router-dom"

import "video-react/dist/video-react.css"
import { BigPlayButton, Player } from "video-react"

import { markLectureAsComplete } from "../../../services/operation/courseDetailsApi"
import { updateCompletedLectures } from "../../../slices/ViewCoursesSlices"
import IconBtn from "../../common/IconBtn"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const playerRef = useRef(null)
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState([])
  const [previewSource, setPreviewSource] = useState("")
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`)
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        const filteredVideoData = filteredData?.[0]?.subSection.filter(
          (data) => data._id === subSectionId
        )
        setVideoData(filteredVideoData[0])
        setPreviewSource(courseEntireData.thumbnail)
        setVideoEnded(false)
      }
    })()
  }, [courseSectionData, courseEntireData, location.pathname])

  // === Helpers ===
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    return currentSectionIndx === 0 && currentSubSectionIndx === 0
  }

  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    return (
      currentSectionIndx === courseSectionData.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    )
  }

  const goToNextVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubsections =
      courseSectionData[currentSectionIndx].subSection.length
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx + 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      const nextSectionId = courseSectionData[currentSectionIndx + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndx + 1].subSection[0]._id
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndx = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndx = courseSectionData[
      currentSectionIndx
    ].subSection.findIndex((data) => data._id === subSectionId)

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData[currentSectionIndx].subSection[
          currentSubSectionIndx - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndx - 1].subSection.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndx - 1].subSection[
          prevSubSectionLength - 1
        ]._id
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-5 text-white px-4 sm:px-6 md:px-8">
  {/* Video / Thumbnail */}
  <div className="w-full max-w-full aspect-video relative rounded-md overflow-hidden">
    {!videoData ? (
      <img
        src={previewSource}
        alt="Preview"
        className="h-full w-full object-cover"
      />
    ) : (
      <Player
        ref={playerRef}
        aspectRatio="16:9"
        playsInline
        onEnded={() => setVideoEnded(true)}
        src={videoData?.videoUrl}
        className="w-full h-full"
      >
        <BigPlayButton position="center" />
        {videoEnded && (
          <div className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-t from-black/90 via-black/70 to-transparent text-center px-4">
            {!completedLectures.includes(subSectionId) && (
              <IconBtn
                disabled={loading}
                onclick={handleLectureCompletion}
                text={!loading ? "Mark As Completed" : "Loading..."}
                customClasses="text-base sm:text-lg md:text-xl max-w-max px-4 py-2"
              />
            )}
            <IconBtn
              disabled={loading}
              onclick={() => {
                if (playerRef?.current) {
                  playerRef.current.seek(0)
                  setVideoEnded(false)
                }
              }}
              text="Rewatch"
              customClasses="text-base sm:text-lg md:text-xl max-w-max px-4 py-2 mt-3"
            />
            <div className="mt-8 flex flex-wrap justify-center gap-4 text-base sm:text-lg md:text-xl">
              {!isFirstVideo() && (
                <button
                  disabled={loading}
                  onClick={goToPrevVideo}
                  className="blackButton px-4 py-2"
                >
                  Prev
                </button>
              )}
              {!isLastVideo() && (
                <button
                  disabled={loading}
                  onClick={goToNextVideo}
                  className="blackButton px-4 py-2"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </Player>
    )}
  </div>

  {/* Video Details */}
  <div className="mt-4">
    <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold">
      {videoData?.title}
    </h1>
    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-richblack-200 pb-6">
      {videoData?.description}
    </p>
  </div>
</div>

  )
}

export default VideoDetails
