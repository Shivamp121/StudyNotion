import React from "react";
import CTAButton from "./button";
import { TypeAnimation } from "react-type-animation";
import { FaArrowRight } from "react-icons/fa";

const CodeBlocks = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroundGradient,
  codeColor,
}) => {
  return (
    <div
      className={`flex ${position} my-10 lg:my-20 flex-col lg:flex-row justify-between items-center gap-10 lg:gap-14`}
    >
      {/* Section 1 */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6 text-center lg:text-left">
        {heading}

        {/* Sub Heading */}
        <div className="text-richblack-300 text-sm sm:text-base font-bold w-[90%] mx-auto lg:mx-0 -mt-2">
          {subheading}
        </div>

        {/* Button Group */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-5">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.link}>
            <div className="flex items-center gap-2">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.link}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className="relative w-full lg:w-[470px] h-fit code-border flex flex-row py-3 text-xs sm:text-sm leading-5 sm:leading-6 overflow-x-auto">
        {backgroundGradient}

        {/* Indexing */}
        <div className="text-center flex flex-col w-[8%] sm:w-[10%] select-none text-richblack-400 font-inter font-bold text-[10px] sm:text-sm">
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Codes */}
        <div
          className={`w-[92%] sm:w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}
        >
          <TypeAnimation
            sequence={[codeblock, 1000, ""]}
            cursor={true}
            repeat={Infinity}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
            omitDeletionAnimation={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
