/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, User } from 'lucide-react';
import { apiCall } from '@/lib/apiCall'; 
import { useRouter } from 'next/navigation';

export default function DoctorAppointments() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('Pending');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [doctorName, setDoctorName] = useState(""); 

    const getStatusStyles = () => {
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

                    const appointmentsRes = await apiCall(
                        `appointments/doctor?id=${user.id}&type=${activeTab.toLowerCase()}`, 
                        'GET'
                    );

                    if (appointmentsRes.data) {
                        setAppointments(Array.isArray(appointmentsRes.data) ? appointmentsRes.data : []);
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
            setAppointments(prev => prev.filter(apt => apt.id !== id));
        } catch (error) {
            console.error("Error accepting appointment:", error);
        }
    };

    const handleRemove = async (id: any) => {
        try {
            setAppointments(prev => prev.filter(apt => apt.id !== id));
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
            <div className="px-6 -mt-8 grid grid-cols-2 gap-4">
                <button 
                    onClick={() => setActiveTab('Pending')}
                    className={`flex flex-col items-center justify-center p-6 mt-12 rounded-2xl shadow-lg transition-all
                    ${activeTab === 'Pending' ? 'bg-blue-400 text-white scale-105 z-10' : 'bg-white text-slate-400'}`}
                >
                    <Clock size={28} className="mb-2" />
                    <span className="font-bold">Pending</span>
                </button>
                <button 
                    onClick={() => setActiveTab('Upcoming')}
                    className={`flex flex-col items-center justify-center p-6 mt-12 rounded-2xl shadow-lg transition-all
                    ${activeTab === 'Upcoming' ? 'bg-blue-400 text-white scale-105 z-10' : 'bg-white text-slate-400'}`}
                >
                    <Calendar size={28} className="mb-2" />
                    <span className="font-bold">Upcoming</span>
                </button>
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
                                    
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-lg border w-fit mt-1 capitalize ${getStatusStyles()}`}>
                                        {apt.status}
                                    </span>

                                    <div className="flex items-center gap-2 text-slate-400 text-sm mt-2 font-medium">
                                        <Clock size={14} className="text-blue-400" />
                                        <span>{apt.day}  -  {apt.time}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button 
                                    onClick={() => handleRemove(apt.id)}
                                    className="flex-1 py-3 px-4 rounded-xl border border-pink-200 text-pink-500 font-bold hover:bg-pink-50 transition-colors text-sm"
                                >
                                    Cancel
                                </button>
                                
                                <button 
                                    onClick={() => activeTab === 'Pending' ? handleAccept(apt.id) : handleRemove(apt.id)}
                                    className="flex-1 py-3 px-4 rounded-xl border border-cyan-200 text-cyan-600 font-bold hover:bg-cyan-50 transition-colors text-sm"
                                >
                                    {activeTab === 'Pending' ? 'Accept' : 'Done'}
                                </button>
                            </div>
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