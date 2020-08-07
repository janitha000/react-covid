import React from 'react'
import { Map as LeaflettMap, TileLayer, Circle, Popup } from 'react-leaflet'
import numeral from 'numeral'
import './Map.css'

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204, 16, 52)",
        half_op: "rgba(204, 16, 52, 0.5)",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125, 215, 29)",
        half_op: "rgba(125, 215, 29, 0.5)",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251, 68, 67)",
        half_op: "rgba(251, 68, 67, 0.5)",
        multiplier: 2000,
    },
};

const Map = ({ countries, caseType, center, zoom }) => {
    const showDataOnMap = (data, caseType = 'cases') => {
        const mapData = data.map((country) => (
            <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                fillOpacity={0.4}
                color={casesTypeColors[caseType].hex}
                fillColor={casesTypeColors[caseType].hex}
                radius={Math.sqrt(country[caseType]) * casesTypeColors[caseType].multiplier}
            >
                <Popup className="popup">
                    <div>
                        <div classname="popup__flag" style={{ backgroundImage: `url(${country.countryInfo.flag})` }}></div>
                        <div classname="popup__name">{country.country}</div>
                        <div classname="popup__cases">Cases: {numeral(country.cases).format("0,0")}</div>
                        <div classname="popup__recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                        <div classname="popup__deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                    </div>
                </Popup>
            </Circle>
        ))

        console.log(mapData)
        return mapData;


    }

    return (
        <div className="map">
            <LeaflettMap center={center} zoom={zoom}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
                {countries?.length > 0 && showDataOnMap(countries, caseType)}
            </LeaflettMap>
        </div>
    )
}




export default Map;