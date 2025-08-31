import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operation/authApi';
import { IoIosArrowRoundBack } from "react-icons/io";


const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
       
        dispatch(getPasswordResetToken(email,setEmailSent));
  
    };

    return (
        <div className="text-white flex justify-center  items-center">
            {loading ? (
                <div className='spinner'></div>
            ) : (
                <div className="w-[508px] h-[448px]  flex  flex-col gap-2  items-center justify-center">
                    <h1 className="font-semibold text-left w-[80%]  text-xl">
                        {!emailSent ? "Reset Your Password" : "Check Your Email"}
                    </h1>
 
                    <p className="w-[80%] text-left leading-[26px] text-richblack-200 text-[15px]">
                        {!emailSent
                            ? `Have no fear, we'll email your instructions to reset your password.
                        If you don't have access to your email, we can try account recovery.`
                            : `We have sent the reset email to ${email}`}
                    </p>

                    <form onSubmit={handleOnSubmit} 
                    className="w-[80%] flex flex-col gap-7 mt-5">
                        {!emailSent && (
                            <label className="flex flex-col gap-1">
                                <p className="text-[12px] ">Email Address<sup className="text-pink-300">*</sup></p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your Email Address"
                                    className="text-white rounded-md bg-richblack-800 outline-none   h-8 placeholder:px-4 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none"
                                />
                            </label>
                        )}
                        <button type="submit "
                        className="w-full bg-yellow-50 rounded-md h-8 text-black text-sm font-medium drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-none ">
                            {!emailSent ? "Reset Password" : "Resend Email"}
                        </button>
                    </form>
                    
                    <div className="flex items-center w-[80%] justify-start gap-2 mt-2">
           <Link to="/login" className="flex items-center gap-2">
        <IoIosArrowRoundBack size={20} />
         <p className="text-[10px]">Back to Login</p>
        </Link>
                 </div>

                </div>
            )}
        </div>
    );
};

export default ForgotPassword;