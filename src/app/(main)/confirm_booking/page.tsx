"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { Star, MoreVertical, Calendar, Clock, Stethoscope } from 'lucide-react';
import BackButton from '@/components/Generals/BackButton';
import ConfirmButton from '@/components/ConfirmBooking/ConfirmButton';
import BookingSuccessPopup from '@/components/ConfirmBooking/BookingSuccessPopup';
import { apiCall } from '@/lib/apiCall';

export default function ConfirmBooking() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const doctorId = searchParams.get('id') || "1";
    const doctorName = searchParams.get('name') || "Doctor Name";
    const doctorImage = searchParams.get('image') || "/assets/doctor-image.jpg";
    const specialty = searchParams.get('specialty') || "Specialist";
    const selectedDate = searchParams.get('date') || "2026-05-10";
    const selectedTime = searchParams.get('time') || "12:30";
    const selectedService = searchParams.get('service_name') || "Health_Advise";

    const [paymentMethod, setPaymentMethod] = useState('clinic');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            const response = await apiCall(`/appointments?day=${selectedDate}&time=${selectedTime}&doctor_id=${doctorId}&service_name=${selectedService}`, 'POST');
            
            if (response.data) {
                await apiCall(`notifications`, 'POST', {
                    appointment_id: response.data.id,
                    title: "Appointment Pending",
                    message: "Your appointment is waiting to be accepted by the doctor.",
                    type: "info"
                });
                
                setIsSuccess(true);
            }
        } catch (error) {
            console.error("Booking confirmation failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="w-full min-h-screen bg-slate-50 font-sans pb-10">
            {/* Header */}
            <div className="relative flex items-center justify-center gap-4 px-6 pb-6 pt-10 border-b border-slate-100 bg-white">
                <div className="absolute left-6">
                    <BackButton />
                </div>
                <h1 className="text-xl text-center font-bold text-slate-800">Confirm Booking</h1>
                <div className="absolute right-6 text-slate-400 cursor-pointer">
                    <MoreVertical size={20} />
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Doctor Card */}
                <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs flex gap-4">
                    <div className="relative w-24 h-24 rounded-2xl bg-slate-50 overflow-hidden border border-slate-100 shrink-0">
                        <Image src={doctorImage} alt={doctorName} fill className="object-cover" />
                    </div>
                    <div className="flex flex-col justify-center flex-1">
                        <div className="flex items-center gap-1 text-amber-400 text-xs font-bold mb-1">
                            <Star size={14} fill="currentColor" />
                            <span>4.8 (4,279 reviews)</span>
                        </div>
                        <h2 className="text-lg font-bold text-slate-800 leading-tight">Dr. {doctorName}</h2>
                        <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold mt-1">
                            <Stethoscope size={14} className="text-blue-400" />
                            <span>{specialty}</span>
                        </div>
                    </div>
                </div>

                {/* Booking Details */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                <Calendar size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-semibold">Date</p>
                                <p className="text-sm font-bold text-slate-700">{selectedDate}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                <Clock size={18} />
                            </div>
                            <div>
                                <p className="text-xs text-slate-400 font-semibold">Time</p>
                                <p className="text-sm font-bold text-slate-700">{selectedTime}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Method */}
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
                    <h3 className="font-bold text-slate-800 text-base">Payment Method</h3>
                    
                    <div className="space-y-3">
                        <div 
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setPaymentMethod('clinic')}
                        >
                            <span className="text-slate-500 font-bold text-lg">Pay at Clinic</span>
                            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center \r
                                ${paymentMethod === 'clinic' ? 'border-[#27b9ff]' : 'border-slate-500' }`}>
                                {paymentMethod === 'clinic' && <div className="w-3.5 h-3.5 bg-[#27b9ff] rounded-full"></div>}
                            </div>
                        </div>

                        <div 
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setPaymentMethod('online')}
                        >
                            <span className="text-slate-500 font-bold text-lg">Pay Online</span>
                            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center \r
                                ${paymentMethod === 'online' ? 'border-[#27b9ff]' : 'border-slate-500' }`}>
                                {paymentMethod === 'online' && <div className="w-3.5 h-3.5 bg-[#27b9ff] rounded-full"></div>}
                            </div>
                        </div>
                    </div>

                    <ConfirmButton onClick={handleConfirm} disabled={isLoading} />
                </div>
            </div>

            {/* Success Popup */}
            {isSuccess && (
                <BookingSuccessPopup 
                    doctorName={doctorName} 
                    onClose={() => {
                        setIsSuccess(false);
                        router.push('/appointments/patient');
                    }} 
                />
            )}
        </main>
    );
}