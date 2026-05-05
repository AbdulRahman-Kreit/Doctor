"use client";
import React from 'react';

interface GenderSelectorProps {
    selected: 'M' | 'F' | null;
    onChange: (gender: 'M' | 'F') => void;
}

export default function GenderSelector({ selected, onChange }: GenderSelectorProps) {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
                <h3 className="text-slate-950 text-[16px] font-bold">
                    Enter Your Gender
                </h3>

                <div className="flex gap-4">
                    <label className="cursor-pointer relative">
                        <input 
                            type="radio" 
                            name="gender" 
                            className="sr-only" 
                            checked={selected === 'M'}
                            onChange={() => onChange('M')}
                        />
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold transition-all
                            bg-[#0089ff] hover:bg-[#007ae6]
                            ${selected === 'M' ? 'ring-4 ring-inset ring-white' : 'opacity-70'}
                        `}>
                            M
                        </div>
                    </label>

                    <label className="cursor-pointer relative">
                        <input 
                            type="radio" 
                            name="gender" 
                            className="sr-only" 
                            checked={selected === 'F'}
                            onChange={() => onChange('F')}
                        />
                        <div className={`
                            w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold transition-all
                            bg-[#00c2ff] hover:bg-[#00b0e6]
                            ${selected === 'F' ? 'ring-4 ring-inset ring-white' : 'opacity-70'}
                        `}>
                            F
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}