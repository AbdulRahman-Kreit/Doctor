"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
    const router = useRouter();

    return (
        <main className={`relative overflow-hidden bg-white max-w-191.75 
        w-full h-screen mx-auto font-nunito flex flex-col`}>
            {/* Upper decoration */}
            <div className={`absolute top-[-20px] right-0 w-[240px] h-[200px] 
            pointer-events-none z-0`}>
                <Image 
                    src="/assets/Vector_5.svg" 
                    alt="top-decoration" 
                    fill
                    className="object-contain object-right-top"
                />
            </div>

            <div className="relative z-10 flex flex-col flex-1 px-10 pt-10 pb-0">
                {/* Text */}
                <div className="flex-none">
                    <motion.h1 
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold text-slate-900 leading-[1.1] tracking-tight"
                    >
                        Welcome <br /> 
                        to <span className="text-[#0460ea]">D</span>octor !
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mt-6 text-slate-500 text-lg max-w-[280px] font-medium leading-relaxed"
                    >
                        Choose the doctor that you want with our very own booking app
                    </motion.p>
                </div>

                {/* Button & dots */}
                <div className={`flex-none py-12 mt-10 flex flex-col justify-center items-center relative`}>
                    
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1 }}
                        className="absolute flex flex-col gap-5 right-[10%] -top-4 pointer-events-none"
                    >
                        {[1, 2, 3].map((i) => (
                            <div 
                                key={i}
                                className="w-2.5 h-2.5 bg-[#009dff] rounded-full"
                                style={{ 
                                    transform: i === 2 ? 'translateX(10px)' : 'translateX(0px)' 
                                }} 
                            />
                        ))}
                    </motion.div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20}}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <Button 
                            onClick={() => router.push('/description')}
                            className={`bg-[#0089ff] hover:bg-[#0076db] text-white 
                            px-12 py-6 rounded-[2rem] text-xl font-bold shadow-[0_15px_30px_rgba(0,137,255,0.3)] cursor-pointer relative z-10`}
                        >
                            Get Started
                        </Button>
                    </motion.div>
                </div>
                
                {/* Lower Section -  */}
                <div className="relative flex-1 w-full flex flex-col justify-center items-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                        className="relative z-20 flex justify-center items-center"
                    >
                        <div className="relative w-[220px] h-[220px] bottom-16">
                            <Image 
                                src="/assets/doctor_and_child.svg" 
                                alt="Doctor and Child" 
                                fill 
                                className="object-contain"
                            />
                        </div>
                    </motion.div>

                    <div className="absolute bottom-[-40px] left-[-2.5rem] right-[-2.5rem] w-[calc(100%+5rem)] h-[150px] z-10">
                        <Image 
                            src="/assets/Vector_3.svg" 
                            alt="bottom-decoration" 
                            fill
                            className="object-fill" 
                            priority
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}