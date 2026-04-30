"use client";
import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';

export default function ImageUploadInput() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    }

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto">
            <label className="text-slate-950 text-lg font-bold">Profile Picture</label>
            
            <div 
                onClick={triggerFileInput}
                className={`relative w-30 h-30 rounded-full bg-[#f4f4f4] border-3 
                border-[#0089ff] flex flex-col items-center justify-center 
                cursor-pointer overflow-hidden transition-all hover:bg-[#ececec]`}
            >
                {selectedImage ? (
                    <>
                        <img 
                            src={selectedImage} 
                            alt="Preview" 
                            className="w-full h-full object-cover" 
                        />
                        <button 
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                            className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-1 shadow-lg hover:bg-red-600 cursor-pointer"
                        >
                            <X size={14} />
                        </button>
                    </>
                ) : (
                    <div className="flex flex-col items-center text-center px-2">
                        <Upload size={22} className="text-[#0089ff] mb-1" />
                        
                        <span className="text-md font-bold text-slate-700 leading-tight">
                            Upload <br /> Image
                        </span>
                        
                        <span className="text-[10px] text-slate-400 mt-1 uppercase tracking-tighter">
                            Max 5MB
                        </span>
                    </div>
                )}
            </div>

            <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden" 
            />
        </div>
    )
}