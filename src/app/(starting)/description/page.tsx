"use client";
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function DescriptionPage() {
    const router = useRouter();

    return (
        <main className={`relative overflow-hidden bg-white max-w-191.75 
        w-full h-screen mx-auto font-nunito flex flex-col`}>
            <div className="absolute top-[-40px] left-0 w-full h-[150px]">
                <Image 
                    src="/assets/Vector_4.svg" 
                    alt="top-decoration" 
                    fill
                    className="object-contain"
                />
            </div>
            <div className={`flex flex-col items-center justify-center absolute w-full
                top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 px-6 text-center`}>
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-[220px] h-[220px] relative mb-4">
                    <Image 
                        src="/assets/doctors.svg" 
                        alt="doctors" 
                        fill
                        className='object-contain'
                />
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="w-7/10">
                    <p className="text-md text-slate-600 font-bold leading-relaxed">
                        Finding available appointments are <span className="text-[#0460ea]">Simple</span> & <span className="text-[#0460ea]">Effortless</span>
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    >
                    <Button onClick={() => router.push('/signed-up-or-not')}
                        className={`bg-[#0089ff] hover:bg-[#0076db] text-white px-12 
                        py-6 rounded-[2rem] text-xl font-bold cursor-pointer relative z-10
                        shadow-[0_15px_30px_rgba(0,137,255,0.3)] mt-10`}>
                        Next
                    </Button>
                </motion.div>
                
            </div>
            {/* Bottom decoration */}
            <div className="absolute -bottom-[40px] left-0 w-full h-[150px]">
                <Image 
                    src="/assets/Vector_2.svg" 
                    alt="bottom-decoration" 
                    fill
                    className="object-contain"
                />
            </div>
        </main>
    )
}
