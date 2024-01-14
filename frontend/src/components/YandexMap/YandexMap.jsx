import React, { useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const YandexMap = ({ onLocationSelect }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleMapClick = (e) => {
        const coordinates = e.get('coords');
        setSelectedLocation(coordinates);
        onLocationSelect(coordinates);
    };

    return (
        <YMaps>
            <Map
                defaultState={{
                    center: [55.751574, 37.573856],
                    zoom: 9,
                }}
                width="100%"
                height="400px"
                onClick={handleMapClick}
            >
                {selectedLocation && <Placemark geometry={selectedLocation} />}
            </Map>
        </YMaps>
    );
};

export default YandexMap;