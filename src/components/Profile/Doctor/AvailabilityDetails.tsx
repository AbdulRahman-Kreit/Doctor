"use client";
import React, { useState } from 'react';
import { Plus, ChevronUp, ChevronDown, Clock, X } from 'lucide-react';

interface AvailabilityProps {
    onChange?: (workDays: { day: string; from: string; to: string }[]) => void;
}

export default function AvailabilityDetails({ onChange }: AvailabilityProps) {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedDays, setSelectedDays] = useState<string[]>(['Mo']);
    const [startTime, setStartTime] = useState({ hours: 9, minutes: 0, period: 'AM' });
    const [endTime, setEndTime] = useState({ hours: 12, minutes: 0, period: 'PM' });
    const [activeTimeSlot, setActiveTimeSlot] = useState<'start' | 'end'>('start');

    const daysMap: Record<string, string> = {
        'Mo': 'monday', 'Tu': 'tuesday', 'We': 'wednesday', 
        'Th': 'thursday', 'Fr': 'friday', 'Sa': 'saturday', 'Su': 'sunday'
    };

    const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    const formatTimeToApi = (time: { hours: number; minutes: number; period: string }) => {
        let h = time.hours;
        if (time.period === 'PM' && h < 12) h += 12;
        if (time.period === 'AM' && h === 12) h = 0;
        const hh = h < 10 ? `0${h}` : h;
        const mm = time.minutes < 10 ? `0${time.minutes}` : time.minutes;
        return `${hh}:${mm}`;
    };

    const handleConfirm = () => {
        const fromTime = formatTimeToApi(startTime);
        const toTime = formatTimeToApi(endTime);
        
        const workDays = selectedDays.map(day => ({
            day: daysMap[day],
            from: fromTime,
            to: toTime
        }));

        if (onChange) {
            onChange(workDays);
        }
        setShowPicker(false);
    };

    const toggleDay = (day: string) => {
        setSelectedDays(prev =>
            prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
        );
    };

    const updateTime = (type: 'hours' | 'minutes', direction: 'up' | 'down') => {
        const isStart = activeTimeSlot === 'start';
        const current = isStart ? startTime : endTime;
        const setTime = isStart ? setStartTime : setEndTime;

        if (type === 'hours') {
            let newHours = direction === 'up' ? current.hours + 1 : current.hours - 1;
            if (newHours > 12) newHours = 1;
            if (newHours < 1) newHours = 12;
            setTime({ ...current, hours: newHours });
        } else {
            let newMinutes = direction === 'up' ? current.minutes + 1 : current.minutes - 1;
            if (newMinutes > 59) newMinutes = 0;
            if (newMinutes < 0) newMinutes = 59;
            setTime({ ...current, minutes: newMinutes });
        }
    };

    const togglePeriod = (p: 'AM' | 'PM') => {
        if (activeTimeSlot === 'start') setStartTime({ ...startTime, period: p });
        else setEndTime({ ...endTime, period: p });
    };

    return (
        <div className="w-full max-w-[400px] bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100 relative">
            {/* Header */}
            <div className="bg-[#0089ff] py-4 flex justify-center items-center">
                <h2 className="text-white text-lg font-bold">Avilability Details</h2>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-3 px-6 py-3 border-b border-slate-300">
                <span className="text-slate-600 font-bold text-center">Day</span>
                <span className="text-slate-600 font-bold text-center">From</span>
                <span className="text-slate-600 font-bold text-center">To</span>
            </div>

            {/* Content Row Sample */}
            <div className="grid grid-cols-3 px-6 py-5 items-center text-sm italic text-slate-400 gap-2">
                <span className="text-center">{selectedDays.join(', ') || 'No days'}</span>
                <div className="flex items-center justify-center gap-1">
                    <span>{startTime.hours}:{startTime.minutes < 10 ? `0${startTime.minutes}` : startTime.minutes}{startTime.period}</span>
                </div>
                <div className="flex items-center justify-center gap-1">
                    <span>{endTime.hours}:{endTime.minutes < 10 ? `0${endTime.minutes}` : endTime.minutes}{endTime.period}</span>
                </div>
            </div>

            {/* Add Button */}
            <div className="px-4 pb-4">
                <button
                    type="button"
                    onClick={() => setShowPicker(true)}
                    className="w-full bg-[#0089ff] hover:bg-[#007ae6] text-white py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                    Add <Plus size={20} />
                </button>
            </div>

            {/* Time Picker Popup */}
            {showPicker && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4">
                    <div className="bg-white w-full max-w-[420px] rounded-[32px] shadow-2xl flex p-5 gap-4 relative">

                        <button type="button" onClick={() => setShowPicker(false)} className="absolute -top-2 -right-2 bg-white text-slate-400 p-2 rounded-full shadow-md hover:text-red-500">
                            <X size={20} />
                        </button>

                        {/* Days Selector */}
                        <div className="flex flex-col gap-2">
                            {days.map((day) => (
                                <button
                                    type="button"
                                    key={day}
                                    onClick={() => toggleDay(day)}
                                    className={`w-12 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-all
                                    ${selectedDays.includes(day) ? 'bg-[#0089ff] text-white shadow-md' : 'text-slate-600 bg-slate-50'}`}
                                >
                                    {day}
                                </button>
                            ))}
                        </div>

                        {/* Time Controls */}
                        <div className="flex-1 flex flex-col gap-3">
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setActiveTimeSlot('start')}
                                    className={`flex-1 py-2 rounded-xl border-2 transition-all font-bold text-xs ${activeTimeSlot === 'start' ? 'border-[#0089ff] bg-blue-50 text-[#0089ff]' : 'border-slate-100 text-slate-400'}`}
                                >
                                    START TIME
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTimeSlot('end')}
                                    className={`flex-1 py-2 rounded-xl border-2 transition-all font-bold text-xs ${activeTimeSlot === 'end' ? 'border-[#0089ff] bg-blue-50 text-[#0089ff]' : 'border-slate-100 text-slate-400'}`}
                                >
                                    END TIME
                                </button>
                            </div>

                            <div className="w-full border-2 border-slate-100 rounded-2xl py-3 px-4 flex justify-between items-center bg-slate-50/50">
                                <span className="text-slate-500 text-xl font-bold uppercase">
                                    {activeTimeSlot}: {activeTimeSlot === 'start' ? startTime.hours : endTime.hours} : {
                                        (activeTimeSlot === 'start' ? startTime.minutes : endTime.minutes) < 10 ? '0' : ''
                                    }{activeTimeSlot === 'start' ? startTime.minutes : endTime.minutes} {
                                        activeTimeSlot === 'start' ? startTime.period : endTime.period
                                    }
                                </span>
                                <Clock className="text-[#0089ff]" size={20} />
                            </div>

                            <div className="flex-1 bg-white border border-slate-100 rounded-3xl shadow-inner flex flex-col items-center justify-center p-4">
                                <div className="flex items-center gap-6 mb-4">
                                    <div className="flex flex-col items-center">
                                        <button type="button" onClick={() => updateTime('hours', 'up')}><ChevronUp className="text-slate-300" size={28} /></button>
                                        <span className="text-3xl font-black text-slate-800">{activeTimeSlot === 'start' ? startTime.hours : endTime.hours}</span>
                                        <button type="button" onClick={() => updateTime('hours', 'down')}><ChevronDown className="text-slate-300" size={28} /></button>
                                    </div>
                                    <span className="text-3xl font-bold text-slate-300">:</span>
                                    <div className="flex flex-col items-center">
                                        <button type="button" onClick={() => updateTime('minutes', 'up')}><ChevronUp className="text-slate-300" size={28} /></button>
                                        <span className="text-3xl font-black text-slate-800">
                                            {(activeTimeSlot === 'start' ? startTime.minutes : endTime.minutes) < 10 ? '0' : ''}
                                            {activeTimeSlot === 'start' ? startTime.minutes : endTime.minutes}
                                        </span>
                                        <button type="button" onClick={() => updateTime('minutes', 'down')}><ChevronDown className="text-slate-300" size={28} /></button>
                                    </div>
                                </div>

                                <div className="flex border-2 border-[#0089ff] rounded-xl overflow-hidden p-0.5 mb-4">
                                    {['AM', 'PM'].map((p) => (
                                        <button
                                            type="button"
                                            key={p}
                                            onClick={() => togglePeriod(p as 'AM' | 'PM')}
                                            className={`px-5 py-1 rounded-lg font-bold text-sm transition-all ${
                                                (activeTimeSlot === 'start' ? startTime.period : endTime.period) === p
                                                    ? 'bg-[#0089ff] text-white' : 'text-[#0089ff]'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>

                                <button 
                                    type="button" 
                                    onClick={handleConfirm} 
                                    className="w-full bg-[#0089ff] text-white py-3 rounded-2xl font-bold active:scale-95 transition-transform cursor-pointer"
                                >
                                    Confirm Selection
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}