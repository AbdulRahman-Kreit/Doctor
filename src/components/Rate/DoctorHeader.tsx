"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { apiCall } from '@/lib/apiCall';

export default function DoctorHeader({ id }: { id: string }) {
    const [doctor, setDoctor] = useState({ name: "Loading...", image: "/assets/doctor_male.svg" });

    useEffect(() => {
        const fetchInfo = async () => {
            try {
                const response = await apiCall(`/doctors/${id}`, "GET");
                if (response?.doctor) {
                    const data = response.doctor;
                    setDoctor({
                        name: data.name || "Doctor",
                        image: data.image || "/assets/doctor_male.svg"
                    });
                }
            } catch (error) {
                setDoctor({ name: "Doctor", image: "/assets/doctor_male.svg" });
            }
        };
        fetchInfo();
    }, [id]);

    return (
        <div className="flex items-center gap-4 self-start mb-8 w-full">
            <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-sm bg-white flex-shrink-0">
                <Image 
                    src={doctor.image} 
                    alt={doctor.name}
                    fill
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col text-white">
                <span className="text-xs font-medium opacity-90">What do you think about</span>
                <h2 className="text-2xl font-bold leading-tight">Dr. {doctor.name}</h2>
            </div>
        </div>
    );
}