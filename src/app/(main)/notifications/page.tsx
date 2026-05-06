"use client";
import React, { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import BackButton from '@/components/Generals/BackButton';
import { apiCall } from '@/lib/apiCall';
import AppointmentAlertCard from '@/components/Notifications/AppointmentAlertCard';

export default function Notifications() {
    const [upcomingAlerts, setUpcomingAlerts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAndFilterAppointments = async () => {
            try {
                const response = await apiCall(`/appointments/patient`, "GET");
                const data = response.data || [];

                const now = new Date();
                const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

                const urgent = data.filter((apt) => {
                    const appointmentDate = new Date(`${apt.day}T${apt.time}`);
                    return appointmentDate > now && appointmentDate <= oneHourFromNow;
                });

                setUpcomingAlerts(urgent);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAndFilterAppointments();
        const interval = setInterval(fetchAndFilterAppointments, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="w-full min-h-screen bg-white font-nunito flex flex-col pb-10">
            {/* Header */}
            <div className="relative flex items-center justify-center gap-4 px-6 pb-6 pt-10 border-b border-slate-50">
                <div className="absolute left-8">
                    <BackButton />
                </div>
                
                <h1 className="text-xl text-center font-extrabold text-slate-900">Notifications</h1>
            </div>

            <div className="px-6 py-4 space-y-4">
                {isLoading ? (
                    <div className="text-center py-20 text-slate-400 font-bold">Loading...</div>
                ) : upcomingAlerts.length > 0 ? (
                    upcomingAlerts.map((apt) => (
                        <AppointmentAlertCard key={apt.id} apt={apt} />
                    ))
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell size={32} className="text-slate-200" />
                        </div>
                        <p className="text-slate-400 font-bold">No urgent notifications</p>
                        <p className="text-slate-300 text-xs mt-1">Missions starting within 60 mins will appear here.</p>
                    </div>
                )}
            </div>
        </main>
    );
}