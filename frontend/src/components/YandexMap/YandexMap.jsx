import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const YandexMap = ({ onLocationSelect }) => {
    const [selectedLocation, setSelectedLocation] = useState(null);

    const handleMapClick = (e) => {
        const coordinates = e.get('coords');
        setSelectedLocation(coordinates);
        onLocationSelect(coordinates);
    };
    const [height, setHeight] = useState(384)
    useEffect(() => {
        setTimeout(() => {
            if (window.innerWidth < 480 && window.innerHeight < 820) {
                setHeight(200)
            } else {
                setHeight(384)
            }
        }, 0)
    }, [])

    return (
        <YMaps>
            <Map
                defaultState={{
                    center: [55.751574, 37.573856],
                    zoom: 9,
                }}
                width="100%"
                height={height}
                onClick={handleMapClick}
            >
                {selectedLocation && <Placemark geometry={selectedLocation} />}
            </Map>
        </YMaps>
    );
};

export default YandexMap;