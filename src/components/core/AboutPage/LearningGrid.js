
import React from 'react'
import { Link } from 'react-router-dom';
import HighlightText from '../HomePage/HighlightText';
const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, Anywhere",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading: "Curriculum Based on Industry Needs",
    description:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
  },
  {
    order: 2,
    heading: "Our Learning Methods",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 4,
    heading: `Rating "Auto-grading"`,
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Studynotion partners with more than 275+ leading universities and companies to bring",
  },
];
const LearningGrid = () => {
  return (
    
      <div className="grid mx-auto grid-cols-1 lg:grid-cols-4 mb-4 p-5 lg:w-fit">
      {
        LearningGridArray.map((element ,index)=>{
            return(
                <div className={`${index === 0 ? "lg:col-span-2 lg:h-[280px] p-5" : ""}
           ${
            element.order % 2 === 1 ? "bg-richblack-700 lg:h-[280px] p-5" : "bg-richblack-800 lg:h-[280px] p-5"
          } 
          ${element.order === 3 ? "lg:col-start-2" : ""}
           ${ element.order<0 ?"bg-transparent":""}
          `
          } key={index}>
                 {
                    element.order===-1 ?(<div className="lg:w-[90%] flex flex-col pb-5 gap-3">
                        <h1 className="text-4xl font-semibold">{element.heading}<span><HighlightText text={element.highlightText} /></span></h1>

                        <p className='text-richblack-5 font-medium'>{element.description}</p>
                        <Link to={element.BtnLink}>
                        <button className='px-4 py-3 bg-yellow-100 text-[12px] rounded-md text-black '>{element.BtnText}</button>
                        </Link>
                    </div>):(<div className="flex flex-col gap-8 p-7">
                        
                            <h3 className="text-richblack-5 text-lg">{element.heading}</h3>
                        <p className="text-richblack-300 font-medium">{element.description}</p>
                        
                    </div>)
                 }
                </div>
            )
        })
      }
      </div>
    
  )
}

export default LearningGrid
