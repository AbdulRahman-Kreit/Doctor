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

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setIsLoading(true);
                const response = await apiCall("/doctors", "GET");
                if (response && response.data) {
                    setDoctors(response.data);
                }
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

    if (isLoading) return <div className="text-center p-10 text-slate-500"></div>;

    return (
        <section className="flex flex-col gap-6 w-full">
            <div className="flex justify-between items-end px-2">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Available Doctors Nearby</h2>
                <button className="text-slate-400 text-sm font-medium hover:text-[#0089ff] transition-colors">View More</button>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-12 justify-items-center">
                {filteredDoctors.map((doc: any) => (
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
        </section>
    );
}