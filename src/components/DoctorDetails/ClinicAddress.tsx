"use client";
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const clinicData = {
    name: 'Healthy Life Wellness Clinic',
    address: '456, Sunshine Avenue, Raja Park, Tilak Nagar',
    city: 'Jaipur',
    state: 'Rajasthan',
    zipCode: '302004',
    coordinates: { lat: 26.8920, lng: 75.8267 } 
};

export default function ClinicAddress() {
    const [isMounted, setIsMounted] = useState(false);

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

    const fullAddress = `${clinicData.name} - ${clinicData.address} - ${clinicData.city}, ${clinicData.state}, ${clinicData.zipCode}`;

    if (!isMounted) return null;

    return (
        <section className="w-full mt-12 select-none font-nunito">
            <h3 className="px-8 text-xl font-bold text-slate-800 tracking-tight mb-5">
                Clinic Address
            </h3>

            <div className="bg-gradient-to-r from-[#fefeff] to-[#fbfbff] px-8 py-7">
                <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">
                    {fullAddress}
                </p>
            </div>

            <div className="px-8 mt-10">
                <div className="relative w-full h-[250px] rounded-[30px] overflow-hidden border border-slate-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] bg-slate-50 z-0">
                    
                    {typeof window !== 'undefined' && (
                        <MapContainer 
                            center={[clinicData.coordinates.lat, clinicData.coordinates.lng]} 
                            zoom={15} 
                            scrollWheelZoom={false}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            {customIcon && (
                                <Marker position={[clinicData.coordinates.lat, clinicData.coordinates.lng]} icon={customIcon}>
                                    <Popup>
                                        <strong>{clinicData.name}</strong>
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