// src/components/LiveTracking.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './LiveTracking.css';

function LiveTracking() {
    const [isTracking, setIsTracking] = useState(false);
    const [sessionId, setSessionId] = useState(null);
    const [trackingLink, setTrackingLink] = useState('');
    const watchId = useRef(null); // To store the ID of the location watcher

    // This effect cleans up the location watcher when the component unmounts
    useEffect(() => {
        return () => {
            if (watchId.current) {
                navigator.geolocation.clearWatch(watchId.current);
            }
        };
    }, []);

    const startTracking = () => {
      axios.post(`${process.env.REACT_APP_API_URL}/api/send-alert`)
            .then(response => {
                const newSessionId = response.data.sessionId;
                setSessionId(newSessionId);
                setIsTracking(true);
                const newTrackingLink = `${window.location.origin}/track/${newSessionId}`;
                setTrackingLink(newTrackingLink);

                // Start watching the user's position
                watchId.current = navigator.geolocation.watchPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        axios.post(`http://localhost:5001/api/tracking/${newSessionId}/update`, {
                            lat: latitude,
                            lng: longitude
                        }).catch(err => console.error("Failed to send location update:", err));
                    },
                    (error) => console.error("Geolocation error:", error),
                    { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
                );
            })
            .catch(error => console.error("Failed to start tracking session:", error));
    };

    const stopTracking = () => {
        if (watchId.current) {
            navigator.geolocation.clearWatch(watchId.current);
            watchId.current = null;
        }
        axios.delete(`http://localhost:5001/api/tracking/${sessionId}/stop`)
            .then(() => {
                 setIsTracking(false);
                 setSessionId(null);
                 setTrackingLink('');
            })
            .catch(error => console.error("Failed to stop tracking session:", error));
    };

    const copyLink = () => {
        navigator.clipboard.writeText(trackingLink)
            .then(() => alert("Tracking link copied to clipboard!"));
    };

    return (
        <div className="live-tracking-container">
            <h2>Track Me Home</h2>
            <p>Share a live map of your journey with a trusted contact.</p>
            
            {!isTracking ? (
                <button onClick={startTracking} className="tracking-btn start">
                    Start Tracking
                </button>
            ) : (
                <div className="tracking-active-panel">
                    <h4>Tracking is Active!</h4>
                    <p>Share this link with your contact:</p>
                    <div className="link-container">
                        <input type="text" value={trackingLink} readOnly />
                        <button onClick={copyLink}>Copy</button>
                    </div>
                    <button onClick={stopTracking} className="tracking-btn stop">
                        Stop Tracking
                    </button>
                </div>
            )}
        </div>
    );
}

export default LiveTracking;