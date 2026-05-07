"use client";
import React, { useEffect, useState } from 'react';
import DoctorCard from './DoctorCard';
import { apiCall } from '@/lib/apiCall'; 

interface DoctorListProps {
    searchQuery?: string; 
}

export default function DoctorList({ searchQuery = "" }: DoctorListProps) {
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setIsLoading(true);
                const response = await apiCall("/doctors?paginateSize=100", "GET");
                const allData = response?.data?.data || response?.data || response || [];
                
                setDoctors(Array.isArray(allData) ? allData : []);
            } catch (error: any) {
                console.error("Doctors data fetching error", error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    const filteredDoctors = doctors.filter((doc: any) => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (doc.speciality && doc.speciality.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const toggleVisibleCount = () => {
        if (visibleCount >= filteredDoctors.length) {
            setVisibleCount(4);
        } else {
            setVisibleCount(filteredDoctors.length); 
        }
    };

    if (isLoading) return <div className="text-center p-10 text-slate-500">Loading...</div>;

    return (
        <section className="flex flex-col gap-6 w-full">
            <div className="flex justify-between items-end px-2 mb-10">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    Available Doctors Nearby
                </h2>

                {filteredDoctors.length > 4 && (
                    <button 
                        onClick={toggleVisibleCount}
                        className="text-[#0089ff] mb-0.5 text-sm font-bold hover:underline transition-colors"
                    >
                        {visibleCount >= filteredDoctors.length ? "View Less" : "View More"}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-12 justify-items-center">

                {filteredDoctors.slice(0, visibleCount).map((doc: any) => (
                    <DoctorCard 
                        key={doc.id} 
                        id={doc.id}
                        name={doc.name}
                        specialty={doc.speciality || "General"} 
                        rating={doc.rating || 0}
                        patients={doc.experience || 0} 
                        image={doc.image || '/assets/doctor_male.svg'} 
                    /> 
                ))}
            </div>

            {filteredDoctors.length === 0 && (
                <div className="text-center text-slate-400 py-10">
                    No doctors found matching "{searchQuery}"
                </div>
            )}
        </section>
    );
}