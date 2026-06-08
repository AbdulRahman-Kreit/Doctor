"use client";
import React, { useState, useEffect } from 'react';
import Header from '@/components/Home/Header';
import SearchCard from '@/components/Home/SearchCard';
import Navbar from '@/components/Generals/Navbar';
import DoctorList from '@/components/Home/DoctorList'; 
import DoctorAppointments from '@/components/Appointments/Doctor/DoctorAppointments';

export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [userType, setUserType] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserType = () => {
            try {
                setIsLoading(true);
                const storedUser = localStorage.getItem("userData");
                
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    setUserType(user.type); 
                }
            } catch (error) {
                console.error("Error fetching user data from storage:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserType();
    }, []);


    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-white">
                <div className="text-slate-500 font-bold animate-pulse">Loading...</div>
            </div>
        );
    }

    return (
        <main className="relative bg-white max-w-191.75 w-full min-h-screen mx-auto font-nunito flex flex-col items-center pb-28">
            {userType === 'patient' && (
                <>
                    <Header />
                    
                    <div className="w-full px-6 flex flex-col items-center gap-10">
                        <SearchCard 
                            onSearch={(value) => setSearchQuery(value)} 
                        />

                        <DoctorList searchQuery={searchQuery} />
                    </div>

                    <Navbar />
                </>
            )}
            
            {userType === 'doctor' && <DoctorAppointments />}

            {!userType && (
                <div className="flex items-center justify-center h-screen text-slate-500 font-bold text-center px-6">
                    No user data found. Please log in to access the system.
                </div>
            )}
        </main>
    );
}