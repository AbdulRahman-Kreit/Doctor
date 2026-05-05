"use client";
import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { apiCall } from '@/lib/apiCall'; 

interface Specialty {
    id: number;
    name: string;
}

interface SpecialtyDropdownProps {
    selected: string;
    onSelect: (specialty: Specialty) => void; 
}

export default function SpecialtyDropdown({ selected, onSelect }: SpecialtyDropdownProps) {
    const [specialties, setSpecialties] = useState<Specialty[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSpecialties = async () => {
            try {
                setIsLoading(true);
                const data = await apiCall("/specialities");
                
                if (Array.isArray(data)) {
                    setSpecialties(data);
                }
            } catch (error) {
                console.error("Failed to load specialties:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpecialties();
    }, []);

    return (
        <div className="w-full flex flex-col gap-2 relative">
            <label className="font-bold text-lg text-slate-900 ml-1 capitalize">Specialty</label>
            
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full py-4 px-6 rounded-2xl bg-[#f4f4f4] border-2 border-[#d3d3d3] 
                flex items-center justify-between hover:border-[#0089ff] transition-all focus:border-[#0089ff]"
            >
                <span className={`font-medium ${!selected || selected === "Select Specialty" ? "text-slate-500" : "text-slate-900"}`}>
                    {isLoading ? "Loading..." : (selected || "Select Specialty")}
                </span>
                <ChevronDown size={24} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute top-[105%] left-0 w-full bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="max-h-[300px] overflow-y-auto">
                        {specialties.length > 0 ? (
                            specialties.map((item, index) => (
                                <div key={item.id}>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            onSelect(item); 
                                            setIsOpen(false);
                                        }}
                                        className={`w-full py-4 px-6 text-center font-medium transition-colors
                                        ${selected === item.name ? "bg-[#0089ff] text-white" : "text-slate-700 hover:bg-slate-50"}`}
                                    >
                                        {item.name}
                                    </button>

                                    {index !== specialties.length - 1 && (
                                        <div className="mx-6 border-b border-black opacity-10" />
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="p-4 text-center text-slate-500">No Specialties</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}