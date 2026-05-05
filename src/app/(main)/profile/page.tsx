"use client";
import React, { useEffect, useState } from 'react';
import DoctorProfileInputs from '@/components/Profile/Doctor/DoctorProfileInputs';

export default function Profile() {
    const [userType, setUserType] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setIsLoading(true);
                const storedUser = localStorage.getItem("userData");
                
                if (storedUser) {
                    const user = JSON.parse(storedUser);
                    setUserType(user.type); 
                }
            } catch (error) {
                console.error("Error fetching user type:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (isLoading) return <div className="text-center p-10">Loading Profile...</div>;

    return (
        <main className="relative overflow-x-hidden bg-white max-w-[767px] w-full min-h-screen mx-auto font-nunito flex flex-col">
            {userType === 'doctor' ? (
                <DoctorProfileInputs />
            ) : (
                <div className='flex items-center justify-center text-2xl font-semibold'>
                    This page will be added in future updates
                </div>
            )}
        </main>
    );
}