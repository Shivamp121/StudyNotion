import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../services/operation/authApi';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { IoEyeOffSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { IoIosArrowRoundBack } from "react-icons/io";

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const location = useLocation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }
 const navigate=useNavigate();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const token = location.pathname.split('/').at(-1);
    dispatch(resetPassword(password, confirmPassword, token,navigate));
  }

  return (
    <div className="text-white flex justify-center items-center min-h-screen px-4">
      {loading ? (
        <div className="spinner"></div>
      ) : (
        <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl flex flex-col items-center justify-center">
          
          {/* Heading */}
          <h1 className="w-full text-center text-2xl sm:text-3xl md:text-4xl font-semibold leading-snug">
            Choose new Password
          </h1>
          
          {/* Subheading */}
          <p className="w-full text-center text-sm sm:text-base md:text-lg text-richblack-300 mt-2">
            Almost done. Enter your new password and you are all set.
          </p>
          
          {/* Form */}
          <form 
            onSubmit={handleOnSubmit}
            className="flex flex-col w-full gap-6 mt-6"
          >
            {/* New Password */}
            <label className="flex flex-col relative gap-1">
              <p className="text-xs sm:text-sm text-richblack-25">
                New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter new password"
                className="w-full text-white pl-2 outline-none bg-richblack-600 rounded-md h-10 sm:h-12 placeholder:px-2 sm:placeholder:px-4 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none"
              />
              <span 
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-9 sm:top-10 cursor-pointer"
              >
                {showPassword ? <IoEyeOffSharp fontSize={20} /> : <FaEye fontSize={20} />}
              </span>
            </label>

            {/* Confirm Password */}
            <label className="flex flex-col relative gap-1">
              <p className="text-xs sm:text-sm text-richblack-25">
                Confirm New Password <sup className="text-pink-200">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm password"
                className="w-full text-white pl-2 outline-none bg-richblack-600 rounded-md h-10 sm:h-12 placeholder:px-2 sm:placeholder:px-4 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none"
              />
              <span 
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-9 sm:top-10 cursor-pointer"
              >
                {showConfirmPassword ? <IoEyeOffSharp fontSize={20} /> : <FaEye fontSize={20} />}
              </span>
            </label>

            {/* Submit */}
            <button 
              type="submit"
              className="w-full bg-yellow-50 rounded-md h-10 sm:h-12 text-black text-sm sm:text-base font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none"
            >
              Reset Password
            </button>
          </form>

          {/* Back to login */}
          <div className="flex items-center w-full justify-center sm:justify-start gap-2 mt-4">
            <Link to="/login" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
              <IoIosArrowRoundBack size={20} />
              <p>Back to Login</p>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default UpdatePassword
