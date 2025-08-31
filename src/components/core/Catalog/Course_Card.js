import React, { useEffect, useState } from 'react'
import RatingStars from '../../common/RatingStars'
import GetAvgRating from '../../../utils/avgRating'
import { Link } from 'react-router-dom'

const Course_Card = ({ course }) => {
  const [avgReviewCount, setAvgReviewCount] = useState(0)

  useEffect(() => {
    const count = GetAvgRating(course?.ratingAndReviews)
    setAvgReviewCount(count)
  }, [course])

  return (
    <Link to={`/courses/${course._id}`} className="block">
      <div className="rounded-lg overflow-hidden bg-richblack-800 hover:shadow-lg transition-all duration-300 flex flex-col">
        
        {/* ✅ Thumbnail */}
        <div className="w-full aspect-video overflow-hidden">
          <img
            src={course?.thumbnail || "/fallback-image.jpg"}
            alt={course?.courseName || "Course thumbnail"}
            className="w-full h-full object-cover"
          />
        </div>

        {/* ✅ Content */}
        <div className="flex flex-col gap-1 sm:gap-2 px-2 sm:px-3 py-3 flex-1">
          {/* Title */}
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-richblack-5 line-clamp-2">
            {course?.courseName}
          </p>

          {/* Instructor */}
          <p className="text-xs sm:text-sm text-richblack-50">
            {course?.instructor?.firstName} {course?.instructor?.lastName}
          </p>

          {/* Ratings */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
            <span className="text-yellow-5 font-medium">{avgReviewCount || 0}</span>
            <RatingStars Review_Count={avgReviewCount} />
            <span className="text-richblack-400">
              {course?.ratingAndReviews?.length || 0} Ratings
            </span>
          </div>

          {/* Price */}
          <p className="text-sm sm:text-base lg:text-lg font-semibold text-richblack-5">
            Rs. {course?.price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Course_Card
