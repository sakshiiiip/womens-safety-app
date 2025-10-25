import React, { useState } from 'react';
import axios from 'axios';
import EmergencyContacts from '../components/EmergencyContacts';
import LiveTracking from '../components/LiveTracking'; // <-- IMPORT

import './Home.css';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("In an emergency, press the button below.");
  const [isAlertSent, setIsAlertSent] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');

  // Function to get user's location
  const getLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setError('');
      },
      () => {
        setError("Unable to retrieve your location. Please enable location services.");
      }
    );
  };
  
  const handleSOSClick = () => {
    setIsLoading(true);
    setStatusMessage("Sending alert... Capturing location...");
    
    // First, try to get location
    getLocation();

    // The API call now includes the location data
axios.post(`${process.env.REACT_APP_API_URL}/api/send-alert`, { location })
.then(response => {
        setIsLoading(false);
        setIsAlertSent(true);
        setStatusMessage(response.data.message);
      })
      .catch(err => {
        setIsLoading(false);
        setStatusMessage("Failed to send alert. Check server connection.");
        console.error("SOS error:", err);
      });
  };

  return (
    <>
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Your Safety, Our Priority</h1>
          <p className="hero-subtitle">{statusMessage}</p>
          {error && <p className="error-message">{error}</p>}
          <button
            className={`sos-button ${isAlertSent ? 'alert-sent' : ''}`}
            onClick={handleSOSClick}
            disabled={isLoading || isAlertSent}
          >
            {isLoading ? 'SENDING' : (isAlertSent ? 'SENT' : 'SOS')}
          </button>
        </div>
      </div>
      <div className="container">
        <EmergencyContacts />
        <LiveTracking />
      </div>
    </>
  );
}

export default Home;