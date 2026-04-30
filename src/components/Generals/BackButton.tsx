"use client";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function BackButton() {
    const router = useRouter();

    return (
        <button 
            onClick={() => router.back()}
            className={`border-2 border-slate-500 bg-white duration-200 
            hover:bg-[#0089ff] hover:border-[#0089ff] p-3 rounded-2xl shadow-lg
            shadow-blue-200 active:scale-90 transition-all cursor-pointer group`}
        >
            <ArrowLeft className="text-slate-500 group-hover:text-white" size={26} strokeWidth={3} />
        </button>
    );
}