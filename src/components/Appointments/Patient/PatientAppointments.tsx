"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; 
import { Calendar, Clock, MoreVertical, Bell } from 'lucide-react';
import BackButton from '@/components/Generals/BackButton';
import { apiCall } from '@/lib/apiCall';

export default function PatientAppointments() {
    const [activeTab, setActiveTab] = useState('upcoming');
    const [appointments, setAppointments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showMenuId, setShowMenuId] = useState(null);

    useEffect(() => {
        const fetchAppointments = async () => {
            setIsLoading(true);
            try {
                const response = await apiCall(`appointments/patient`, "GET");
                const data = response.data || [];

                const now = new Date();
                
                const filteredData = data.filter((apt) => {
                    const appointmentDate = new Date(`${apt.day}T${apt.time}`);

                    if (activeTab === 'upcoming') {
                        return appointmentDate > now && apt.acceptence_status !== 'cancelled';
                    } else {
                        return appointmentDate <= now || apt.acceptence_status === 'cancelled';
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
            } finally {
                setIsLoading(false);
            }
        };

        fetchAppointments();
    }, [activeTab]);

    return (
        <main className="w-full min-h-screen bg-slate-50 font-sans pb-24">
            {/* Header */}
            <div className="bg-blue-600 rounded-b-[40px] p-6 pt-12 pb-10 mb-10 relative overflow-hidden shadow-lg shadow-blue-100">
                <div className="flex items-center justify-between relative z-10">
                    <BackButton />
                    <h1 className="text-xl font-bold text-white">My Appointments</h1>
                    <Link href="/notifications" className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white backdrop-blur-md hover:bg-white/20 transition-colors">
                        <Bell size={20} />
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="px-6 -mt-8">
                <div className="bg-white rounded-2xl p-1.5 shadow-md border border-slate-100 flex gap-1">
                    <button 
                        onClick={() => setActiveTab('upcoming')}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'upcoming' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Upcoming
                    </button>
                    <button 
                        onClick={() => setActiveTab('past')}
                        className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${activeTab === 'past' ? 'bg-blue-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                        Past / Cancelled
                    </button>
                </div>
            </div>

            {/* List */}
            <div className="px-6 mt-6 space-y-4">
                {isLoading ? (
                    <div className="text-center py-20 text-slate-400 font-bold animate-pulse">
                        Loading appointments...
                    </div>
                ) : appointments.length > 0 ? (
                    appointments.map((apt) => (
                        <div key={apt.id} className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden group">
                            <div className="p-5">
                                <div className="flex items-center justify-between border-b border-slate-50 pb-4 mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                            <Calendar size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Date</p>
                                            <p className="text-sm font-bold text-slate-700">{apt.day}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                                            <Clock size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">Time</p>
                                            <p className="text-sm font-bold text-slate-700">{apt.time}</p>
                                        </div>
                                    </div>
                                    <div className="relative">
                                        <button onClick={() => setShowMenuId(showMenuId === apt.id ? null : apt.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-50">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden shadow-sm">
                                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-white/5 rounded-l-full pointer-events-none"></div>
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