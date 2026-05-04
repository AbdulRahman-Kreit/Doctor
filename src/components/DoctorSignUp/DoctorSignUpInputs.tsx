"use client";
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploadInput from './ImageUploadInput';
import GenderSelector from './GenderSelector';
import AgeSelector from './AgeSelector';
import AvailabilityDetails from './AvailabilityDetails';
import FileUpload from './FileUpload';
import { Button } from '../ui/button';
import { Eye, EyeOff } from 'lucide-react';

import { registerUser } from '@/lib/apiCall'; 

const ClinicMap = dynamic(() => import('./ClinicMap'), { 
    ssr: false 
});

export default function DoctorSignUpInputs() {
    const router = useRouter();

    const [clinicPosition, setClinicPosition] = useState<[number, number]>([30.0444, 31.2357]);
    const [addressText, setAddressText] = useState("");
    const [isLoading, setIsLoading] = useState(false); 

    const [formData, setFormData] = useState({
        name: '',
        gender: null as 'M' | 'F' | null,
        age: 18,
        clinicName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showPassword, setShowPassword] = useState(false);

    const inputStyle = `w-full py-3 px-4 rounded-xl bg-[#f4f4f4] outline-none
    border-2 border-[#d3d3d3] focus:border-[#0089ff] transition-all
    autofill:shadow-[inset_0_0_0px_1000px_#f4f4f4] autofill:text-slate-950`;

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.gender) newErrors.gender = "Please select your gender";
        if (!formData.clinicName.trim()) newErrors.clinicName = "Clinic name is required";

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                setIsLoading(true);
                const submissionData = {
                    name: formData.name,
                    gender: formData.gender === 'M' ? 'male' : 'female', 
                    age: formData.age,
                    clinicName: formData.clinicName,
                    email: formData.email,
                    password: formData.password,
                    password_confirmation: formData.confirmPassword, 
                    type: 'doctor', 
                    clinic_latitude: clinicPosition[0],
                    clinic_longitude: clinicPosition[1],
                    address: addressText
                };

                const response = await registerUser(submissionData);
                if (response.token) {
                    localStorage.setItem("userToken", response.token);
                }

                alert("Registration Successful!");
                router.push('/home');
            } catch (error: any) {
                console.error("Registration Error:", error.message);
                setErrors({ apiError: error.message });
            } finally {
                setIsLoading(false);
            }
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
                    onChange={(e) => {
                        setFormData({...formData, name: e.target.value});
                        if(errors.name) setErrors({...errors, name: ''});
                    }}
                />
                {errors.name && <span className="text-red-500 text-xs ml-1">{errors.name}</span>}
            </div>

            <div className="w-full">
                <GenderSelector 
                    selected={formData.gender} 
                    onChange={(val) => {
                        setFormData({...formData, gender: val});
                        setErrors({...errors, gender: ''});
                    }} 
                />
                {errors.gender && <p className="text-red-500 text-xs text-center mt-2">{errors.gender}</p>}
            </div>

            <AgeSelector 
                selectedAge={formData.age} 
                onChange={(val) => setFormData({...formData, age: val})} 
            />

            <div className="w-full flex flex-col gap-2">
                <label className="font-bold text-lg text-slate-900 ml-1">Clinic Name</label>
                <input 
                    type="text" 
                    placeholder="Enter Your Clinic Name"
                    className={`${inputStyle} ${errors.clinicName ? 'border-red-500' : ''}`}
                    onChange={(e) => {
                        setFormData({...formData, clinicName: e.target.value});
                        if(errors.clinicName) setErrors({...errors, clinicName: ''});
                    }}
                />
                {errors.clinicName && <span className="text-red-500 text-xs ml-1">{errors.clinicName}</span>}
            </div>

            <ClinicMap 
                position={clinicPosition} 
                onPositionChange={(newPos: [number, number]) => setClinicPosition(newPos)}
                addressText={addressText} 
                onAddressChange={(newVal) => setAddressText(newVal)}
            />

            <AvailabilityDetails />
            <FileUpload title='Graduation Certificate' />
            <FileUpload title='National ID' />

            <div className="w-full flex flex-col gap-2">
                <label className="font-bold text-lg text-slate-900 ml-1">Email</label>
                <input 
                    type="email" 
                    placeholder="Enter Your Email"
                    className={`${inputStyle} ${errors.email ? 'border-red-500' : ''}`}
                    onChange={(e) => {
                        setFormData({...formData, email: e.target.value});
                        if(errors.email) setErrors({...errors, email: ''});
                    }}
                />
                {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email}</span>}
            </div>

            <div className="w-full flex flex-col gap-5">
                <div className="relative w-full flex flex-col gap-2">
                    <label className="font-bold text-lg text-slate-900 ml-1">Password</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={formData.password}
                            onChange={(e) => {
                                setFormData({...formData, password: e.target.value});
                                if(errors.password) setErrors({...errors, password: ''});
                            }}
                            placeholder='Enter Your Password'
                            className={`${inputStyle} pr-12 ${errors.password ? 'border-red-500' : ''}`} 
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0089ff]"
                        >
                            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>
                    {errors.password && <span className="text-red-500 text-xs ml-1">{errors.password}</span>}
                </div>

                <div className="relative w-full flex flex-col gap-2">
                    <label className="font-bold text-lg text-slate-900 ml-1">Confirm Password</label>
                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            value={formData.confirmPassword}
                            placeholder="Confirm Your Password" 
                            className={`${inputStyle} pr-12 ${errors.confirmPassword ? 'border-red-500' : ''}`} 
                            onChange={(e) => {
                                setFormData({...formData, confirmPassword: e.target.value});
                                if(errors.confirmPassword) setErrors({...errors, confirmPassword: ''});
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0089ff]"
                        >
                            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>
                    {errors.confirmPassword && <span className="text-red-500 text-xs ml-1">{errors.confirmPassword}</span>}
                </div>
            </div>

            {errors.apiError && <p className="text-red-500 font-medium text-center">{errors.apiError}</p>}

            <Button 
                type="submit" 
                disabled={isLoading}
                className="w-1/2 py-8 text-xl font-bold bg-[#0089ff] rounded-[50px] mt-4 shadow-xl text-white disabled:bg-slate-400"
            >
                {isLoading ? "Signing Up..." : "Sign Up"}
            </Button>
        </form>
    );
}