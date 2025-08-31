import React from "react";
import HighlightText from "./HighlightText";
import Ctbutton from "../../../components/core/HomePage/button";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguage = () => {
  return (
    <div className="mt-20 sm:mt-[130px] px-4">
      <div className="flex flex-col items-center gap-6">
        
        {/* Heading */}
        <div className="text-center text-2xl sm:text-3xl md:text-4xl font-semibold">
          <p>
            Your swiss Knife for{" "}
            <HighlightText text={"learning any language"} />
          </p>
        </div>

        {/* Subheading */}
        <div className="font-medium text-richblack-600 text-sm sm:text-base text-center w-full sm:w-4/5 md:w-3/4 lg:w-2/3">
          <p>
            Using spin makes learning multiple languages easy. With 20+ languages, 
            realistic voice-over, progress tracking, custom schedules, and more.
          </p>
        </div>

        {/* Images */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mt-6">
          <img
            src={Know_your_progress}
            alt="Know your progress"
            className="object-contain w-60 sm:w-64 md:w-72"
          />
          <img
            src={Compare_with_others}
            alt="Compare with others"
            className="object-contain w-60 sm:w-64 md:w-72"
          />
          <img
            src={Plan_your_lessons}
            alt="Plan your lessons"
            className="object-contain w-60 sm:w-64 md:w-72"
          />
        </div>

        {/* Button */}
        <div className="font-semibold mb-16 sm:mb-24 mt-6">
          <Ctbutton active={true} linkto={"/signup"}>
            Learn More
          </Ctbutton>
        </div>
      </div>
    </div>
  );
};

export default LearningLanguage;
