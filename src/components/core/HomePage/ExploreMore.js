import React, { useState } from "react";
import HighlightText from "./HighlightText";
import HomeExploreCards from "../HomePage/HomeExploreCards";
import { HomePageExplore } from "../../../data/homepage-explore";
import CtButton from "../HomePage/button";

const tabs = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center text-center px-4">
        {/* Headings */}
        <div className=" text-white text-xl sm:text-3xl font-semibold">
          Unlock the <HighlightText text={"Power of Code"} />
        </div>
        <div className="text-base sm:text-lg text-richblack-300 mt-2">
          Learn to Build Anything You Can Imagine
        </div>

        {/* Tabs */}
        <div className=" mb-20 w-full overflow-x-auto">
          <div className="flex gap-3 sm:gap-5 mx-auto w-max bg-richblack-800 text-richblack-200 p-1 rounded-full font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]">
            {tabs.map((ele, index) => (
              <div
                key={index}
                onClick={() => setMyCards(ele)}
                className={`relative whitespace-nowrap text-sm sm:text-[16px] px-4 sm:px-7 py-[6px] rounded-full transition-all duration-200 cursor-pointer ${
                  currentTab === ele
                    ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-richblack-200 hover:bg-richblack-900 hover:text-richblack-5"
                }`}
              >
                {ele}
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="relative z-40 w-full flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-6 mt-6 lg:-mt-10">
          {courses.map((element, index) => (
            <HomeExploreCards
              key={index}
              element={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative z-20 bg-white bg_homeimage h-auto sm:h-[280px] w-full flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mt-12 sm:mt-16 py-8">
          <CtButton active={true} linkto={"/signup"}>
            Explore Full Catalog
          </CtButton>
          <CtButton active={false} linkto={"/signup"}>
            Learn More
          </CtButton>
        </div>
      </div>
    </div>
  );
};

export default ExploreMore;
