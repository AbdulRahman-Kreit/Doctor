"use client";
import React, { useState, useEffect, use } from 'react'; 
import Image from 'next/image';
import { Star, MoreVertical, Loader2 } from 'lucide-react';
import BackButton from '@/components/Generals/BackButton';
import AboutDoctor from '@/components/DoctorDetails/AboutDoctor';
import ClinicAddress from '@/components/DoctorDetails/ClinicAddress';
import DoctorReviews from '@/components/DoctorDetails/DoctorReviews';
import ServicesSlider from '@/components/DoctorDetails/ServiceSlider';
import DateSelector from '@/components/DoctorDetails/DateSelector';
import TimeSelector from '@/components/DoctorDetails/TimeSelector';
import BookingButton from '@/components/DoctorDetails/BookingButton';
import { apiCall } from '@/lib/apiCall'; 

interface PageProps {
    params: Promise<{ id: string }>; 
}

export default function DoctorDetailPage({ params }: PageProps) {
    const resolvedParams = use(params);
    const [doctor, setDoctor] = useState<any>(null);
    const [reviewsCount, setReviewsCount] = useState<number>(0);
    const [reviewsData, setReviewsData] = useState<any[]>([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const response = await apiCall(`/doctors/${resolvedParams.id}`, "GET");
                
                if (response && response.doctor) {
                    setDoctor({
                        ...response.doctor,
                        experience: response.doctor.experience ?? response.doctor.years_of_experience ?? 0,
                        years_of_experience: response.doctor.years_of_experience ?? response.doctor.experience ?? 0
                    });
                } else {
                    setDoctor({
                        id: resolvedParams.id,
                        name: "Doctor",
                        speciality: "Specialist",
                        clinic_name: "City Hospital",
                        clinic_address: "",
                        about: "",
                        rating: 0,
                        gender: "male",
                        experience: 0,
                        years_of_experience: 0
                    });
                }

                try {
                    const ratesResponse = await apiCall(`/rate/me`, "GET");
                    if (ratesResponse) {
                        setReviewsCount(ratesResponse.count || 0); 
                        setReviewsData(ratesResponse.data || []); 
                    }
                } catch (rateError) {
                    console.error("Failed to fetch rates, fallback to defaults:", rateError);
                }
                
            } catch (error) {
                console.error("Failed to fetch doctor details, injecting safe defaults:", error);
                
                setDoctor({
                    id: resolvedParams.id,
                    name: "Doctor", 
                    speciality: "Specialist",
                    clinic_name: "City Hospital",
                    clinic_address: "Not Available",
                    about: "No description available.",
                    rating: 5.0,
                    gender: "male",
                    experience: 0,
                    years_of_experience: 0
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorDetails();
    }, [resolvedParams.id]);

    if (loading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-500" size={40} />
            </div>
        );
    }

    if (!doctor) {
        return <div className="p-10 text-center text-slate-500">Doctor not found</div>;
    }

    const fallbackImage = doctor.gender === 'female' 
        ? '/assets/doctor_female.svg' 
        : '/assets/doctor_male.svg';
    
    const doctorImage = doctor.image || fallbackImage;

    return (
        <main className="h-screen bg-white overflow-y-auto overflow-x-hidden font-nunito pb-32">
            
            {/* Header Section */}
            <div className="flex justify-between items-center px-6 py-8">
                <BackButton />
                <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {doctor.name}
                </h1>
                <button className="p-2 cursor-pointer">
                    <MoreVertical className="text-slate-900" size={24} />
                </button>
            </div>

            {/* Doctor Image Card */}
            <div className="px-6 relative">
                <div className="relative w-full h-80 rounded-lg overflow-hidden shadow-md bg-slate-100">
                    <Image 
                        src={doctorImage} 
                        alt={doctor.name}
                        fill
                        className="object-contain pt-4" 
                    />
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-linear-to-r from-[#27b9ff] to-[#0a96ff] p-6 flex justify-between items-start">
                        <div className="flex flex-col">
                            <h2 className="text-white text-xl font-bold leading-none">
                                {doctor.name}
                            </h2>
                            <p className="text-blue-100 text-sm font-medium mt-2 opacity-90">
                                {doctor.speciality} | {doctor.clinic_name || 'City Hospital'}
                            </p>
                        </div>

                        <div className="flex items-center gap-1.5 mt-1"> 
                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-white font-bold text-sm tracking-tight">
                                {doctor.rating} ({reviewsCount} reviews)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="flex justify-between gap-3 px-6 mt-8">
                {[
                    { label: 'Experience', value: `${doctor.experience || 0}+ years`, color: 'text-blue-500' },
                    { label: 'Reviews', value: `${reviewsCount}+`, color: 'text-blue-500' },
                ].map((stat, i) => (
                    <div key={i} className="flex-1 bg-white p-4 rounded-[25px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 flex flex-col items-center">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
                        <span className={`${stat.color} font-black text-sm mt-1`}>{stat.value}</span>
                    </div>
                ))}
            </div>

            <AboutDoctor 
                name={doctor.name} 
                specialty={doctor.speciality} 
                description={doctor.about}
            />

            <ClinicAddress 
                clinicName={doctor.clinic_name}
                address={doctor.clinic_address}
            />

            <DoctorReviews reviews={reviewsData}/>

            <div className="w-full overflow-hidden">
                <ServicesSlider />
            </div>

            <div className="w-full overflow-hidden">
                <DateSelector />
            </div>

            <TimeSelector />

            <BookingButton 
                doctorId={doctor.id.toString()} 
                doctorName={doctor.name}
                doctorImage={doctorImage}
                specialty={doctor.speciality}
            />

        </main>
    );
}