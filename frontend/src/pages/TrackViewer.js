// src/pages/TrackViewer.js

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './TrackViewer.css';

function TrackViewer() {
    const { sessionId } = useParams();
    const [location, setLocation] = useState(null);
    const [error, setError] = useState('');
    const intervalId = useRef(null);

    useEffect(() => {
        const fetchLocation = () => {
            axios.get(`${process.env.REACT_APP_API_URL}/api//tracking/${sessionId}`)
        
                .then(response => {
                    if(response.data.lat && response.data.lng) {
                        setLocation(response.data);
                    }
                    setError('');
                })
                .catch(err => {
                    setError("Tracking session has ended or is invalid.");
                    clearInterval(intervalId.current); // Stop polling on error
                });
        };

        fetchLocation(); // Fetch immediately
        intervalId.current = setInterval(fetchLocation, 5000); // And then every 5 seconds

        return () => clearInterval(intervalId.current); // Cleanup on unmount
    }, [sessionId]);

    if (error) {
        return <div className="track-viewer-container status-message">{error}</div>;
    }

    if (!location || !location.lat) {
        return <div className="track-viewer-container status-message">Waiting for location data...</div>;
    }

    const position = [location.lat, location.lng];

    return (
        <div className="track-viewer-container">
            <MapContainer center={position} zoom={15} scrollWheelZoom={true} className="map">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>
                        User's current location. <br />
                        Last updated: {new Date(location.timestamp).toLocaleTimeString()}
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default TrackViewer;