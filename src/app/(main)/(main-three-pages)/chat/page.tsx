"use client";
import React, { useState, useEffect, useRef } from 'react';
import { MoreVertical } from 'lucide-react';
import BackButton from '@/components/Generals/BackButton';
import ChatInput from '@/components/Chat/ChatInput';
import ChatBubble from '@/components/Chat/ChatBuble';
import { apiCall } from '@/lib/apiCall'; 

export default function ChatPage() {
    const [messages, setMessages] = useState([
        { id: '1', text: "Hello! How can I help you today?", sender: "ai", name: "AI Assistant" }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (text) => {
        const userMsg = { id: Date.now().toString(), text, sender: "user", name: "You" };
        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            const response = await apiCall("/aiChat/send", "POST", { message: text });
            
            const aiMsg = { 
                id: (Date.now() + 1).toString(), 
                text: response.content || response.message, 
                sender: "ai", 
                name: "AI Assistant" 
            };
            setMessages(prev => [...prev, aiMsg]);
        } catch (error) {
            console.error("Failed to send message:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="w-full min-h-screen bg-white font-sans flex flex-col items-center">
            <div className="w-full max-w-7xl flex flex-col h-screen border-x border-slate-50 shadow-sm relative">
                
                <header className="w-full flex items-center justify-between p-6 bg-white sticky top-0 z-20 border-b border-slate-50">
                    <BackButton />
                    <h1 className="text-xl font-bold text-slate-800">AI Chat</h1>
                    <button className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                        <MoreVertical size={24} className="text-slate-800" />
                    </button>
                </header>

                <div className="flex-1 w-full overflow-y-auto p-6 pb-44 flex flex-col gap-4">
                    {messages.map((msg) => (
                        <ChatBubble 
                            key={msg.id} 
                            message={msg.text} 
                            isUser={msg.sender === "user"} 
                            name={msg.name} 
                        />
                    ))}
                    {isLoading && <p className="text-xs text-slate-400 animate-pulse">AI is thinking...</p>}
                    
                    <div ref={messagesEndRef} />
                </div>

                <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-7xl z-30 bg-white border-t border-slate-100 pb-8 px-4">
                    <ChatInput onSend={handleSendMessage} disabled={isLoading} />
                </div>

            </div>
        </main>
    );
}