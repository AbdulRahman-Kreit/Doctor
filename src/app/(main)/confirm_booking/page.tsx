"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { Star, MoreVertical, Calendar, Clock, Ticket } from 'lucide-react';
import BackButton from '@/components/Generals/BackButton';
import ConfirmButton from '@/components/ConfirmBooking/ConfirmButton';
import BookingSuccessPopup from '@/components/ConfirmBooking/BookingSuccessPopup';

export default function ConfirmBooking() {
    const searchParams = useSearchParams();
    
    // استخراج البيانات القادمة من الصفحة السابقة
    const doctorName = searchParams.get('name') || "Doctor Name";
    const doctorImage = searchParams.get('image') || "/assets/doctor-image.jpg";
    const specialty = searchParams.get('specialty') || "Specialist";
    const selectedDate = searchParams.get('date') || "Wed, 14 Oct";
    const selectedTime = searchParams.get('time') || "12:30 PM";

    const [paymentMethod, setPaymentMethod] = useState('clinic');
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <main className="w-full min-h-screen bg-white font-nunito flex flex-col pb-5 relative">
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-6">
                <BackButton />
                <h1 className="text-lg font-extrabold text-slate-900">Confirm Booking</h1>
                <button className="p-2"><MoreVertical size={24} className="text-slate-900" /></button>
            </div>

            <div className="flex-1 overflow-y-auto pb-40">
                {/* Doctor Card UI - المحافظة على التصميم الدقيق */}
                <div className="px-6 relative mb-8">
                    <div className="relative w-full h-[320px] rounded-3xl overflow-hidden shadow-md bg-slate-100 border border-slate-50">
                        <Image 
                            src={doctorImage} 
                            alt={doctorName}
                            fill
                            className="object-contain pt-4" 
                        />
                        
                        <div className="absolute bottom-0 left-0 right-0 bg-linear-to-r from-[#27b9ff] to-[#0a96ff] p-6 flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <h2 className="text-white text-xl font-bold leading-none tracking-tight">
                                    {doctorName}
                                </h2>
                                <p className="text-blue-50 text-sm font-medium opacity-90">
                                    {specialty} | Max Hospital
                                </p>
                            </div>

                            <div className="flex items-center gap-1.5 mt-1"> 
                                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                                <span className="text-white font-bold text-sm tracking-tight">
                                    4.9 (562 reviews)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6">
                    <div className="bg-[#e1f7e6] border border-green-500 p-3 rounded-sm mb-8 text-center text-green-500 text-sm font-bold shadow-sm">
                        The duration of the consultation is 1 hour.
                    </div>

                    {/* Appointment Details */}
                    <div className="mb-8">
                        <h3 className="text-slate-900 font-black text-sm uppercase tracking-wider mb-4">Appointment Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-slate-600 font-bold text-sm">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Calendar size={20} /></div>
                                <span>{selectedDate}</span>
                            </div>
                            <div className="flex items-center gap-4 text-slate-600 font-bold text-sm">
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400"><Clock size={20} /></div>
                                <span>{selectedTime}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bill Details */}
                    <div className="mb-8">
                        <h3 className="text-slate-900 font-black text-sm uppercase tracking-wider mb-4">Bill Details</h3>
                        <div className="space-y-3 text-sm font-bold">
                            <div className="flex justify-between"><span className="text-slate-400">Consultation Fee</span><span className="text-slate-700">$ 1,000</span></div>
                            <div className="flex justify-between">
                                <span className="text-slate-400">Service fee & Tax</span>
                                <div className="flex gap-2"><span className="text-slate-300 line-through">$ 69</span><span className="text-green-500">Free</span></div>
                            </div>
                        </div>
                    </div>

                    {/* Coupon Section */}
                    <div className="border border-slate-100 rounded-2xl p-4 flex items-center justify-between mb-8 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Ticket className="text-blue-500 rotate-45" />
                            <div>
                                <p className="text-sm font-black text-slate-800">Apply Coupon</p>
                                <p className="text-[10px] text-slate-400 font-bold">Save more with coupon codes</p>
                            </div>
                        </div>
                        <button className="text-blue-500 font-black text-sm">Apply</button>
                    </div>

                    {/* Total Section */}
                    <div className="flex justify-between items-center mb-6 text-slate-900 font-black">
                        <span>Total Payable</span><span className="text-xl">$ 1,000</span>
                    </div>

                    {/* Payment Methods */}
                    <div className="mb-8 space-y-4">
                        <div 
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setPaymentMethod('clinic')}
                        >
                            <span className="text-slate-500 font-bold text-lg">Pay at Clinic</span>
                            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center 
                                ${paymentMethod === 'clinic' ? 'border-[#27b9ff]' : 'border-slate-500' }`}>
                                {paymentMethod === 'clinic' && <div className="w-3.5 h-3.5 bg-[#27b9ff] rounded-full"></div>}
                            </div>
                        </div>

                        <div 
                            className="flex justify-between items-center cursor-pointer"
                            onClick={() => setPaymentMethod('online')}
                        >
                            <span className="text-slate-500 font-bold text-lg">Pay Online</span>
                            <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center 
                                ${paymentMethod === 'online' ? 'border-[#27b9ff]' : 'border-slate-500' }`}>
                                {paymentMethod === 'online' && <div className="w-3.5 h-3.5 bg-[#27b9ff] rounded-full"></div>}
                            </div>
                        </div>
                    </div>

                    <ConfirmButton onClick={() => setIsSuccess(true)} />
                </div>
            </div>

            {/* Success Popup */}
            {isSuccess && (
                <BookingSuccessPopup 
                    doctorName={doctorName} 
                    onClose={() => setIsSuccess(false)} 
                />
            )}
        </main>
    );
}