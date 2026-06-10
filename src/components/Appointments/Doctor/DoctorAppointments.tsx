/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle2, XCircle, User } from 'lucide-react';
import { apiCall } from '@/lib/apiCall'; 
import { useRouter } from 'next/navigation';

export default function DoctorAppointments() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Pending');
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [doctorName, setDoctorName] = useState(""); 

    const getStatusStyles = (status: string) => {
        if (status === 'accepted') return 'bg-green-50 text-green-500 border-green-100';
        if (status === 'cancelled' || status === 'cancelled') return 'bg-rose-50 text-rose-500 border-rose-100';
        return 'bg-blue-50 text-blue-400 border-blue-100';
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiCall('auth/me', 'GET');
                
                if (response.data && response.data.user) {
                    const user = response.data.user;
                    setDoctorName(user.name);

                    let queryType = "upcoming";
                    let acceptanceStatus = "";

                    if (activeTab === 'Pending') {
                        queryType = "upcoming";
                    } else if (activeTab === 'Past') {
                        queryType = "past";
                    } else if (activeTab === 'Accepted') {
                        queryType = "upcoming";
                        acceptanceStatus = "accepted";
                    } else if (activeTab === 'Canceled') {
                        queryType = "upcoming";
                        acceptanceStatus = "cancelled";
                    }

                    let url = `appointments/doctor?id=${user.id}&type=${queryType}`;
                    if (acceptanceStatus) {
                        url += `&acceptence_status=${acceptanceStatus}`;
                    }

                    const appointmentsRes = await apiCall(url, 'GET');

                    if (appointmentsRes.data) {
                        const data = Array.isArray(appointmentsRes.data) ? appointmentsRes.data : [];
                        const now = new Date();

                        const filteredData = data.filter((apt: any) => {
                            const appointmentDate = new Date(`${apt.day}T${apt.time}`);
                            
                            if (activeTab === 'Pending') {
                                return appointmentDate > now && apt.acceptence_status !== 'accepted' && apt.acceptence_status !== 'cancelled';
                            } else if (activeTab === 'Upcoming') {
                                return appointmentDate > now;
                            } else if (activeTab === 'Past') {
                                return appointmentDate <= now;
                            } else if (activeTab === 'Accepted') {
                                return apt.acceptence_status === 'accepted';
                            } else if (activeTab === 'Canceled') {
                                return apt.acceptence_status === 'cancelled';
                            }
                            return true; 
                        });

                        setAppointments(filteredData);
                    }
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setAppointments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [activeTab]); 

    const handleAccept = async (id: any) => {
        try {
            await apiCall(`appointments/${id}/change-acceptence-status`, 'PATCH', { acceptence_status: 'accepted' });

            await apiCall(`notifications`, 'POST', {
                appointment_id: id,
                title: "Appointment Accepted",
                message: `Dr. ${doctorName} has accepted your appointment request.`,
                type: "success"
            });

            // تحديث الحالة محلياً بدلاً من الحذف الكامل ليظهر في قائمة Accepted
            setAppointments(prev => 
                prev.map(apt => apt.id === id ? { ...apt, acceptence_status: 'accepted' } : apt)
                    .filter(apt => activeTab === 'Pending' ? apt.acceptence_status !== 'accepted' : true)
            );
        } catch (error) {
            console.error("Error accepting appointment:", error);
        }
    };

    const handleRemove = async (id: any) => {
        try {
            await apiCall(`appointments/${id}/change-acceptence-status`, 'PATCH', { acceptence_status: 'cancelled' });
            
            await apiCall(`notifications`, 'POST', {
                appointment_id: id,
                title: "Appointment Cancelled",
                message: `Dr. ${doctorName} has cancelled your appointment.`,
                type: "alert"
            });

            // تحديث الحالة محلياً بدلاً من الحذف الكامل ليظهر في قائمة Canceled
            setAppointments(prev => 
                prev.map(apt => apt.id === id ? { ...apt, acceptence_status: 'cancelled' } : apt)
                    .filter(apt => activeTab === 'Pending' ? apt.acceptence_status !== 'cancelled' : true)
            );
        } catch (error) {
            console.error("Error removing appointment:", error);
        }
    };

    const firstLetter = doctorName ? doctorName.trim().charAt(0).toUpperCase() : "";

    return (
        <main className="w-full min-h-screen bg-slate-50 font-sans pb-30">
            {/* Header Section */}
            <div className="bg-blue-500 rounded-b-[40px] p-8 pt-12 relative overflow-hidden">
                <div className="flex items-center gap-4 relative z-10">
                    <button 
                        onClick={() => router.push('/profile')}
                        className="relative w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center bg-white overflow-hidden text-blue-500 font-black text-2xl shadow-sm cursor-pointer hover:bg-slate-50 transition-colors select-none shrink-0"
                    >
                        {firstLetter || <User size={32} />}
                    </button>
                    <div className="text-white">
                        <p className="text-sm opacity-90">Hello, doctor</p>
                        <h1 className="text-2xl font-bold">Dr. {doctorName || "Loading..."}</h1>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 -mt-8 grid grid-cols-4 gap-2">
                {['Pending', 'Past', 'Accepted', 'Canceled'].map((tab) => {
                    const Icons: Record<string, React.ComponentType<any>> = {
                        Pending: Clock,
                        Past: Calendar,
                        Accepted: CheckCircle2,
                        Canceled: XCircle
                    };
                    const Icon = Icons[tab];
                    return (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex flex-col items-center justify-center p-3 mt-12 rounded-2xl shadow-md transition-all cursor-pointer
                            ${activeTab === tab ? 'bg-blue-400 text-white scale-105 z-10' : 'bg-white text-slate-400'}`}
                        >
                            <Icon size={20} className="mb-1" />
                            <span className="text-xs font-bold">{tab}</span>
                        </button>
                    );
                })}
            </div>

            {/* Appointments List */}
            <div className="px-6 mt-8 space-y-4">
                {loading ? (
                    <div className="text-center py-10 text-slate-400 italic animate-pulse flex flex-col items-center gap-2">
                        <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                        Loading Schedule...
                    </div>
                ) : appointments.length > 0 ? (
                    appointments.map((apt) => (
                        <div key={apt.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex gap-4 mb-5">
                                <div className="relative w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 text-slate-300 overflow-hidden border border-slate-100">
                                    {apt.patient_image ? (
                                        <img src={apt.patient_image} alt={apt.patient_name} className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={32} />
                                    )}
                                </div>
                                <div className="flex flex-col justify-center">
                                    <h3 className="text-lg font-bold text-slate-800">{apt.patient_name}</h3>
                                    
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-lg border w-fit mt-1 capitalize ${getStatusStyles(apt.acceptence_status || apt.status)}`}>
                                        {apt.acceptence_status || apt.status || 'pending'}
                                    </span>

                                    <div className="flex items-center gap-2 text-slate-400 text-sm mt-2 font-medium">
                                        <Clock size={14} className="text-blue-400" />
                                        <span>{apt.day}  -  {apt.time}</span>
                                    </div>
                                </div>
                            </div>

                            {activeTab === 'Pending' && (
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => handleRemove(apt.id)}
                                        className="flex-1 py-3 px-4 rounded-xl border border-pink-200 text-pink-500 font-bold hover:bg-pink-50 transition-colors text-sm cursor-pointer"
                                    >
                                        Cancel
                                    </button>
                                    
                                    <button 
                                        onClick={() => handleAccept(apt.id)}
                                        className="flex-1 py-3 px-4 rounded-xl border border-cyan-200 text-cyan-600 font-bold hover:bg-cyan-50 transition-colors text-sm cursor-pointer"
                                    >
                                        Accept
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-20 text-slate-400 font-medium bg-white rounded-3xl border border-dashed border-slate-200">
                        <Calendar size={40} className="mx-auto mb-3 opacity-20" />
                        No {activeTab.toLowerCase()} appointments found.
                    </div>
                )}
            </div>
        </main>
    );
}