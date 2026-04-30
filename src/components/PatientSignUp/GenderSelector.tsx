"use client";
import React, { useState } from 'react';

export default function GenderSelector() {
    const [selectedGender, setSelectedGender] = useState<'M' | 'F' | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSelect = (gender: 'M' | 'F') => {
        setSelectedGender(gender);
        setError(null);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-6">
                <h3 className="text-slate-950 text-lg font-bold">
                    Enter Your Gender
                </h3>

                <div className="flex gap-4">
                    <label className="cursor-pointer relative">
                        <input 
                            type="radio" 
                            name="gender" 
                            className="sr-only peer" 
                            onChange={() => handleSelect('M')}
                        />
                        <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all
                            bg-[#0089ff] hover:bg-[#007ae6]
                            ${selectedGender === 'M' ? 'ring-4 ring-inset ring-white' : ''}
                        `}>
                            M
                        </div>
                    </label>

                    <label className="cursor-pointer relative">
                        <input 
                            type="radio" 
                            name="gender" 
                            className="sr-only peer" 
                            onChange={() => handleSelect('F')}
                        />
                        <div className={`
                            w-12 h-12 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all
                            bg-[#00c2ff] hover:bg-[#00b0e6]
                            ${selectedGender === 'F' ? 'ring-4 ring-inset ring-white' : ''}
                        `}>
                            F
                        </div>
                    </label>
                </div>
            </div>

            {error && (
                <span className="text-red-500 text-xs font-medium ml-2">{error}</span>
            )}
        </div>
    );
}