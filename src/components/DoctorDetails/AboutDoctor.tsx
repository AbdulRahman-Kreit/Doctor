"use client";
import React, { useState } from 'react';

interface AboutDoctorProps {
    name: string;
    specialty: string;
    description?: string;
}

export default function AboutDoctor({ name, specialty, description }: AboutDoctorProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    const fullText = description || `${name} is the top most ${specialty.toLowerCase()} with the experience of more than 10 years. She has received several awards for her wonderful contribution in the field of medicine. She is highly skilled in advanced diagnostic procedures and has a proven track record of successful patient outcomes in complex cases.`;

    const displayedText = isExpanded ? fullText : `${fullText.slice(0, 140)}...`;

    return (
        <div className="px-8 mt-10">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">
                About the doctor
            </h3>
            <p className="text-slate-500 text-[15px] mt-3 leading-[1.6] font-medium transition-all duration-300">
                {displayedText}
                <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#0089ff] font-bold ml-1 hover:underline focus:outline-none inline-block"
                >
                    {isExpanded ? " Show Less" : " Read More. . ."}
                </button>
            </p>
        </div>
    );
}