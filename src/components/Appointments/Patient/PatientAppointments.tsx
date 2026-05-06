"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import { Calendar, Clock, MoreVertical, Bell } from 'lucide-react';
import BackButton from '@/components/Generals/BackButton';
import { apiCall } from '@/lib/apiCall';

export default function PatientAppointments() {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showMenuId, setShowMenuId] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            setIsLoading(true);
            try {
                const response = await apiCall(`/appointments/patient`, "GET");
                const data = response.data || [];

                const now = new Date();
                
                const filteredData = data.filter((apt) => {
                    const appointmentDate = new Date(`${apt.day}T${apt.time}`);

                    if (activeTab === 'upcoming') {
                        return appointmentDate > now;
                    } else {
                        return appointmentDate <= now;
                    }
                });

                const sortedData = filteredData.sort((a, b) => {
                    const dateA = new Date(`${a.day}T${a.time}`);
                    const dateB = new Date(`${b.day}T${b.time}`);
                    return activeTab === 'upcoming' 
                        ? dateA.getTime() - dateB.getTime() 
                        : dateB.getTime() - dateA.getTime();
                });

                setAppointments(sortedData);
            } catch (error) {
                console.error("Failed to fetch appointments:", error);
                setAppointments([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, [activeTab]);

    const handleCancel = async (id) => {
        if (!confirm("Are you sure you want to cancel this appointment?")) return;

        try {
            await apiCall(`/appointments/${id}/cancel`, "DELETE");
            setAppointments(prev => prev.filter(apt => apt.id !== id));
            setShowMenuId(null);
        } catch (error) {
            console.error("Failed to cancel appointment:", error);
            alert("Could not cancel appointment. Please try again.");
        }
    };

    return (
        <main className="w-full min-h-screen bg-white font-nunito flex flex-col relative pb-20">
            
            <div className="flex justify-between items-center px-6 py-6">
                <BackButton />
                <h1 className="text-xl font-extrabold text-slate-900">My Appointments</h1>
                
                <Link href="/notifications" className="relative p-2 bg-slate-50 rounded-full active:scale-95 transition-transform">
                    <Bell size={24} className="text-slate-900" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-pink-500 rounded-full border-2 border-white"></span>
                </Link>
            </div>

            {/* Tabs */}
            <div className="px-6 mb-8">
                <div className="flex p-1 bg-slate-50 rounded-xl">
                    <button 
                        onClick={() => setActiveTab('upcoming')}
                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all
                        ${activeTab === 'upcoming' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                    >
                        Upcoming
                    </button>
                    <button 
                        onClick={() => setActiveTab('past')}
                        className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all
                        ${activeTab === 'past' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
                    >
                        Past
                    </button>
                </div>
            </div>

            {/* Appointments List */}
            <div className="px-6 space-y-6">
                {isLoading ? (
                    <div className="text-center py-20 text-slate-400 font-bold">Loading...</div>
                ) : appointments.length > 0 ? (
                    appointments.map((apt) => (
                        <div key={apt.id} className="relative overflow-hidden group">
                            <div className="bg-[#1DA1F2] p-6 shadow-lg shadow-blue-100 flex flex-col gap-4 relative">
                                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#4ADE80]"></div>

                                <div className="flex justify-between items-start">
                                    <div className="flex flex-col gap-3">
                                        <p className="text-blue-50/80 text-xs font-bold uppercase tracking-wider">
                                            Appointment Details
                                        </p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 text-white">
                                                <Calendar size={18} className="opacity-90" />
                                                <span className="text-sm font-bold">{apt.day}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-white">
                                                <Clock size={18} className="opacity-90" />
                                                <span className="text-sm font-bold">{apt.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="relative">
                                        <button 
                                            onClick={() => setShowMenuId(showMenuId === apt.id ? null : apt.id)}
                                            className="text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                                        >
                                            <MoreVertical size={20} />
                                        </button>
                                        
                                        {showMenuId === apt.id && (
                                            <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-xl z-50 py-1 overflow-hidden">
                                                <button 
                                                    onClick={() => handleCancel(apt.id)}
                                                    className="w-full text-left px-4 py-3 text-sm text-rose-600 font-bold hover:bg-rose-50 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="h-[1px] w-full bg-white/20 my-1"></div>

                                <div className="flex items-center gap-4 pt-1">
                                    <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/30 bg-white">
                                        <Image 
                                            src={apt.doctor_image || "/assets/doctor_male.svg"} 
                                            alt={apt.doctor_name || "Doctor"}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="text-white text-lg font-bold leading-tight">
                                            Dr. {apt.doctor_name}
                                        </h3>
                                        <p className="text-blue-50/70 text-xs font-medium uppercase tracking-wide mt-0.5">
                                            {apt.speciality || "Medical Specialist"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 text-slate-400 font-bold">
                        No {activeTab} appointments found.
                    </div>
                )}
            </div>
        </main>
    );
}