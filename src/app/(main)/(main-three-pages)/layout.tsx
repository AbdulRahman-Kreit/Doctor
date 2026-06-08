"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Generals/Navbar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
    doctorModal: React.ReactNode;
}) {
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
                console.error("Error fetching user data from storage in layout:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserType();
    }, []);

    if (isLoading) {
        return (
            <main className="relative overflow-hidden bg-white max-w-191.75 w-full min-h-screen mx-auto font-nunito flex flex-col items-center justify-center">
                <div className="text-slate-400 font-bold animate-pulse">Loading...</div>
            </main>
        );
    }

    return (
        <main className="relative overflow-hidden bg-white max-w-191.75 w-full min-h-screen 
        mx-auto font-nunito flex flex-col items-center">
            {children}
            
            {userType === 'patient' && <Navbar />}
        </main>
    );
}