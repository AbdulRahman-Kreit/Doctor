"use client";
import React, { useState } from 'react'; 
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

export default function ForgetPasswordInputs() {
    const [formData, setFormData] = useState({ email: '', otp: '' });
    const [errors, setErrors] = useState({ email: '', otp: '' });

    const inputStyle = `w-full py-3 px-4 rounded-lg bg-[#f4f4f4] outline-none
    border-2 border-[#d3d3d3] focus:border-[#0089ff] transition-all
    autofill:shadow-[inset_0_0_0px_1000px_#f4f4f4] 
    autofill:text-slate-950`; 

    const validate = () => {
        let isError = false;
        const newErrors = { email: '', otp: '' };

        if (!formData.email) {
            newErrors.email = "Email is required";
            isError = true;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
            isError = true;
        }

        if (!formData.otp) {
            newErrors.otp = "OTP is required";
            isError = true;
        } else if (formData.otp.length < 4) {
            newErrors.otp = "Invalid OTP";
            isError = true;
        }

        setErrors(newErrors);
        return !isError;
    };

    const handleSendCode = () => {
        if (!formData.email) {
            setErrors(prev => ({ ...prev, email: "Enter email first" }));
            return;
        }
        console.log("Sending code to:", formData.email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("Verifying OTP", formData);
        }
    };

    return (
        <div className="flex flex-col w-full mt-8">
            <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col text-left w-full gap-6">
                
                {/* Email Field with Internal Send Button */}
                <div className="flex flex-col gap-2">
                    <label className='text-slate-950 text-lg font-bold' htmlFor="email-id">
                        Email
                    </label>
                    <div className="relative flex items-center">
                        <input 
                            type="email" 
                            name="email" 
                            id="email-id"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder='Enter Your Email'
                            className={`${inputStyle} pr-24 ${errors.email ? 'border-red-500' : ''}`} 
                        />
                        <button 
                            type="button"
                            onClick={handleSendCode}
                            className={`absolute h-full right-0 px-5 py-2 
                            bg-[#0089ff] text-white rounded-lg font-bold text-sm 
                            hover:bg-[#0076db] transition-colors cursor-pointer`}
                        >
                            Send
                        </button>
                    </div>
                    {errors.email ? (
                        <span className="text-red-500 text-xs font-medium">{errors.email}</span>
                    ) : (
                        <p className="text-slate-400 text-[11px]">we will send you a vrefication code on your email</p>
                    )}
                </div>

                {/* OTP Field */}
                <div className="flex flex-col gap-2">
                    <label className='text-slate-950 text-lg font-bold' htmlFor="otp-id">
                        OTP
                    </label>
                    <input 
                        type="text" 
                        name="otp" 
                        id="otp-id"
                        value={formData.otp}
                        onChange={(e) => setFormData({...formData, otp: e.target.value})}
                        placeholder='Enter Your OTP'
                        className={`${inputStyle} ${errors.otp ? 'border-red-500' : ''}`} 
                    />
                    {errors.otp && <span className="text-red-500 text-xs font-medium pb-0 mb-0">{errors.otp}</span>}
                </div>

                {/* Next Button */}
                <Button type="submit" className={`w-full py-7 mt-8 text-xl font-bold bg-[#0089ff] 
                    hover:bg-[#0076db] rounded-2xl shadow-lg shadow-blue-100 cursor-pointer`}>
                    Next
                </Button>

                {/* Resend Message */}
                <p className="text-center text-slate-400 text-sm mt-4 font-medium">
                    Didn&apos;t recive the message 
                    <Button className="text-[#0089ff] bg-transparent cursor-pointer font-bold hover:underline">
                        Resend
                    </Button>
                </p>
            </motion.form>
        </div>
    );
}