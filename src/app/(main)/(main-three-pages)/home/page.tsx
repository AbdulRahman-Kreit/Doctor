// src/app/home/page.tsx
"use client";
import React from 'react';
import Header from '@/components/Home/Header';
import SearchCard from '@/components/Home/SearchCard';
import Navbar from '@/components/Generals/Navbar';
import DoctorList from '@/components/Home/DoctorList'; 

export default function HomePage() {
    const categories = [
        { id: '1', imageSrc: '/assets/heart.svg', alt: 'Heart', onClick: () => {} },
        { id: '2', imageSrc: '/assets/lungs.svg', alt: 'Lungs', onClick: () => {} },
        { id: '3', imageSrc: '/assets/tooth.svg', alt: 'Tooth', onClick: () => {} },
        { id: '4', imageSrc: '/assets/bandage.svg', alt: 'Bandage', onClick: () => {} },
    ];

    return (
        <main className="relative bg-white max-w-191.75 w-full min-h-screen mx-auto font-nunito flex flex-col items-center pb-28">
            <Header />
            
            <div className="w-full px-6 flex flex-col items-center gap-10">
                <SearchCard categories={categories} />

                <DoctorList />
            </div>

            <Navbar />
        </main>
    );
}