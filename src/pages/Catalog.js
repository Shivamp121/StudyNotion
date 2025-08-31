import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnecter';
import { categories } from '../services/api';
import { getCatalogaPageData } from '../services/operation/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {

  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // Fetch all categories
  useEffect(()=> {
    const getCategories = async() => {
      const res = await apiConnector("GET", categories.CATEGORIES_API);
      const category_id = res?.data?.allTags
        .filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]?._id;
      setCategoryId(category_id);
    }
    getCategories();
  },[catalogName]);

  useEffect(() => {
    const getCategoryDetails = async() => {
      try {
        const res = await getCatalogaPageData(categoryId);
        setCatalogPageData(res);
      }
      catch(error) {
        console.log(error)
      }
    }
    if(categoryId) {
      getCategoryDetails();
    }
  },[categoryId]);


  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }
  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <>
      {/*  Hero Section */}
      <div className="box-content bg-richblack-800 px-4 sm:px-6 md:px-10">
        <div className="mx-auto flex min-h-[220px] sm:min-h-[260px] max-w-maxContentTab flex-col justify-center gap-3 sm:gap-4 lg:max-w-maxContent">
          <p className="text-xs sm:text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-sm sm:text-base text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 sm:px-6 md:px-10 py-8 sm:py-12 lg:max-w-maxContent">
        <div className="section_heading text-lg sm:text-xl lg:text-2xl">Courses to get you started</div>
        <div className="my-4 flex flex-wrap gap-4 border-b border-b-richblack-600 text-xs sm:text-sm">
          <p
            className={`px-3 sm:px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-3 sm:px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/*  Section 2 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 sm:px-6 md:px-10 py-8 sm:py-12 lg:max-w-maxContent">
        <div className="section_heading text-lg sm:text-xl lg:text-2xl">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-6 sm:py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 sm:px-6 md:px-10 py-8 sm:py-12 lg:max-w-maxContent">
        <div className="section_heading text-lg sm:text-xl lg:text-2xl">Frequently Bought</div>
        <div className="py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[380px] sm:h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Catalog
