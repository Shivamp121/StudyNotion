import React from "react";
import HighlightText from "./HighlightText";
import CtButton from "./button";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import TimelineImage from "../../../assets/Images/TimelineImage.png";

const TimeLineSection = [
  {
    Logo: Logo1,
    Heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    Logo: Logo2,
    Heading: "Responsibility",
    Description: "Students will always be our top priority",
  },
  {
    Logo: Logo3,
    Heading: "Flexibility",
    Description: "The ability to switch is an important skill",
  },
  {
    Logo: Logo4,
    Heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

const TimeLine = () => {
  return (
    <div className="flex items-center justify-center px-4">
      <div className="flex flex-col w-11/12 items-center justify-center">
        
        {/* Heading Section */}
        <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-8 mt-16 mb-10">
          <div className="text-2xl sm:text-3xl md:text-4xl font-semibold md:w-1/2 text-center md:text-left">
            Get the skills you need for a{" "}
            <HighlightText text={"job that is in demand"} />
          </div>
          <div className="flex flex-col md:w-1/2 items-center md:items-start gap-4">
            <p className="text-richblack-900 text-sm sm:text-base text-center md:text-left">
              The modern StudyNotion dictates its own terms. Today, to be a
              competitive specialist requires more than professional skills.
            </p>
            <CtButton active={true} linkto={"/signup"}>
              Learn More
            </CtButton>
          </div>
        </div>

        {/* Timeline + Image */}
        <div className="flex flex-col lg:flex-row mt-10 mb-12 gap-12 items-center justify-center">
          
          {/* Timeline List */}
          <div className="flex flex-col gap-8 w-full lg:w-auto">
            {TimeLineSection.map((ele, i) => (
              <div key={i} className="flex flex-col lg:gap-3">
                <div className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex justify-center items-center shadow-[0_0_40px_0_rgba(0,0,0,0.1)]">
                    <img src={ele.Logo} alt={ele.Heading} />
                  </div>
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      {ele.Heading}
                    </h2>
                    <p className="text-sm sm:text-base text-richblack-700">
                      {ele.Description}
                    </p>
                  </div>
                </div>
                {/* Connector line */}
                {i !== TimeLineSection.length - 1 && (
                  <div className="hidden lg:block h-12 border-dotted border-r border-richblack-100 ml-6"></div>
                )}
              </div>
            ))}
          </div>

          {/* Image + Stats */}
          <div className="relative flex flex-col items-center">
  {/* Timeline Image */}
  <img
    src={TimelineImage}
    alt="Timeline"
    className="w-full max-w-4xl object-cover rounded-lg shadow-lg"
  />

  {/* Floating Stats Box */}
  <div
    className="
      relative mt-6                /* default: sits below image */
      lg:absolute lg:-bottom-12    /* on large screens: overlap */
      bg-caribbeangreen-700
      w-[90%] sm:w-3/4 lg:w-2/3
      py-4 sm:py-6 px-4 sm:px-8
      flex flex-col sm:flex-row items-center justify-between
      text-center rounded-lg shadow-md gap-4 sm:gap-0
    "
  >
    {/* Years of Experience */}
    <div className="flex flex-col sm:flex-row items-center justify-center 
                    sm:gap-4 w-full sm:w-1/2 border-b sm:border-b-0 sm:border-r 
                    border-caribbeangreen-600 pb-3 sm:pb-0">
      <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">10</p>
      <div className="flex flex-col text-caribbeangreen-300 text-[10px] sm:text-xs lg:text-sm uppercase">
        <p>Years</p>
        <p>Experience</p>
      </div>
    </div>

    {/* Courses */}
    <div className="flex flex-col sm:flex-row items-center justify-center 
                    sm:gap-4 w-full sm:w-1/2 pt-3 sm:pt-0">
      <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-bold">250</p>
      <div className="flex flex-col text-caribbeangreen-300 text-[10px] sm:text-xs lg:text-sm uppercase">
        <p>Types of</p>
        <p>Courses</p>
      </div>
    </div>
  </div>
</div>

        </div>

      </div>
    </div>
  );
};

export default TimeLine;
