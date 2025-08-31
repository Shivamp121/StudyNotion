import React from 'react'
import { FreeMode, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import Course_Card from './Course_Card'

const CourseSlider = ({ Courses }) => {
  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={15}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            480: {
              slidesPerView: 1.2, // small mobiles
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2, // tablets
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3, // laptops
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 4, // desktops
              spaceBetween: 30,
            },
          }}
          className="max-h-[32rem] px-2 sm:px-0"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[220px] sm:h-[240px] lg:h-[260px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-lg sm:text-xl text-richblack-5">No Course Found</p>
      )}
    </>
  )
}

export default CourseSlider
