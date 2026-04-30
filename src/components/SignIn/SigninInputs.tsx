"use client";
import React, { useState } from 'react'; 
import { Button } from '../ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function SigninInputs() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const inputStyle = `w-full py-2.5 px-4 my-5 rounded-lg bg-[#f4f4f4] outline-none
    border-2 border-[#d3d3d3] focus:border-[#0089ff] focus:text-[#0089ff]
    autofill:shadow-[inset_0_0_0px_1000px_#f4f4f4] 
    autofill:text-slate-950
    autofill:border-[#d3d3d3]`; 

    const buttonStyle = `rounded-full w-12 h-12 p-0 bg-white border-2 border-[#f4f4f4] 
    flex items-center justify-center cursor-pointer shadow-sm`;

    const validate = () => {
        let isError = false;
        const newErrors = { email: '', password: '' };

        if (!formData.email) {
            newErrors.email = "Email is required";
            isError = true;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
            isError = true;
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
            isError = true;
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
            isError = true;
        }

        setErrors(newErrors);
        return !isError;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form submitted successfully", formData);
        }
    };

    return (
        <main className={`flex flex-col items-start w-full pt-10 pb-20 px-10`}>
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='text-left w-full'>
                <h3 className="text-slate-950 text-2xl font-bold">
                    Sign In
                </h3>
                <p className="text-slate-600 text-md font-medium">
                    Korem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
            </motion.div>
            <div className="flex flex-col w-full mt-10">
                <motion.form 
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col text-left w-full">
                    
                    <div>
                        <label className='text-slate-950 text-xl font-bold' htmlFor="email-id">
                            Email
                        </label>
                        <input 
                            type="text" 
                            name="email" 
                            id="email-id"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            placeholder='Enter Your Email'
                            className={`${inputStyle} ${errors.email ? 'border-red-500' : ''}`} />
                        {errors.email && <span className="text-red-500 text-sm mt-[-15px] block">{errors.email}</span>}
                    </div>

                    <div>
                        <label className='text-slate-950 text-xl font-bold' htmlFor="password-id">
                            Password
                        </label>
                        <div className="relative w-full">
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
                                className="absolute right-4 top-11 -translate-y-1/2 text-[#0089ff] flex items-center justify-center hover:text-[#005bb5] transition-colors"
                            >
                                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                            </button>
                        </div>
                        {errors.password && <span className="text-red-500 text-sm mt-1 block">{errors.password}</span>}
                        
                        <Link 
                            className='text-right mt-2 block w-full hover:text-[#0089ff] duration-200 text-sm font-semibold' 
                            href="/forget-password">
                            Forget password
                        </Link>
                    </div>

                    <Button type="submit" className={`py-6 mt-16 text-xl font-bold bg-linear-to-r 
                        from-[#00aeff] to-[#0460ea] cursor-pointer`}>
                        Sign In
                    </Button>
                    
                </motion.form>
                
                <p className='text-slate-600 my-5 text-center w-full font-bold text-sm'>OR</p>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className='flex flex-row items-center justify-center gap-4'>
                    <Button type="button" className={`${buttonStyle}`}>
                        <img src="/assets/google-logo-png-suite-everything-you-need-know-about-google-newest-0 2.svg" alt="Google Logo" className="w-6 h-6" />
                    </Button>
                    <Button type="button" className={`${buttonStyle}`}>
                        <img src="/assets/Facebook-logo-blue-circle-large-transparent-png 2.svg" alt="Facebook Logo" className="w-6 h-6" />
                    </Button>
                </motion.div>
            </div>
        </main>
    )
}