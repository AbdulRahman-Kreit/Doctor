"use client";
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { apiCall } from '@/lib/apiCall';
import DoctorHeader from './DoctorHeader'; 

interface RateProps {
    id: string; 
    onClose: () => void;
}

export default function Rate({ id, onClose }: RateProps) {
    const [rating, setRating] = useState(2); 
    const [review, setReview] = useState("");

    if (!id || id === "undefined") return null;

    const handleSubmit = async () => {
        try {
            await apiCall(`/rate`, "POST", {
                doctor_id: id,
                rate: rating,
                comment: review
            });
            alert("Thank you for rating!");
            onClose();
        } catch (error: any) {
            alert(error.message || "Rating submission failed!");
        }
    };

    return (
        <div className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/20 backdrop-blur-sm transition-opacity">
            <div className="absolute inset-0" onClick={onClose} />
            
            <div className="relative w-full max-w-md bg-[#1DA1F2] rounded-t-[40px] p-8 flex flex-col items-center shadow-2xl animate-slide-up">
                <div className="w-12 h-1 bg-white/30 rounded-full mb-6" />

                <DoctorHeader id={id} />

                <div className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-6 text-center">
                    <p className="text-white text-sm font-bold mb-3">give us your opinion</p>
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} onClick={() => setRating(star)} className="transition-transform active:scale-125">
                                <Star
                                    size={32}
                                    fill={star <= rating ? "#FFD700" : "#cbd5e1"}
                                    stroke={star <= rating ? "#FFD700" : "#cbd5e1"}
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full mb-8">
                    <label className="text-white text-sm font-bold block mb-2 ml-1 text-left">Write a Review</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="write your review..."
                        className="w-full h-32 bg-white/30 border-none rounded-2xl p-4 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white/50 outline-none resize-none text-sm italic"
                    />
                </div>

                <button 
                    className="w-full bg-white py-4 rounded-xl text-[#1DA1F2] font-black text-xl shadow-lg hover:bg-blue-50 transition-colors active:scale-95"
                    onClick={handleSubmit}
                >
                    submit
                </button>
            </div>

            <style jsx>{`
                .animate-slide-up { animation: slide-up 0.4s ease-out forwards; }
                @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
            `}</style>
        </div>
    );
}