"use client";
import React, { useState } from 'react'; 
import { Mic } from 'lucide-react';

interface CategoryButton {
    id: string;
    imageSrc: string;
    alt: string;
    onClick: () => void;
}

interface SearchCardProps {
    onSearch?: (value: string) => void;
}

export default function SearchCard({ onSearch }: SearchCardProps) {

    const [searchValue, setSearchValue] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchValue(val);
        if (onSearch) onSearch(val);
    };

    return (
        <div className="w-9/10 max-w-[550px] bg-linear-to-r from-[#27b9ff] to-[#0a96ff] rounded-[50px] p-10 my-5 flex flex-col gap-10 shadow-lg">
            <div className="flex flex-col gap-1">
                <h1 className="text-white text-3xl font-bold tracking-tight">Let&apos;s Find Your</h1>
                <h1 className="text-white text-3xl font-bold tracking-tight">Doctor</h1>
            </div>

            <div className="relative w-full">
                <input 
                    type="text"
                    value={searchValue} 
                    placeholder='Try "Dermatologist"'
                    className="w-full py-3 px-5 rounded-2xl bg-white text-slate-400 placeholder-slate-300 text-l font-medium outline-none shadow-sm"
                    onChange={handleChange} 
                />
            </div>
        </div>
    );
}