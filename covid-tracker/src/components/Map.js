import React from 'react'
import { Map as LeaflettMap, TileLayer } from 'react-leaflet'
import './Map.css'

const Map = ({ center, zoom }) => {
    return (
        <div className="map">
            <LeaflettMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
            </LeaflettMap>
        </div>
    )
}


export default Map;