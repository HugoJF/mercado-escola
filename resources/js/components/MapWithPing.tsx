import {Map, Marker, TileLayer} from "react-leaflet";
import {LatLngExpression} from "leaflet";
import React, {useState}  from "react";

export type MapWithPingProps = {
    center: [number, number];
    className: string;
    zoom: number;
}

export const MapWithPing: React.FC<MapWithPingProps> = ({zoom, center}) => {
    const [currentCenter, setCurrentCenter] = useState(center);

    return <Map
        onViewportChange={(e) => setCurrentCenter(e.center as typeof center)}
        center={currentCenter as LatLngExpression}
        zoom={zoom}
        style={{
            width: "100%",
            height: "300px"
        }}
    >
        <TileLayer
            detectRetina={true}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={currentCenter}/>
    </Map>
};
