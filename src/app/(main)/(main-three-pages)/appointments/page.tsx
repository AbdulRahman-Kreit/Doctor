"use client";
import React, { useEffect, useState } from 'react';
import PatientAppointments from '@/components/Appointments/Patient/PatientAppointments';

export default function Appointments() {
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
                <div className="text-slate-500 font-bold animate-pulse">Loading Appointments...</div>
            </div>
        );
    }

    return (
        <main className="w-full min-h-screen bg-white font-nunito">
            {userType === 'patient' && <PatientAppointments />}

            {!userType && (
                <div className="flex items-center justify-center h-screen text-slate-500 font-bold text-center px-6">
                    No user data found. Please log in to view your appointments.
                </div>
            )}
        </main>
    );
}