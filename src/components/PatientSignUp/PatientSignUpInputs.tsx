"use client";
import React, { useState } from 'react';
import ImageUploadInput from './ImageUploadInput';
import GenderSelector from './GenderSelector';
import AgeSelector from './AgeSelector';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';

export default function PatientSignUpInputs() {
    const [formData, setFormData] = useState({
        name: '',
        gender: null as 'M' | 'F' | null,
        age: 18,
        email: '',
        password: '',
        confirmPassword: '',
        number: '',
        otp: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);

    const inputStyle = `w-full py-3 px-4 rounded-xl bg-[#f4f4f4] outline-none
    border-2 border-[#d3d3d3] focus:border-[#0089ff] transition-all
    autofill:shadow-[inset_0_0_0px_1000px_#f4f4f4] autofill:text-slate-950`;

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.gender) newErrors.gender = "Select gender";
        if (!formData.email) newErrors.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
        if (formData.password.length < 8) newErrors.password = "Min 8 characters";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords match error";
        if (!formData.number) newErrors.number = "Number is required";
        if (!formData.otp) newErrors.otp = "OTP is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            console.log("Form Submitted Successfully", formData);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-[450px] mx-auto pt-4 pb-20 px-8 gap-8">
            <ImageUploadInput />

            <div className="w-full flex flex-col gap-2">
                <label className="font-bold text-lg text-slate-900 ml-1">Name</label>
                <input 
                    type="text" 
                    placeholder="Enter Your Name"
                    className={`${inputStyle} ${errors.name ? 'border-red-500' : ''}`}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <GenderSelector 
                selected={formData.gender} 
                onChange={(val) => {
                    setFormData({...formData, gender: val});
                    setErrors({...errors, gender: ''});
                }} 
            />
            {errors.gender && <span className="text-red-500 text-xs text-center">{errors.gender}</span>}

            <AgeSelector 
                selectedAge={formData.age} 
                onChange={(val) => setFormData({...formData, age: val})} 
            />

            <div className="w-full flex flex-col gap-2">
                <label className="font-bold text-lg text-slate-900 ml-1">Email</label>
                <input 
                    type="email" 
                    placeholder="Enter Your Email"
                    className={`${inputStyle} ${errors.email ? 'border-red-500' : ''}`}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>

            <div className="w-full flex flex-col gap-5">
                {/* Password Field */}
                <div className="relative w-full">
                    <label className="font-bold text-lg text-slate-900 ml-1">Password</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="password" 
                        id="password-id"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                        placeholder='Enter Your Password'
                        className={`${inputStyle} mb-0 pr-12 ${errors.password ? 'border-red-500' : ''}`} 
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-13 -translate-y-1/2 text-[#0089ff] flex items-center justify-center hover:text-[#005bb5] transition-colors"
                    >
                        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                </div>

                {/* Confirm Password Field */}
                <div className="relative w-full">
                    <label className="font-bold text-lg text-slate-900 ml-1">Confirm Password</label>
                    <input 
                        type={showPassword ? "text" : "password"} 
                        name="confirm-password" 
                        id="confirm-password-id"
                        value={formData.confirmPassword}
                        placeholder="Confirm Your Password" 
                        className={`${inputStyle} pr-12`} 
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-13 -translate-y-1/2 text-[#0089ff] flex items-center justify-center hover:text-[#005bb5] transition-colors"
                    >
                        {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                    </button>
                </div>
            </div>

            <div className="w-full flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-lg text-slate-900 ml-1">Number</label>
                    <div className="relative flex items-center">
                        <input type="text" placeholder="Enter Your Number" className={`${inputStyle} pr-24`} 
                            onChange={(e) => setFormData({...formData, number: e.target.value})}/>
                        <button type="button" className="absolute right-0 h-full px-6 bg-[#0089ff] text-white font-bold rounded-lg cursor-pointer hover:bg-[#007ae6]">Send</button>
                    </div>
                    <p className="text-slate-400 text-xs ml-1 mt-1">we will send you an OTP on your number</p>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="font-bold text-lg text-slate-900 ml-1">OTP</label>
                    <input type="text" placeholder="Enter Your OTP" className={inputStyle} 
                        onChange={(e) => setFormData({...formData, otp: e.target.value})}/>
                </div>
            </div>

            <Button type="submit" className="w-1/2 py-8 text-xl font-bold bg-[#0089ff] rounded-[50px] mt-4 shadow-xl shadow-blue-200 cursor-pointer">
                Sign Up
            </Button>
            
            <p className="text-slate-400 text-sm">
                Didn&apos;t receive the message <span className="text-[#0089ff] font-bold cursor-pointer hover:underline">Resend</span>
            </p>
        </form>
    );
}