"use client";
import React from 'react';
import { Bell, Clock, Calendar } from 'lucide-react';
import Image from 'next/image';

export default function AppointmentAlertCard({ apt }) {
    return (
        <div className="relative overflow-hidden rounded-2xl shadow-lg shadow-blue-100 group transition-transform active:scale-[0.98]">
            <div className="bg-gradient-to-br from-[#1DA1F2] to-[#0077b5] p-5 flex flex-col gap-3 relative">
                
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#4ADE80]"></div>

                <div className="flex items-center gap-2 text-blue-50 mb-1">
                    <Bell size={16} className="animate-bounce" />
                    <span className="text-[10px] font-black uppercase tracking-wider opacity-90">Urgent: Starting Soon</span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-sm bg-white shrink-0">
                        <Image 
                            src={apt.doctor_image || "/assets/doctor-image.jpg"} 
                            alt={apt.doctor_name}
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h3 className="text-white text-sm font-bold leading-tight">
                            Dr. {apt.doctor_name}
                        </h3>
                        <p className="text-blue-100 text-[10px] font-medium uppercase opacity-80">
                            {apt.specialization || "Medical Specialist"}
                        </p>
                    </div>
                </div>

                <div className="h-[1px] w-full bg-white/10 my-1"></div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-blue-50">
                        <Calendar size={14} className="opacity-80" />
                        <span className="text-[11px] font-bold">{apt.day}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-blue-50">
                        <Clock size={14} className="opacity-80" />
                        <span className="text-[11px] font-bold">{apt.time}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}