"use client";
import { useRouter, useSearchParams } from 'next/navigation';

interface BookingButtonProps {
    doctorId: string;
    doctorName: string;
    doctorImage: string;    
    specialty: string;     
}

export default function BookingButton({ doctorId, doctorName, doctorImage, specialty }: BookingButtonProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleBooking = () => {
        const date = searchParams.get('date');
        const time = searchParams.get('time');

        if (!date || !time) {
            alert("Please Select Date & Time first");
            return;
        }

        const query = new URLSearchParams({
            id: doctorId,
            name: doctorName,
            image: doctorImage,
            specialty: specialty,
            date: date,
            time: time
        }).toString();

        router.push(`/confirm_booking?${query}`);
    };

    return (
        <div className="px-6 mt-12 pb-10">
            <button 
                onClick={handleBooking}
                className="w-full bg-linear-to-r from-[#27b9ff] to-[#0a96ff] text-white font-extrabold text-lg py-5 rounded-2xl shadow-lg shadow-blue-100 active:scale-[0.98] transition-all cursor-pointer"
            >
                Book an Appointment
            </button>
        </div>
    );
}