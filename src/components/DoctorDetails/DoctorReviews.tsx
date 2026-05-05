"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ReviewData {
    id: number;
    rate: number;
    comment: string | null;
    created_at: string;
    patient: {
        id: number;
        name: string;
        image: string | null;
    };
}

interface DoctorReviewsProps {
    reviews: ReviewData[];
}

function ReviewCard({ review }: { review: ReviewData }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const patientImage = review.patient.image || '/assets/avatar-placeholder.png'; // تأكد من وجود صورة افتراضية
    
    const text = review.comment || "No comment provided.";
    const shouldCollapse = text.length > 180;
    const displayedText = isExpanded || !shouldCollapse ? text : `${text.slice(0, 175)}... `;

    const timeAgo = formatDistanceToNow(new Date(review.created_at), { addSuffix: true });

    return (
        <div className="flex items-start gap-4 mb-8 font-nunito">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-slate-100">
                <Image 
                    src={patientImage} 
                    alt={review.patient.name}
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <h4 className="font-extrabold text-slate-900 text-[15px]">
                        {review.patient.name}
                    </h4>
                    <span className="text-slate-400 text-xs font-bold">
                        {timeAgo.replace('about ', '')}
                    </span>
                </div>

                <div className="flex items-center gap-0.5 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <Star 
                            key={i} 
                            size={16} 
                            className={`${i < review.rate ? 'fill-yellow-400 text-yellow-400' : 'fill-slate-200 text-slate-200'}`} 
                        />
                    ))}
                </div>

                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                    {displayedText}
                    {shouldCollapse && (
                        <button 
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-[#0089ff] font-bold hover:underline focus:outline-none"
                        >
                            {isExpanded ? "Show Less" : "Read more. . ."}
                        </button>
                    )}
                </p>
            </div>
        </div>
    );
}

export default function DoctorReviews({ reviews }: DoctorReviewsProps) {
    return (
        <section className="w-full px-8 mt-12 pb-10">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-8">
                Reviews
            </h3>

            {reviews.length > 0 ? (
                <div className="flex flex-col">
                    {reviews.map((review) => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                </div>
            ) : (
                <div className="p-6 bg-slate-50 rounded-2xl text-center text-slate-500 font-medium">
                    No reviews yet.
                </div>
            )}
        </section>
    );
}