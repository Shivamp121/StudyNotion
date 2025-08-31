import React from 'react'
import { Link } from 'react-router-dom'
const button = ({children,active,linkto}) => {
  return (
    <div>
        <Link to={linkto}>
        <div className={`text-center text-[13px] px-5 py-3 rounded-md  ${active ? "bg-yellow-50 text-black":"bg-richblack-800  text-white text-xs"} shadow-richblack-200 shadow-sm hover:scale-95 transition-all duration-200`}>
        {children}
        </div>
    </Link>
    </div>
  )
}

export default button
