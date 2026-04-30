import React from 'react';
import Image from 'next/image';
import { Star, MoreVertical } from 'lucide-react';
import BackButton from '@/components/Generals/BackButton';
import AboutDoctor from '@/components/DoctorDetails/AboutDoctor';
import ClinicAddress from '@/components/DoctorDetails/ClinicAddress';
import ServicesSlider from '@/components/DoctorDetails/ServiceSlider';
import DateSelector from '@/components/DoctorDetails/DateSelector';
import TimeSelector from '@/components/DoctorDetails/TimeSelector';
import BookingButton from '@/components/DoctorDetails/BookingButton';


const getDoctorData = (id: string) => {
    const doctorsData: Record<string, { image: string; name: string; specialty: string }> = {
        'kate-rose': { name: 'Dr. Kate Rose', image: '/assets/doctor_female.svg', specialty: 'Pediatrician' },
        'kyle-bush': { name: 'Dr. Kyle Bush', image: '/assets/doctor_male.svg', specialty: 'Cardiologist' },
        'john-cooper': { name: 'Dr. John Cooper', image: '/assets/doctor_female.svg', specialty: 'Pediatrician' },
        'erick-the-red': { name: 'Dr. Erick the Red', image: '/assets/doctor_male.svg', specialty: 'Cardiologist' },
    };
    return doctorsData[id] || { name: 'Dr. Riya Singhal', image: '/assets/doctor-image.jpg', specialty: 'General Physician' };
};

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function DoctorDetailPage({ params }: PageProps) {
    const { id } = await params;
    const doctor = getDoctorData(id);

    return (
        <main className="h-screen bg-white overflow-y-auto overflow-x-hidden font-nunito pb-30">
            
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
                <div className="relative w-full h-[320px] rounded-lg overflow-hidden shadow-md bg-slate-100">
                    <Image 
                        src={doctor.image} 
                        alt={doctor.name}
                        fill
                        className="object-contain pt-4" 
                    />
                    
                    <div className={`absolute bottom-0 left-0 right-0 bg-linear-to-r 
                        from-[#27b9ff] to-[#0a96ff] p-6 flex justify-between 
                        items-start`}>

                        <div className="flex flex-col">
                            <h2 className="text-white text-xl font-bold leading-none">
                                {doctor.name}
                            </h2>
                            <p className="text-blue-100 text-sm font-medium mt-2 opacity-90">
                                {doctor.specialty} | City Hospital
                            </p>
                        </div>

                        <div className="flex items-center gap-1.5 mt-1"> 
                            <Star size={16} className="fill-yellow-400 text-yellow-400" />
                            <span className="text-white font-bold text-sm tracking-tight">
                                4.9 (562 reviews)
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="flex justify-between gap-3 px-6 mt-8">
                {[
                    { label: 'Experience', value: '10+ years', color: 'text-blue-500' },
                    { label: 'Patients', value: '900+', color: 'text-blue-500' }
                ].map((stat, i) => (
                    <div key={i} className="flex-1 bg-white p-4 rounded-[25px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 flex flex-col items-center">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
                        <span className={`${stat.color} font-black text-sm mt-1`}>{stat.value}</span>
                    </div>
                ))}
            </div>

            {/* About Section */}
            <AboutDoctor 
                name={doctor.name} 
                specialty={doctor.specialty} 
            />

            {/* Address Section */}
            <ClinicAddress />

            {/* Services Section */}
            <div style={{ width: '100vw', maxWidth: '100%', overflow: 'hidden' }}>
                <ServicesSlider />
            </div>

            {/* Date Selecting Section */}
            <div style={{ width: '100vw', maxWidth: '100%', overflow: 'hidden' }}>
                <DateSelector />
            </div>

            {/* Time Selecting Section */}
            <TimeSelector />

            {/* Booking Button */}
            <BookingButton 
                doctorId={id} 
                doctorName={doctor.name}
                doctorImage={doctor.image}
                specialty={doctor.specialty}
            />

        </main>
    );
}