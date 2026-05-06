/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-require-imports */
"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

interface ClinicAddressProps {
    clinicName?: string;
    address?: string;
}

export default function ClinicAddress({ clinicName, address }: ClinicAddressProps) {
    const [isMounted, setIsMounted] = useState(false);

    const coordinates = { lat: 31.2001, lng: 29.9187 };

    // ✅ NEW: dynamic position
    const [mapPosition, setMapPosition] = useState<[number, number]>([coordinates.lat, coordinates.lng]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    let customIcon: any = null;
    if (typeof window !== 'undefined') {
        const L = require('leaflet');
        customIcon = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }

    const displayClinicName = clinicName || "Care Clinic";
    const displayAddress = address || "Alexandria";

    // ✅ NEW: geocode when address changes
    useEffect(() => {
        if (!displayAddress) return;

        const timeout = setTimeout(async () => {
            try {
                const res = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(displayAddress)}`
                );
                const data = await res.json();

                if (data && data.length > 0) {
                    const lat = parseFloat(data[0].lat);
                    const lon = parseFloat(data[0].lon);
                    setMapPosition([lat, lon]);
                }
            } catch (err) {
                console.error("Geocoding error:", err);
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [displayAddress]);

    if (!isMounted) return null;

    return (
        <section className="w-full mt-12 select-none font-nunito">
            <h3 className="px-8 text-xl font-bold text-slate-800 tracking-tight mb-5">
                Clinic Address
            </h3>

            <div className="bg-gradient-to-r from-[#fefeff] to-[#fbfbff] px-8 py-7">
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
                    <span className="block font-bold text-slate-700">{displayClinicName}</span>
                    {displayAddress}
                </p>
            </div>

            <div className="px-8 mt-10">
                <div className="relative w-full h-[250px] rounded-[30px] overflow-hidden border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] bg-slate-50 z-0">
                    
                    {typeof window !== 'undefined' && (
                        <MapContainer 
                            key={mapPosition.join(",")} // ✅ forces rerender
                            center={mapPosition} 
                            zoom={13} 
                            scrollWheelZoom={false}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {customIcon && (
                                <Marker position={mapPosition} icon={customIcon}>
                                    <Popup>
                                        <strong>{displayClinicName}</strong><br/>
                                        {displayAddress}
                                    </Popup>
                                </Marker>
                            )}
                        </MapContainer>
                    )}
                </div>
            </div>
        </section>
    );
}