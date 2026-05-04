"use client";
import React, { useState } from 'react'; 
import { Button } from '../ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; 
import { login } from '@/lib/apiCall'; 
import { useRouter } from 'next/navigation'; 

export default function SigninInputs() {
    const router = useRouter();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false); 

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setLoading(true); 
            try {
                const response = await login(formData.email, formData.password);
                
                const token = response.data?.access_token;
                const userData = response.data?.user;

                if (token) {
                    localStorage.setItem("userToken", token);
                    
                    if (userData) {
                        localStorage.setItem("userData", JSON.stringify(userData));
                    }
                    
                    alert("Logged In Successfully!");
                    router.push('/home');
                } else {
                    throw new Error("Token not found in response.data");
                }
            } catch (error: any) {
                alert(error.message || "Invalid credentials");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <main className={`flex flex-col items-start w-full pt-10 pb-20 px-10`}>
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='text-left w-full'>
                <h3 className="text-slate-950 text-2xl font-bold">Sign In</h3>
                <p className="text-slate-600 text-md font-medium">
                    Welcome back! Please enter your details.
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
                        <label className='text-slate-950 text-xl font-bold' htmlFor="email-id">Email</label>
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
                        <label className='text-slate-950 text-xl font-bold' htmlFor="password-id">Password</label>
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

                    <Button 
                        type="submit" 
                        disabled={loading} 
                        className={`py-6 mt-16 text-xl font-bold bg-linear-to-r 
                        from-[#00aeff] to-[#0460ea] cursor-pointer flex items-center justify-center gap-2`}>
                        {loading && <Loader2 className="animate-spin" size={20} />}
                        {loading ? "Signing In..." : "Sign In"}
                    </Button>
                </motion.form>
                
            </div>
        </main>
    );
}