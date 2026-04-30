"use client";
import React, { useState } from 'react'; 
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react'; 

export default function ChangePasswordInput() {
    const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({ password: '', confirmPassword: '' });
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const inputStyle = `w-full py-3 px-4 rounded-lg bg-[#f4f4f4] outline-none
    border-2 border-[#d3d3d3] focus:border-[#0089ff] transition-all
    autofill:shadow-[inset_0_0_0px_1000px_#f4f4f4] 
    autofill:text-slate-950`;

    const validate = () => {
        let isError = false;
        const newErrors = { password: '', confirmPassword: '' };

        if (!formData.password) {
            newErrors.password = "Password is required";
            isError = true;
        } else if (formData.password.length < 8) {
            newErrors.password = "Must be at least 8 characters";
            isError = true;
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Confirm password is required";
            isError = true;
        } else if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
            isError = true;
        }

        setErrors(newErrors);
        return !isError;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("Password changed successfully", formData);
        }
    };

    return (
        <div className="flex flex-col w-full mt-4">
            <motion.form 
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col text-left w-full gap-6">
                
                {/* New Password Field */}
                <div className="flex flex-col gap-2">
                    <label className='text-slate-950 text-lg font-bold' htmlFor="new-password">
                        Enter new password
                    </label>
                    <div className="relative flex items-center">
                        <input 
                            type={showPass ? "text" : "password"} 
                            name="password" 
                            id="new-password"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            placeholder='Enter Your New password'
                            className={`${inputStyle} ${errors.password ? 'border-red-500' : ''}`} 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowPass(!showPass)}
                            className="absolute right-4 text-slate-400 hover:text-[#0089ff] transition-colors"
                        >
                            {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.password && <span className="text-red-500 text-xs font-medium">{errors.password}</span>}
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-2">
                    <label className='text-slate-950 text-lg font-bold' htmlFor="confirm-password">
                        Confirm Password
                    </label>
                    <div className="relative flex items-center">
                        <input 
                            type={showConfirm ? "text" : "password"} 
                            name="confirmPassword" 
                            id="confirm-password"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            placeholder='Enter Your New password'
                            className={`${inputStyle} ${errors.confirmPassword ? 'border-red-500' : ''}`} 
                        />
                        <button 
                            type="button"
                            onClick={() => setShowConfirm(!showConfirm)}
                            className="absolute right-4 text-slate-400 hover:text-[#0089ff] transition-colors"
                        >
                            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className="text-red-500 text-xs font-medium">{errors.confirmPassword}</span>}
                </div>

                {/* Finish Button */}
                <Button type="submit" className={`w-full py-7 mt-12 text-xl font-bold bg-[#0089ff] 
                    hover:bg-[#0076db] rounded-2xl shadow-lg shadow-blue-100 cursor-pointer transition-all active:scale-[0.98]`}>
                    Finish
                </Button>

            </motion.form>
        </div>
    );
}