"use client";
import React, { useState } from 'react';
import { Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Rate from '../Rate/Rate';

interface DoctorProps {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    patients: number;
    image: string;
}

export default function DoctorCard({ id, name, specialty, rating, image }: DoctorProps) {
    const [isRateOpen, setIsRateOpen] = useState(false);

    return (
        <div className="flex flex-col items-center w-full max-w-[175px] mt-8">
            <div className="relative w-[145px] h-[135px] bg-[#0089ff] rounded-[60px] z-10 flex items-end justify-center mb-[-60px] shadow-lg">
                <div className="relative w-full h-full flex justify-center items-end">
                    <Image
                        src={image} 
                        alt={name}
                        width={160} 
                        height={160}
                        className="object-contain absolute bottom-0 scale-125 origin-bottom" 
                    />
                </div>
            </div>

            <div className="bg-[#eefaff] pt-[70px] pb-6 px-4 rounded-[65px] w-full flex flex-col items-center shadow-sm border border-white/40">
                <h3 className="font-bold text-[16px] text-slate-900 text-center leading-tight">
                    Dr. {name}
                </h3>
                <p className="text-[#0089ff] text-[11px] font-semibold mt-1">
                    {specialty}
                </p>
                
                <div className="flex items-center justify-between w-full max-w-[100px] mt-4">
                    <div 
                        className="flex items-center gap-1 cursor-pointer hover:opacity-80"
                        onClick={() => setIsRateOpen(true)}
                    >
                        <Star size={14} className="fill-[#0089ff] text-[#0089ff]" />
                        <span className="text-[12px] font-black text-slate-500">{rating.toFixed(1)}</span>
                    </div>

                    <Link href={`/doctors/${id}`}>
                        <div className="cursor-pointer hover:scale-110 transition-transform">
                            <ArrowRight size={22} className="text-[#0089ff] stroke-[3.5px]" />
                        </div>
                    </Link>
                </div>
            </div>

            {isRateOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                    <div className="relative">
                        <button 
                            onClick={() => setIsRateOpen(false)}
                            className="absolute top-4 right-4 text-white font-bold z-50 bg-white/20 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            ✕
                        </button>
                        <Rate id={id} onClose={() => setIsRateOpen(false)} />
                    </div>
                </div>
            )}
        </div>
    );
}