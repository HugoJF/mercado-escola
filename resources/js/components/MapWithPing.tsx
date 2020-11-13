import {Map, Marker, TileLayer} from "react-leaflet";
import {LatLngExpression}       from "leaflet";
import React, {useState}        from "react";

export type MapWithPingProps = {
    center: [number, number];
    className?: string;
}

export const MapWithPing: React.FC<MapWithPingProps> = ({center}) => {
    const [currentCenter, setCurrentCenter] = useState(center);
    const [zoom, setZoom] = useState(17);

    return <Map
        onViewportChange={(e) => {
            if (e.zoom) setZoom(e.zoom);
            if (e.center) setCurrentCenter(e.center)
        }}
        zoom={zoom}
        center={currentCenter as LatLngExpression}
        className="w-full flex-grow h-64 rounded-lg"
    >
        <TileLayer
            detectRetina={true}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={currentCenter}/>
    </Map>
};
