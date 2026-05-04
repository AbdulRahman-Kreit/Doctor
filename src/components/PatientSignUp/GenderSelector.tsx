"use client";
import React from 'react';

interface GenderProps {
    selected: 'M' | 'F' | null;
    onChange: (gender: 'M' | 'F') => void;
}

export default function GenderSelector({ selected, onChange }: GenderProps) {
    const baseBox = "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold transition-all cursor-pointer";
    
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-6">
                <h3 className="text-slate-950 text-lg font-bold">Select Your Gender</h3>
                <div className="flex gap-4">
                    <div onClick={() => onChange('M')} className={`${baseBox} bg-[#0089ff] ${selected === 'M' ? 'ring-4 ring-white ring-inset' : ''}`}>M</div>
                    <div onClick={() => onChange('F')} className={`${baseBox} bg-[#00c2ff] ${selected === 'F' ? 'ring-4 ring-white ring-inset' : ''}`}>F</div>
                </div>
            </div>
        </div>
    );
}