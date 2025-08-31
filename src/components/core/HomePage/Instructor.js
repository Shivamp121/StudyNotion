import React from "react";
import HighlightText from "./HighlightText";
import instructorimg from "../../../assets/Images/Instructor.png";
import Ctbutton from "./button";
import { FaArrowRight } from "react-icons/fa";

const Instructor = () => {
  return (
    <div className="mt-16 flex justify-center px-4">
      <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-12 max-w-6xl w-full">
        
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={instructorimg}
            alt="Instructor"
            className="w-10/12 max-w-sm md:max-w-full h-auto shadow-[-12px_-12px_rgba(255,255,255)] md:shadow-[-20px_-20px_rgba(255,255,255)]"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start gap-6 md:gap-10 text-center md:text-left">
          <div className="font-semibold text-2xl sm:text-3xl md:text-4xl leading-snug">
            Become an <HighlightText text={"instructor"} />
          </div>
          <div className="text-sm sm:text-base text-richblack-300 max-w-md">
            Instructors from around the world teach millions of students on StudyNotion. 
            We provide the tools and skills to teach what you love.
          </div>
          <div className="w-fit">
            <Ctbutton active={true} linkto={"/signup"}>
              <div className="flex flex-row items-center gap-2 justify-center">
                Start Teaching Today
                <FaArrowRight />
              </div>
            </Ctbutton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Instructor;
