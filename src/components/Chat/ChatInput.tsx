"use client";
import React, { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend, disabled }) {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim() && !disabled) {
            onSend(message);
            setMessage("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="w-full bg-white p-4">
            <div className="relative max-w-7xl mx-auto flex items-center">
                
                <input
                    type="text"
                    value={message}
                    disabled={disabled}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={disabled ? "AI is thinking..." : "Type your message..."}
                    className="w-full bg-[#E5E7EB] text-slate-700 h-16 rounded-full px-8 pr-20 outline-none focus:ring-2 focus:ring-blue-400 transition-all placeholder:text-slate-400 text-lg disabled:opacity-50"
                />

                <button
                    onClick={handleSend}
                    disabled={disabled || !message.trim()}
                    className="absolute right-2 bg-[#2563EB] hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform active:scale-90 flex items-center justify-center disabled:bg-slate-400 disabled:scale-100"
                >
                    <Send size={24} fill="currentColor" className="ml-1" />
                </button>
                
            </div>
        </div>
    );
}