"use client";
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

export default function ServicesSlider() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    
    const services = [
        { id: 'Health_check-up', name: 'Health Check-ups' },
        { id: 'Sick_Care', name: 'Sick Care' },
        { id: 'Health_Advise', name: 'Health Advice' }
    ];

    const selectedServiceId = searchParams.get('service_type') || 'Health_Advise';

    const handleServiceSelect = (serviceId: string, serviceName: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('service_type', serviceId);
        params.set('service_name', serviceName); // إضافة اسم الخدمة للرابط
    
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <section className="w-full mt-10 overflow-hidden font-nunito">
            <h3 className="px-6 text-xl font-black text-slate-900 tracking-tight">
                Services provided
            </h3>

            <div 
                className="w-full overflow-x-auto pb-6 pt-6 scrollbar-hide touch-pan-x"
                style={{ display: 'block', whiteSpace: 'nowrap', WebkitOverflowScrolling: 'touch' }}
            >
                <div className="flex gap-4 px-6">
                    {services.map((service) => {
                        const isSelected = selectedServiceId === service.id;

                        return (
                            <button
                                key={service.id}
                                type="button"
                                onClick={() => handleServiceSelect(service.id, service.name)}
                                className={`flex flex-col items-start justify-between p-6 w-[145px] min-w-[145px] h-[155px] rounded-[30px] border-2 transition-all duration-300 flex-shrink-0 cursor-pointer
                                ${isSelected 
                                    ? 'bg-white border-[#0089ff] shadow-lg shadow-blue-100 scale-[1.02]' 
                                    : 'bg-white border-slate-100 hover:border-blue-100' 
                                }`}
                            >
                                <CheckCircle2 
                                    size={28} 
                                    className={isSelected ? 'text-[#0089ff]' : 'text-slate-200'} 
                                />
                                
                                <span className={`text-left text-[15px] font-extrabold leading-tight whitespace-normal
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