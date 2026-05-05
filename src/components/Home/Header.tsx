"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
        <div className='flex flex-row items-center justify-between w-full px-10 pt-10 pb-0 bg-white'>
            <div className="flex flex-col">
                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
                    {userData.name}
                </h3>
                <p className="text-lg font-medium text-slate-500 mt-1">
                    {userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)}, {userData.age}
                </p>
            </div>
            <div onClick={() => router.push('/profile')} className="relative w-22 h-22 rounded-full cursor-pointer">
                <Image 
                    src={userData.personal_image ? userData.personal_image : "/assets/ProfilePic.svg"} 
                    alt="User Profile" 
                    fill
                    className="object-cover rounded-full"
                />
            </div>
        </div>
    )
}