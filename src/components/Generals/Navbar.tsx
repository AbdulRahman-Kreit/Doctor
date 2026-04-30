"use client";
import React from 'react';
import { Home, Calendar, MessageSquareMore } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { icon: Home, path: '/home', label: 'Home' },
        { icon: Calendar, path: '/appointments', label: 'Appointments' },
        { icon: MessageSquareMore, path: '/chat', label: 'Chat' },
    ];

    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[450px] bg-white/80 backdrop-blur-md py-6 px-10 flex flex-row items-center justify-between border-t border-slate-50 z-50">
            {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;

                return (
                    <Link key={item.path} href={item.path} className="relative group">
                        <Icon 
                            size={32} 
                            strokeWidth={isActive ? 2.5 : 2}
                            className={`transition-all duration-300 ${
                                isActive 
                                ? "text-[#0089ff] scale-110" 
                                : "text-slate-400 hover:text-slate-600"
                            }`}
                        />
                    </Link>
                );
            })}
        </div>
    );
}