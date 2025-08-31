import React from "react"
import { Link } from "react-router-dom"
import { FaArrowRight } from "react-icons/fa"

// components
import CtButton from "../components/core/HomePage/button"
import HighlightText from "../components/core/HomePage/HighlightText"
import CodeBlocks from "../components/core/HomePage/codeBlock"
import LearningLanguage from "../components/core/HomePage/LearningLanguage"
import TimeLine from "../components/core/HomePage/TimeLine"
import Instructor from "../components/core/HomePage/Instructor"
import ExploreMore from "../components/core/HomePage/ExploreMore"
import ReviewSlider from "../components/common/ReviewSlider"
import Footer from "../components/common/Footer"

// assets
import banner from "../assets/Images/banner.mp4"

const Home = () => {
  return (
    <div>
      {/* ========== Section 1: Hero ========== */}
      <section className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        
        {/* Become Instructor CTA */}
        <Link to="/signup">
          <div className="mt-16 flex w-60 justify-center rounded-full bg-richblack-800 shadow-sm shadow-richblack-400 transition duration-300 hover:scale-95">
            <div className="mb-2 mt-2 flex flex-row items-center gap-2">
              <p className="text-richblack-200">Become an Instructor</p>
              <FaArrowRight className="text-richblack-100" />
            </div>
          </div>
        </Link>

        {/* Hero Heading */}
        <h1 className="text-center text-4xl font-semibold">
          Empower Your Future with <HighlightText text="Coding Skills" />
        </h1>

        {/* Hero Subheading */}
        <p className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With your online coding resources, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
        </p>

        {/* Hero Buttons */}
        <div className="mt-8 flex flex-row items-center gap-10">
          <CtButton active linkto="/signup">Learn More</CtButton>
          <CtButton active={false} linkto="/login">Book a Demo</CtButton>
        </div>

        {/* Banner Video */}
        
        <div className="mx-3 my-10 shadow-[10px_-5px_50px_-5px] shadow-blue-200">
          <video
            className="h-auto shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
          >
            <source src={banner} type="video/mp4" />
          </video>
        </div>

        {/* CodeBlocks Section 1 */}
        <CodeBlocks
          position="lg:flex-row"
          heading={
            <h2 className="text-4xl font-semibold">
              Unlock your <HighlightText text="coding potential" /> with our online courses.
            </h2>
          }
          subheading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          ctabtn1={{ btnText: "Try it Yourself", link: "/signup", active: true }}
          ctabtn2={{ btnText: "Learn More", link: "/signup", active: false }}
          codeColor="text-yellow-25"
          codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
          backgroundGradient={<div className="codeblock1 absolute" />}
        />

        {/* CodeBlocks Section 2 */}
        <CodeBlocks
          position="lg:flex-row-reverse"
          heading={
            <h2 className="text-4xl font-semibold">
              Start your <HighlightText text="learning journey" /> today.
            </h2>
          }
          subheading="Build a solid foundation in programming and grow step by step with practical coding exercises, real-world projects, and instructor feedback."
          ctabtn1={{ btnText: "Try it Yourself", link: "/signup", active: true }}
          ctabtn2={{ btnText: "Learn More", link: "/signup", active: false }}
          codeColor="text-yellow-25"
          codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>Learning Page</title>\n</head>\n<body>\n<h1>Welcome to StudyNotion</h1>\n<section>\n<p>Learn. Build. Succeed.</p>\n</section>\n</body>`}
          backgroundGradient={<div className="codeblock1 absolute" />}
        />
      </section>

      {/* ========== Section 2: Explore / Timeline / Languages ========== */}
      <section>
        <ExploreMore />
        <div className="bg-pure-greys-5">
          <TimeLine />
          <LearningLanguage />
        </div>
      </section>

      {/* ========== Section 3: Instructor + Reviews ========== */}
      <section className="mb-8 mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
        <Instructor />
        <h2 className="mt-14 text-center text-4xl font-semibold">
          Reviews from other Learners
        </h2>
        <ReviewSlider />
      </section>

      {/* ========== Footer ========== */}
      <Footer />
    </div>
  )
}

export default Home

