"use client";
import React, { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const timeSlots = ["09:00 AM", "09:30 AM", "10:00 AM", "12:00 PM", "12:30 PM"];

export default function TimeSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentTime = searchParams.get('time') || "12:30 PM";
    const [selectedTime, setSelectedTime] = useState(currentTime);

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        const params = new URLSearchParams(searchParams);
        params.set('time', time);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <section className="w-full px-8 mt-10">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-6">Available Time</h3>
            <div className="grid grid-cols-3 gap-4">
                {timeSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                        <button
                            key={time}
                            type="button"
                            onClick={() => handleTimeSelect(time)}
                            className={`py-4 px-2 rounded-[18px] border text-sm font-bold transition-all duration-300 active:scale-95 cursor-pointer
                            ${isSelected 
                                ? 'bg-[#0089ff] border-[#0089ff] text-white shadow-lg shadow-blue-200' 
                                : 'bg-white border-slate-100 text-slate-500 hover:border-blue-100'
                            }`}
                        >
                            {time}
                        </button>
                    );
                })}
            </div>
        </section>
    );
}