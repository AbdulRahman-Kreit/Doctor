"use client";
import React from 'react';

interface AgeSelectorProps {
    selectedAge: number;
    onChange: (age: number) => void;
}

export default function AgeSelector({ selectedAge, onChange }: AgeSelectorProps) {
    const ages = Array.from({ length: 5 }, (_, i) => selectedAge - 2 + i);

    return (
        <div className="flex flex-col items-center gap-3 w-full">
            <h3 className="text-slate-950 text-xl font-bold">Enter Your Age</h3>
            <div className="flex items-center justify-between w-full max-w-[320px] px-6 py-3 rounded-full border-2 border-[#0089ff] bg-white">
                {ages.map((age) => (
                    <button
                        key={age}
                        type="button"
                        onClick={() => onChange(age)}
                        className={`transition-all duration-300 ${
                            age === selectedAge 
                            ? "text-[28px] font-black text-slate-900" 
                            : "text-lg font-medium text-slate-400 opacity-60"
                        }`}
                    >
                        {age > 13 ? age : ""}
                    </button>
                ))}
            </div>
        </div>
    );
}