import React from 'react';
import DoctorCard from './DoctorCard';

const doctors = [
    { 
        id: 'kate-rose', 
        name: 'Dr. Kate Rose', 
        specialty: 'Pediatrician', 
        rating: 4.5, 
        patients: 200,
        image: '/assets/doctor_female.svg' 
    },
    { 
        id: 'kyle-bush', 
        name: 'Dr. Kyle Bush', 
        specialty: 'Cardiologist', 
        rating: 5.0, 
        patients: 300,
        image: '/assets/doctor_male.svg' 
    },
    { 
        id: 'carla-cooper', 
        name: 'Dr. Carla Cooper', 
        specialty: 'Pediatrician', 
        rating: 4.5, 
        patients: 200,
        image: '/assets/doctor_female.svg' 
    },
    { 
        id: 'erick-the-red', 
        name: 'Dr. Erick the Red', 
        specialty: 'Cardiologist', 
        rating: 5.0, 
        patients: 300,
        image: '/assets/doctor_male.svg' 
    },
];

export default function DoctorList() {
    return (
        <section className="flex flex-col gap-6 w-full">
            <div className="flex justify-between items-end px-2">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    Available Doctors Nearby
                </h2>
                <button className="text-slate-400 text-sm font-medium hover:text-[#0089ff] transition-colors">
                    View More
                </button>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-12 justify-items-center">
                {doctors.map((doc) => (
                    <DoctorCard key={doc.id} {...doc} /> 
                ))}
            </div>
        </section>
    );
}