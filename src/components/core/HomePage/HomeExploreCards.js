import React from "react";

const HomeExploreCards = ({ element, currentCard, setCurrentCard }) => {
  return (
    <div
      onClick={() => setCurrentCard(element?.heading)}
      className={`p-5 sm:p-6 md:p-7 min-h-[250px] md:min-h-[290px] hover:cursor-pointer 
        w-full sm:w-[280px] md:w-[320px] lg:w-[360px] rounded-md transition-all duration-300
        ${
          currentCard === element?.heading
            ? "bg-white shadow-[8px_8px_0_0] sm:shadow-[12px_12px_0_0] shadow-yellow-50 text-richblack-800"
            : "bg-richblack-700 text-richblack-200 hover:bg-richblack-600"
        }`}
    >
      {/* Card Body */}
      <div className="flex flex-col gap-3 border-b-2 border-dashed border-richblack-500 pb-4">
        <div
          className={`text-lg sm:text-xl font-semibold ${
            element?.heading === currentCard
              ? "text-richblack-900"
              : "text-richblack-25"
          }`}
        >
          {element?.heading}
        </div>
        <div className="text-sm sm:text-md text-richblack-300">
          {element?.description}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-row justify-between items-center mt-4 text-xs sm:text-sm">
        <div>{element?.level}</div>
        <div>{element?.lessionNumber}</div>
      </div>
    </div>
  );
};

export default HomeExploreCards;
