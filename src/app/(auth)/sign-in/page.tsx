import React from 'react';
import Image from 'next/image';
import SigninInputs from '@/components/SignIn/SigninInputs';

export default function SignIn() {
    
    return (
        <main className={`relative overflow-hidden bg-white max-w-191.75 
        w-full h-screen mx-auto font-nunito flex flex-col`}>
            <div className={`absolute top-[-60px] left-0 w-full h-[150px]`}>
                <Image 
                    src="/assets/Vector_4.svg" 
                    alt="top-decoration" 
                    fill
                    className="object-contain"
                />
            </div>
            <div className={`relative z-10 w-full px-6 pt-24 text-center`}>
                {/* Text */}
                <h2 className='text-3xl font-extrabold text-[#0089ff]'>
                    Welcome Back
                </h2>
                {/* Inputs */}
                <SigninInputs />
            </div>
            {/* Bottom decoration */}
            <div className={`absolute -bottom-[60px] left-0 w-full h-[150px]`}>
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
