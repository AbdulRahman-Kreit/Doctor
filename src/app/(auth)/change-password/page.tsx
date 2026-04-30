import React from 'react';
import Image from 'next/image';
import ChangePasswordInput from '@/components/ChangePassword/ChangePasswordInput';

export default function ChangePassword() {
    return (
        <main className="relative overflow-x-hidden bg-white max-w-[767px] w-full min-h-screen mx-auto font-nunito flex flex-col">
            
            {/* Top decoration */}
            <div className="absolute top-[-50px] left-0 w-full h-[150px] pointer-events-none">
                <Image 
                    src="/assets/Vector_4.svg" 
                    alt="top-decoration" 
                    fill
                    priority
                    className="object-fill object-top"
                />
            </div>
        
            {/* Main Content Container */}
            <div className="relative z-10 w-full px-10 pt-30 pb-20 text-left flex-grow">
                <h2 className="text-[44px] leading-tight font-[900] text-[#0089ff] mb-8">
                    Change <br /> password
                </h2>
                
                <ChangePasswordInput />
            </div>
        
            {/* Bottom decoration */}
            <div className="absolute bottom-[-80px] left-0 w-full h-[150px] pointer-events-none">
                <Image 
                    src="/assets/Vector_2.svg" 
                    alt="bottom-decoration" 
                    fill
                    className="object-fill object-bottom"
                />
            </div>
        </main>
    )
}
