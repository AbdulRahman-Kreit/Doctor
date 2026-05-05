"use client";
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, User } from 'lucide-react';
import { apiCall } from '@/lib/apiCall'; 

export default function DoctorAppointments() {
    const [activeTab, setActiveTab] = useState('Pending');
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [doctorId, setDoctorId] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setDoctorId(userData.id); 
        }
    }, []);

    useEffect(() => {
        const fetchAppointments = async () => {
            if (!doctorId) return; 

            setLoading(true);
            try {
                // تم إزالة /api/ من البداية لتجنب التكرار في المسار
                const response = await apiCall(`appointments/doctor?id=${doctorId}&type=${activeTab.toLowerCase()}`);
                if (response.data) {
                    setAppointments(response.data); 
                }
            } catch (error) {
                console.error("Error fetching appointments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [activeTab, doctorId]);

    const handleAccept = async (id) => {
        try {
            setAppointments(prev => prev.filter(apt => apt.id !== id));
        } catch (error) {
            console.error("Error accepting appointment:", error);
        }
    };

    const handleRemove = async (id) => {
        try {
            setAppointments(prev => prev.filter(apt => apt.id !== id));
        } catch (error) {
            console.error("Error removing appointment:", error);
        }
    };

    return (
        <main className="w-full min-h-screen bg-slate-50 font-sans pb-30">
            {/* Header Section */}
            <div className="bg-blue-500 rounded-b-[40px] p-8 pt-12 relative overflow-hidden">
                <div className="flex items-center gap-4 relative z-10">
                    <div className="relative w-16 h-16 rounded-full border-2 border-white/50 flex items-center justify-center bg-white overflow-hidden text-blue-500">
                        <User size={40} />
                    </div>
                    <div className="text-white">
                        <p className="text-sm opacity-90">Hello, doctor</p>
                        <h1 className="text-2xl font-bold">Dr. John Martins</h1>
                    </div>
                </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 -mt-8 grid grid-cols-2 gap-4">
                <button 
                    onClick={() => setActiveTab('Pending')}
                    className={`flex flex-col items-center justify-center p-6 mt-12 rounded-2xl shadow-lg transition-all
                    ${activeTab === 'Pending' ? 'bg-blue-400 text-white' : 'bg-white text-slate-400'}`}
                >
                    <Clock size={28} className="mb-2" />
                    <span className="font-bold">Pending</span>
                </button>
                <button 
                    onClick={() => setActiveTab('Upcoming')}
                    className={`flex flex-col items-center justify-center p-6 mt-12 rounded-2xl shadow-lg transition-all
                    ${activeTab === 'Upcoming' ? 'bg-blue-400 text-white' : 'bg-white text-slate-400'}`}
                >
                    <Calendar size={28} className="mb-2" />
                    <span className="font-bold">Upcoming</span>
                </button>
            </div>

            {/* Appointments List */}
            <div className="px-6 mt-8 space-y-4">
                {loading ? (
                    <div className="text-center py-10 text-slate-400">Loading...</div>
                ) : appointments.map((apt) => (
                    <div key={apt.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
                        <div className="flex gap-4 mb-5">
                            <div className="relative w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center shrink-0 text-slate-400 overflow-hidden">
                                {apt.patient_image ? (
                                    <img src={apt.patient_image} alt={apt.patient_name} className="w-full h-full object-cover" />
                                ) : (
                                    <User size={32} />
                                )}
                            </div>
                            <div className="flex flex-col justify-center">
                                <h3 className="text-lg font-bold text-slate-800">{apt.patient_name}</h3>
                                <span className="bg-blue-50 text-blue-400 text-sm font-semibold px-3 py-1 rounded-lg w-fit mt-1">
                                    {apt.status}
                                </span>
                                <div className="flex items-center gap-2 text-slate-400 text-sm mt-2">
                                    <Clock size={14} />
                                    <span>{apt.day}  -  {apt.time}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button 
                                onClick={() => handleRemove(apt.id)}
                                className="flex-1 py-3 px-4 rounded-xl border border-pink-200 text-pink-500 font-bold hover:bg-pink-50 transition-colors"
                            >
                                Cancel
                            </button>
                            
                            {activeTab === 'Pending' ? (
                                <button 
                                    onClick={() => handleAccept(apt.id)}
                                    className="flex-1 py-3 px-4 rounded-xl border border-cyan-200 text-cyan-500 font-bold hover:bg-cyan-50 transition-colors"
                                >
                                    Accept
                                </button>
                            ) : (
                                <button 
                                    onClick={() => handleRemove(apt.id)}
                                    className="flex-1 py-3 px-4 rounded-xl border border-cyan-200 text-cyan-500 font-bold hover:bg-cyan-50 transition-colors"
                                >
                                    Done
                                </button>
                            )}
                        </div>
                    </div>
                ))}
                
                {!loading && appointments.length === 0 && (
                    <div className="text-center py-10 text-slate-400 font-medium">
                        No {activeTab.toLowerCase()} appointments.
                    </div>
                )}
            </div>
        </main>
    );
}