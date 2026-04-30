"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/welcome');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className={`flex flex-col justify-center items-center max-w-191.75
    w-full h-screen mx-auto bg-linear-to-t from-[#48aaff] to-[#daedfe]`}>
      
      <div className='flex flex-col justify-center items-center '>
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-7xl font-bold text-center font-nunito text-white mb-2`}
        >
          <span className="text-[#0460ea]">D</span>octor
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Image 
            src="/assets/doctor_logo.svg"
            alt="Doctor"
            width={120}
            height={80}
          />
        </motion.div>
      </div>
    </main>
  );
}