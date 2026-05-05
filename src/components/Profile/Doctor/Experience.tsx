import React from 'react';

interface ExperienceProps {
    selectedYear: number;
    onChange: (year: number) => void;
}

export default function Experience({ selectedYear, onChange }: ExperienceProps) {
    const ages = Array.from({ length: 5 }, (_, i) => selectedYear - 2 + i);

    return (
        <div className="flex flex-col items-center gap-3 w-full">
            <h3 className="text-slate-950 text-xl font-bold">Years of Experience</h3>
            <div className="flex items-center justify-between w-full max-w-[320px] px-6 py-3 rounded-full border-2 border-[#0089ff] bg-white">
                {ages.map((year) => (
                    <button
                        key={year}
                        type="button"
                        onClick={() => onChange(year)}
                        className={`transition-all duration-300 ${
                            year === selectedYear 
                            ? "text-[28px] font-black text-slate-900" 
                            : "text-lg font-medium text-slate-400 opacity-60"
                        }`}
                    >
                        {year >= 1 ? year : ""}
                    </button>
                ))}
            </div>
        </div>
    );
}
