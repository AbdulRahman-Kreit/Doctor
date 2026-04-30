import React from 'react';
import Image from 'next/image';

export default function Header() {
    return (
        <div className='flex flex-row items-center justify-between w-full px-10 pt-10 pb-0 bg-white'>
            <div className="flex flex-col">
                <h3 className="text-xl font-extrabold text-slate-950 tracking-tight">
                    Justin Nguyen
                </h3>
                <p className="text-lg font-medium text-slate-500 mt-1">
                    Male, 18
                </p>
            </div>
            <div className="relative w-22 h-22 rounded-full">
                <Image 
                    src="/assets/ProfilePic.svg" 
                    alt="Doctor Profile" 
                    fill
                    className="object-cover rounded-full"
                />
            </div>
        </div>
    )
}