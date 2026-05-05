"use client";
import React from 'react';
import { User } from 'lucide-react';

export default function ChatBubble({ message, isUser, name }) {
    return (
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} mb-8`}>
            <span className="text-[10px] text-slate-400 mb-1 px-1">{name}</span>
            
            <div className={`flex items-end gap-2 max-w-[85%] ${isUser ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`p-4 rounded-2xl shadow-sm text-white min-h-[50px] flex items-center
                    ${isUser ? 'bg-blue-600 rounded-tr-none' : 'bg-blue-500 rounded-tl-none'}`}>
                    <p className="text-sm leading-relaxed">{message}</p>
                </div>

                <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden shrink-0 flex items-center justify-center text-slate-400">
                    <User size={20} />
                </div>
            </div>
        </div>
    );
}