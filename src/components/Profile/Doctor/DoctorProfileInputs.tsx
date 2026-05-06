/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import dynamic from 'next/dynamic';
import React, { useState, useEffect } from 'react';
import ImageUploadInput from './ImageUploadInput';
import GenderSelector from './GenderSelector';
import AgeSelector from './AgeSelector';
import AvailabilityDetails from './AvailabilityDetails';
import FileUpload from './FileUpload';
import SpecialtyDropdown from './SpecialtyDropdown';
import Experience from './Experience';
import { Button } from '@/components/ui/button';
import { apiCall } from '@/lib/apiCall'; 

const ClinicMap = dynamic(() => import('./ClinicMap'), { 
    ssr: false,
    loading: () => <div className="h-55 bg-slate-100 animate-pulse rounded-2xl" /> 
});

export default function DoctorProfileInputs() {
    const [isLoading, setIsLoading] = useState(false); 
    const [isMounted, setIsMounted] = useState(false); 

    const [formData, setFormData] = useState({
        name: '',
        gender: null as 'M' | 'F' | null,
        age: 30,
        clinicName: '',
        email: '',
        password: '',
        password_confirmation: '', 
        experience: 5,
        specialty: '',
        speciality_id: 1, 
        description: '', 
        address: '',
        latitude: 30.0444,
        longitude: 31.2357,
        work_days: [] as { day: string; from: string; to: string }[] 
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        setIsMounted(true);
        const fetchProfileData = async () => {
            try {
                const response = await apiCall("/profile", "GET");
                const userData = response?.data || response || {};
                const doctorProfile = (userData.doctor_profile && userData.doctor_profile.length > 0) 
                    ? userData.doctor_profile[0] 
                    : {};

                setFormData(prev => ({
                    ...prev,
                    name: userData.name || prev.name,
                    email: userData.email || prev.email,
                    gender: userData.gender === 'male' ? 'M' : (userData.gender === 'female' ? 'F' : prev.gender),
                    age: userData.age || prev.age,
                    clinicName: doctorProfile.clinic_name || prev.clinicName,
                    address: doctorProfile.clinic_address || prev.address,
                    description: doctorProfile.additional_info || prev.description, 
                    experience: doctorProfile.years_of_experience ? parseInt(doctorProfile.years_of_experience) : prev.experience,
                    speciality_id: doctorProfile.speciality_id || prev.speciality_id,
                    specialty: doctorProfile.speciality?.name || prev.specialty,
                    latitude: doctorProfile.latitude ? parseFloat(doctorProfile.latitude) : prev.latitude,
                    longitude: doctorProfile.longitude ? parseFloat(doctorProfile.longitude) : prev.longitude,
                    work_days: userData.work_days || doctorProfile.work_days || prev.work_days
                }));

            } catch (error) {
                console.error("Failed to fetch profile:", error);
            }
        };

        fetchProfileData();
    }, []);

    const inputStyle = `w-full py-3 px-4 rounded-xl bg-[#f4f4f4] outline-none
    border-2 border-[#d3d3d3] focus:border-[#0089ff] transition-all
    autofill:shadow-[inset_0_0_0px_1000px_#f4f4f4] autofill:text-slate-950`;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (formData.password !== formData.password_confirmation) {
            setErrors({ apiError: "Passwords do not match" });
            return;
        }

        setIsLoading(true);
        setErrors({});

        try {
            const payload: any = {
                name: formData.name,
                email: formData.email,
                gender: formData.gender === 'M' ? 'male' : 'female',
                age: formData.age,
                clinic_name: formData.clinicName,
                clinic_address: formData.address,
                speciality_id: formData.speciality_id,
                years_of_experience: formData.experience,
                additional_info: formData.description, 
                latitude: formData.latitude,
                longitude: formData.longitude,
                work_days: formData.work_days 
            };

            if (formData.password) {
                payload.password = formData.password;
                payload.password_confirmation = formData.password_confirmation;
            }

            const response = await apiCall("/profile", "POST", payload);

            if (response) {
                alert("Data was saved successfully");
            }
        } catch (error: any) {
            console.error("Update error:", error);
            setErrors({ apiError: error.message || "Update error" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center w-full max-w-[450px] mx-auto pt-4 pb-20 px-8 gap-8">
            <ImageUploadInput />

            <div className="w-full flex flex-col gap-2">
                <label className="font-bold text-lg text-slate-900 ml-1">Name</label>
                <input 
                    type="text" 
                    value={formData.name}
                    placeholder="Enter Your Name"
                    className={inputStyle}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <GenderSelector 
                selected={formData.gender} 
                onChange={(val) => setFormData({...formData, gender: val})} 
            />

            <AgeSelector 
                selectedAge={formData.age} 
                onChange={(val) => setFormData({...formData, age: val})} 
            />

            <Experience 
                selectedYear={formData.experience} 
                onChange={(val) => setFormData({...formData, experience: val})} 
            />

            <SpecialtyDropdown 
                selected={formData.specialty}
                onSelect={(val) => setFormData({
                    ...formData, 
                    specialty: val.name, 
                    speciality_id: val.id 
                })}
            />

            <div className="w-full flex flex-col gap-3">
                <label className="font-bold text-xl text-slate-900 ml-1">Enter your portfolio description</label>
                <textarea 
                    rows={8}
                    value={formData.description}
                    placeholder="Portfolio discription..."
                    className="w-full p-6 rounded-lg bg-[#f4f4f4] outline-none border-2 border-[#d3d3d3] 
                    focus:border-[#0089ff] transition-all resize-none text-slate-700 placeholder:text-slate-400"
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
            </div>

            <div className="w-full flex flex-col gap-2">
                <label className="font-bold text-lg text-slate-900 ml-1">Clinic Name</label>
                <input 
                    type="text" 
                    value={formData.clinicName}
                    placeholder="Enter Your Clinic Name"
                    className={inputStyle}
                    onChange={(e) => setFormData({...formData, clinicName: e.target.value})}
                />
            </div>

            {isMounted && (
                <ClinicMap 
                    key={`${formData.latitude}-${formData.longitude}`}
                    position={[formData.latitude, formData.longitude]} 
                    addressText={formData.address} 
                    onAddressChange={(val) => setFormData({...formData, address: val})}
                />
            )}

            <AvailabilityDetails 
                workDays={formData.work_days}
                onChange={(workDays) => setFormData({ ...formData, work_days: workDays })} 
            />
            
            <div className="w-full flex flex-col gap-5">
                <FileUpload title='Graduation Certificate' />
                <FileUpload title='National ID' />
            </div>

            <div className="w-full flex flex-col gap-2">
                <label className="font-bold text-lg text-slate-900 ml-1">Email</label>
                <input 
                    type="email" 
                    value={formData.email}
                    className={inputStyle}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
            </div>

            <div className="w-full flex flex-col gap-2">
                <label className="font-bold text-lg text-slate-900 ml-1">New Password</label>
                <input 
                    type="password" 
                    value={formData.password}
                    placeholder="Enter new password"
                    className={inputStyle}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
            </div>

            <div className="w-full flex flex-col gap-2">
                <label className="font-bold text-lg text-slate-900 ml-1">Confirm New Password</label>
                <input 
                    type="password" 
                    value={formData.password_confirmation}
                    placeholder="Confirm new password"
                    className={inputStyle}
                    onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
                />
            </div>

            {errors.apiError && <p className="text-red-500 font-medium">{errors.apiError}</p>}

            <Button 
                type="submit" 
                disabled={isLoading}
                className="w-1/2 py-8 text-xl font-bold bg-[#0089ff] rounded-[50px] mt-4 shadow-xl text-white hover:bg-[#0070d0]"
            >
                {isLoading ? "Saving..." : "Save Changes"}
            </Button>
        </form>
    );
}