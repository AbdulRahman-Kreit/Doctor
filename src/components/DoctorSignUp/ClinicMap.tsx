"use client";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import { useMemo } from "react";

interface ClinicMapProps {
    position: [number, number];
    addressText: string;
    onPositionChange?: (newPos: [number, number]) => void; 
}

export default function ClinicMap({ position, addressText, onPositionChange }: ClinicMapProps) {

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

    function MapEvents() {
        useMapEvents({
            click(e) {
                if (onPositionChange) {
                    onPositionChange([e.latlng.lat, e.latlng.lng]);
                }
            },
        });
        return null;
    }

    const eventHandlers = useMemo(
        () => ({
            dragend(e: any) {
                const marker = e.target;
                if (marker != null && onPositionChange) {
                    const latLng = marker.getLatLng();
                    onPositionChange([latLng.lat, latLng.lng]);
                }
            },
        }),
        [onPositionChange],
    );

    if (!customIcon) return null;

    return (
        <div className="w-full flex flex-col gap-3">
        <h3 className="font-bold text-lg text-slate-900 ml-1">Clinic Address</h3>
        
        <div className="h-[220px] w-full rounded-2xl overflow-hidden border-2 border-[#f4f4f4] z-0 shadow-sm">
            <MapContainer 
            center={position} 
            zoom={13} 
            scrollWheelZoom={false} 
            style={{ height: "100%", width: "100%" }}
            >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEvents />
            <Marker 
                position={position} 
                icon={customIcon}
                draggable={true} 
                eventHandlers={eventHandlers}
            >
                <Popup>
                {addressText}
                </Popup>
            </Marker>
            </MapContainer>
        </div>
        </div>
    );
}