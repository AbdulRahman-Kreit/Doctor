"use client";
import React from 'react';
import { Mic } from 'lucide-react';

interface CategoryButton {
    id: string;
    imageSrc: string;
    alt: string;
    onClick: () => void;
}

interface SearchCardProps {
    categories: CategoryButton[];
    onSearch?: (value: string) => void;
}

export default function SearchCard({ categories, onSearch }: SearchCardProps) {
    return (
        <div className="w-9/10 max-w-[550px] bg-linear-to-r from-[#27b9ff] to-[#0a96ff] rounded-[50px] p-10 my-5 flex flex-col gap-10 shadow-lg">
            {/* Title Section */}
            <div className="flex flex-col gap-1">
                <h1 className="text-white text-3xl font-bold tracking-tight">
                    Let&apos;s Find Your
                </h1>
                <h1 className="text-white text-3xl font-bold tracking-tight">
                    Doctor
                </h1>
            </div>

            {/* Dynamic Category Buttons Section */}
            <div className="flex flex-row items-center justify-center gap-6 px-1">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={category.onClick}
                        className="w-12 h-12 rounded-full bg-[#d9efff] flex items-center justify-center shadow-sm hover:bg-white transition-all active:scale-95 cursor-pointer overflow-hidden"
                    >
                        <img 
                            src={category.imageSrc} 
                            alt={category.alt} 
                            className="w-8 h-8 object-contain opacity-90"
                        />
                    </button>
                ))}
            </div>
            {/* Search Input Section */}
            <div className="relative w-full">
                <input 
                    type="text"
                    placeholder='Try "Dermatologist"'
                    className="w-full py-3 px-5 rounded-2xl bg-white text-slate-400 placeholder-slate-300 text-l font-medium outline-none shadow-sm"
                    onChange={(e) => onSearch?.(e.target.value)}
                />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0089ff] hover:scale-110 transition-transform">
                    <Mic size={28} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}