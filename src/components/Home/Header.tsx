"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiCall } from '@/lib/apiCall'; 

export default function Header() {
    const router = useRouter();

    const [userData, setUserData] = useState<{
        name: string;
        age: string;
        gender: string;
        personal_image: string | null;
    } | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await apiCall("/auth/me", "GET");

                if (response && response.data && response.data.user) {
                    setUserData(response.data.user);
                }
            } catch (error: any) {
                console.error("Error fetching dynamic user data:", error.message);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) return <div className="p-10 text-slate-400">Loading Profile...</div>;

    return (
        <div className='flex flex-row items-center justify-between w-full px-8 pt-10 pb-0 bg-white'>
            <div className="flex flex-col">
                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
                    {userData.name}
                </h3>
                <p className="text-lg font-medium text-slate-500 mt-1">
                    {userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)}, {userData.age}
                </p>
            </div>
            <div onClick={() => router.push('/profile')} className="relative w-16 h-16 rounded-full cursor-pointer">
                <div className="w-full h-full rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-2xl font-bold uppercase select-none">
                    {userData.name.charAt(0)}
                </div>
            </div>
        </div>
    )
}