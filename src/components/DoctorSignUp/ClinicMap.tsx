"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; 
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import { useMemo } from "react";

interface ClinicMapProps {
    position: [number, number];
    addressText: string;
    onAddressChange?: (newAddress: string) => void; 
}

export default function ClinicMap({ position, addressText, onAddressChange }: ClinicMapProps) {

    const customIcon = useMemo(() => {
        if (typeof window === 'undefined') return null;
        return L.divIcon({
            html: renderToStaticMarkup(
                <div className="relative flex items-center justify-center">
                    <div className="w-10 h-10 bg-[#0089ff] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                        <MapPin size={20} color="white" />
                    </div>
                    <div className="absolute -bottom-1 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-[#0089ff]"></div>
                </div>
            ),
            className: "",
            iconSize: [40, 40],
            iconAnchor: [20, 40],
        });
    }, []);

    if (!customIcon) return null;

    return (
        <div className="w-full flex flex-col gap-3">
            <h3 className="font-bold text-lg text-slate-900 ml-1">Clinic Address</h3>
            
            <div className="h-[220px] w-full rounded-2xl overflow-hidden border-2 border-[#f4f4f4] z-0 shadow-sm">
                <MapContainer 
                    center={position} 
                    zoom={13} 
                    scrollWheelZoom={false} 
                    dragging={false} // Disable map dragging
                    touchZoom={false}
                    doubleClickZoom={false}
                    zoomControl={false} // Hide zoom buttons for a cleaner static look
                    style={{ height: "100%", width: "100%" }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    
                    <Marker 
                        position={position} 
                        icon={customIcon}
                        draggable={false} // Disable marker dragging
                    >
                        <Popup>
                            {addressText}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

            <div className="w-full flex flex-col gap-2">
                <input 
                    type="text" 
                    value={addressText}
                    onChange={(e) => onAddressChange?.(e.target.value)}
                    placeholder="Type clinic address here..."
                    className="w-full py-3 px-4 rounded-xl bg-[#f4f4f4] outline-none
                    border-2 border-[#d3d3d3] focus:border-[#0089ff] transition-all
                    text-slate-700 font-medium"
                />
            </div>
        </div>
    );
}