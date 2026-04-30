import React from 'react';

interface ConfirmButtonProps {
    onClick: () => void;
}

export default function ConfirmButton({ onClick }: ConfirmButtonProps) {
    return (
        <div className="p-6 bg-white/80 backdrop-blur-md mt-5">
        <button 
            onClick={onClick}
            className="w-full bg-linear-to-r from-[#27b9ff] to-[#0a96ff] text-white font-extrabold text-lg py-5 rounded-2xl shadow-lg shadow-blue-100 active:scale-95 transition-all cursor-pointer"
        >
            Confirm Booking
        </button>
        </div>
    );
};
