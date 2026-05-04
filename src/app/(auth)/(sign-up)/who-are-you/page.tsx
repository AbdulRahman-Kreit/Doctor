"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function WhoAreYou() {
    const router = useRouter();

    const cardStyle = `relative flex flex-col items-center justify-center w-40 h-75 
    rounded-2xl cursor-pointer shadow-lg transition-all duration-300`;

    return (
        <main className="relative overflow-hidden bg-white max-w-191.75 w-full h-screen mx-auto font-nunito flex flex-col">
            {/* Top decoration */}
            <div className="absolute top-[-40px] left-0 w-full h-[150px] z-0">
                <Image src="/assets/Vector_1.svg" alt="top-decoration" fill className="object-contain" priority />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
                
                {/* Title */}
                <motion.h2 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl text-slate-600 font-bold mb-12"
                >
                    Who Are You <span className="text-[#0460ea]">?</span>
                </motion.h2>

                {/* Cards Container */}
                <div className="flex flex-row items-center justify-center gap-2 w-full">
                    {/* Doctor Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
                        whileHover={{ scale: 1.05, translateY: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="drop-shadow-lg">
                        <Button 
                            onClick={() => router.push('/doctor-sign-up?type=doctor')}
                            className={`${cardStyle} bg-linear-to-t from-[#17a5ff] 
                            to-[#24b5ff]`}
                        >
                            <div className="relative w-24 h-40 mb-2">
                                <Image src="/assets/doctor.svg" alt="Doctor" fill className="object-contain p-2" />
                            </div>
                            <h3 className='text-white text-xl font-semibold'>
                                Doctor
                            </h3>
                        </Button>
                    </motion.div>

                    {/* Patient Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, type: "spring" }}
                        whileHover={{ scale: 1.05, translateY: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="drop-shadow-lg">
                        <Button 
                            onClick={() => router.push('/patient-sign-up?type=patient')}
                            className={`${cardStyle} bg-white border-2 border-[#0089ff]`}
                        >
                            <div className="relative w-24 h-40 mb-2">
                                <Image src="/assets/patient.svg" alt="Patient" fill className="object-contain p-2" />
                            </div>
                            <h3 className='text-[#0089ff] text-xl font-semibold'>
                                Patient
                            </h3>
                        </Button>
                    </motion.div>
                </div>
            </div>
            

            {/* Bottom decoration */}
            <div className="absolute -bottom-[40px] left-0 w-full h-[150px] z-0">
                <Image src="/assets/Vector_3.svg" alt="bottom-decoration" fill className="object-contain" />
            </div>
        </main>
    );
}