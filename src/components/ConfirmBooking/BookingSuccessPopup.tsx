import React from 'react';
import { Check } from 'lucide-react';

interface PopupProps {
    doctorName: string;
    onClose: () => void;
}

export default function BookingSuccessPopup({ doctorName, onClose }: PopupProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-6">
            <div className="bg-white w-full max-w-sm rounded-[32px] p-8 flex flex-col items-center text-center shadow-2xl">
                <div className="w-24 h-24 bg-[#e8fbf3] rounded-full flex items-center justify-center mb-6">
                    <div className="w-16 h-16 bg-[#00d07d] rounded-full flex items-center justify-center">
                        <Check size={32} className="text-white stroke-[4px]" />
                    </div>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mb-2">
                    Booking Successful
                </h2>
                <p className="text-slate-400 font-medium text-sm mb-8">
                    Appointment Confirmed with {doctorName}.
                </p>
                <button onClick={onClose} className={`w-full bg-linear-to-r from-[#27b9ff] 
                    to-[#0a96ff] text-white font-extrabold text-lg py-4 rounded-xl 
                    cursor-pointer`}>
                    Done
                </button>
            </div>
        </div>
    );
};
