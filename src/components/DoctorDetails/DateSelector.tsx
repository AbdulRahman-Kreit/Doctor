"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { 
    format, addMonths, subMonths, startOfMonth, 
    endOfMonth, eachDayOfInterval, isSameDay, 
    startOfWeek, endOfWeek, setYear, getYear
} from 'date-fns';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export default function DateSelector() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [selectedDate, setSelectedDate] = useState(new Date()); 
    const [showCalendar, setShowCalendar] = useState(false);
    const [viewDate, setViewDate] = useState(new Date()); 
    
    const sliderRef = useRef<HTMLDivElement>(null);
    const selectedRef = useRef<HTMLButtonElement>(null);

    const currentYear = getYear(new Date());
    const years = Array.from({ length: 40 }, (_, i) => currentYear - 10 + i);

    const updateUrl = (date: Date) => {
        const params = new URLSearchParams(searchParams);
        params.set('date', format(date, 'yyyy-MM-dd'));
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    useEffect(() => {
        setViewDate(startOfMonth(selectedDate));
    }, [selectedDate]);

    useEffect(() => {
        if (selectedRef.current && !showCalendar) {
            selectedRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center' 
            });
        }
    }, [selectedDate, showCalendar]); 

    const sliderDays = eachDayOfInterval({
        start: startOfMonth(selectedDate),
        end: endOfMonth(selectedDate),
    });

    const renderCalendarGrid = () => {
        const start = startOfWeek(startOfMonth(viewDate), { weekStartsOn: 1 });
        const end = endOfWeek(endOfMonth(viewDate), { weekStartsOn: 1 });
        return eachDayOfInterval({ start, end });
    };

    return (
        <div className="w-full px-6 mt-8 font-nunito">
            <div className="flex items-center gap-2 mb-6">
                <span className="text-slate-900 text-xl font-extrabold tracking-tight">
                    {format(selectedDate, 'MMMM, yyyy')}
                </span>
                <button 
                    onClick={() => setShowCalendar(true)}
                    className="p-1 hover:bg-slate-50 rounded-full transition-transform active:scale-95"
                >
                    <ChevronDown size={22} className="text-slate-800" />
                </button>
            </div>

            <div ref={sliderRef} className="flex py-2 gap-4 overflow-x-auto scrollbar-hide pb-4 touch-pan-x scroll-smooth">
                {sliderDays.map((day, idx) => {
                    const isToday = isSameDay(day, new Date());
                    const isSelected = isSameDay(day, selectedDate);
                    return (
                        <button
                            key={idx}
                            ref={isSelected ? selectedRef : null}
                            onClick={() => {
                                setSelectedDate(day);
                                updateUrl(day);
                            }}
                            className={`flex flex-col items-center justify-center min-w-[72px] h-[105px] rounded-[24px] border transition-all duration-300 flex-shrink-0
                            ${isSelected 
                                ? 'bg-[#0089ff] border-[#0089ff] shadow-[0_12px_24px_rgba(0,137,255,0.25)] scale-105 z-10' 
                                : 'bg-white border-slate-100 shadow-sm'
                            } ${isToday && !isSelected ? 'border-blue-200' : ''}`}
                        >
                            <span className={`text-2xl font-black mb-1 ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                                {format(day, 'd')}
                            </span>
                            <span className={`text-sm font-bold ${isSelected ? 'text-blue-50' : 'text-slate-400'}`}>
                                {isToday && !isSelected ? 'Today' : format(day, 'EEE')}
                            </span>
                        </button>
                    );
                })}
            </div>

            {showCalendar && (
                <>
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[99]" onClick={() => setShowCalendar(false)} />
                    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92%] max-w-[400px] bg-white rounded-[35px] p-7 shadow-[0_30px_60px_rgba(0,0,0,0.15)] z-[100] border border-slate-50">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-black text-slate-800">{format(viewDate, 'MMMM')}</span>
                                <div className="relative group">
                                    <select 
                                        value={getYear(viewDate)}
                                        onChange={(e) => setViewDate(setYear(viewDate, parseInt(e.target.value)))}
                                        className="appearance-none bg-slate-50 text-slate-700 font-bold py-1 px-3 pr-8 rounded-lg border-none cursor-pointer text-sm"
                                    >
                                        {years.map(year => (
                                            <option key={year} value={year}>{year}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => setViewDate(subMonths(viewDate, 1))} className="p-2 text-slate-400"><ChevronLeft size={20}/></button>
                                <button onClick={() => setViewDate(addMonths(viewDate, 1))} className="p-2 text-slate-400"><ChevronRight size={20}/></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-y-2 text-center">
                            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                                <span key={day} className="text-slate-400 text-xs font-bold uppercase mb-2">{day}</span>
                            ))}
                            {renderCalendarGrid().map((day, idx) => {
                                const isSelected = isSameDay(day, selectedDate);
                                return (
                                    <div key={idx} className="h-10 flex items-center justify-center">
                                        <button 
                                            onClick={() => {
                                                setSelectedDate(day);
                                                updateUrl(day); 
                                                setShowCalendar(false);
                                            }}
                                            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold transition-all relative
                                            ${isSelected ? 'bg-[#0089ff] text-white shadow-md' : 'text-slate-700 hover:bg-blue-50'}`}
                                        >
                                            {format(day, 'd')}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}