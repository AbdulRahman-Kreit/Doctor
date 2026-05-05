"use client";
import React, { useState, useRef } from 'react';
import { CloudUpload, X, FileImage } from 'lucide-react';

interface FileUploadProps {
    title: string; 
}

export default function FileUpload({ title }: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0); 
    const fileInputRef = useRef<HTMLInputElement>(null);

    const simulateUpload = () => {
        setProgress(0);
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) { 
                    clearInterval(timer);
                    return 100;
                }
                return prev + 10;
            });
        }, 300);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            simulateUpload(); 
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeFile = () => {
        setFile(null);
        setProgress(0);
        if (fileInputRef.current) fileInputRef.current.value = ''; 
    };

    return (
        <div className="w-full max-w-xl mx-auto flex flex-col gap-5 p-2">
            <h2 className="text-slate-950 text-xl font-bold">{title}</h2>
            
            <div className="flex flex-col gap-6">
                
                <div 
                    onClick={triggerFileInput}
                    className="w-full h-40 rounded-xl border-2 border-dashed border-[#0089ff] bg-white flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-slate-50"
                >
                    <CloudUpload size={48} className="text-[#0089ff]" />
                    <p className="text-slate-600 text-sm">
                        Drag your file(s) or <span className="text-[#0089ff] font-medium hover:underline">browse</span>
                    </p>
                    <p className="text-slate-400 text-xs mt-1">Max 10 MB files are allowed</p>
                </div>

                {file && (
                    <div className="w-full bg-white rounded-xl border border-slate-100 p-4 flex items-center gap-4 shadow-sm relative">
                        
                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center border border-blue-100">
                            <FileImage size={24} className="text-[#0089ff]" />
                        </div>

                        <div className="flex-1 flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-800 text-sm font-medium truncate max-w-[200px]">
                                    {file.name}
                                </span>
                                <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                                    {(file.size / 1024).toFixed(0)}kb
                                </span>
                            </div>

                            {progress < 100 && (
                                <div className="w-full flex items-center gap-3">
                                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-[#0089ff] rounded-full transition-all duration-300 ease-out"
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-slate-500 text-xs font-medium w-9 text-right">
                                        {progress}%
                                    </span>
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={removeFile}
                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 transition-colors p-1"
                        >
                            <X size={18} />
                        </button>
                    </div>
                )}

            </div>

            <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png"
                className="hidden" 
            />
        </div>
    )
}