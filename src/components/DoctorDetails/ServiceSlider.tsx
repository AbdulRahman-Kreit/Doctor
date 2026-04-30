"use client";
import React, { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const services = [
    { id: 'checks', name: 'Health Check-ups' },
    { id: 'sick', name: 'Sick Care' },
    { id: 'advice', name: 'Health Advice' },
    { id: 'follow', name: 'Follow-up' }, 
];

export default function ServicesSlider() {
    const [selectedService, setSelectedService] = useState('sick');

    return (
        <section className="w-full mt-10 overflow-hidden">
            <h3 className="px-6 text-xl font-black text-slate-900">
                Services provided
            </h3>

            <div 
                className="w-full overflow-x-auto pb-4 pt-6 scrollbar-hide touch-pan-x"
                style={{ display: 'block', whiteSpace: 'nowrap', WebkitOverflowScrolling: 'touch' }}
            >
                <div className="flex gap-4 px-6">
                    {services.map((service) => {
                        const isSelected = selectedService === service.id;

                        return (
                            <button
                                key={service.id}
                                type="button"
                                onClick={() => setSelectedService(service.id)}
                                className={`flex flex-col items-start justify-between p-6 w-[145px] min-w-[145px] h-[155px] rounded-[30px] border-2 transition-all duration-300 flex-shrink-0
                                ${isSelected 
                                    ? 'bg-white border-[#0089ff] shadow-lg shadow-blue-100' 
                                    : 'bg-white border-slate-100' 
                                }`}
                            >
                                <CheckCircle2 
                                    size={28} 
                                    className={isSelected ? 'text-[#0089ff]' : 'text-slate-300'} 
                                />
                                
                                <span className={`text-left text-[15px] font-bold leading-tight whitespace-normal
                                ${isSelected ? 'text-[#0089ff]' : 'text-slate-600'}`}>
                                    {service.name}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}