import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SafetyTips from './pages/SafetyTips';
import About from './pages/About';
import TrackViewer from './pages/TrackViewer'; // <-- IMPORT


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/safety-tips" element={<SafetyTips />} />
            <Route path="/about" element={<About />} />
            <Route path="/track/:sessionId" element={<TrackViewer />} /> {/* <-- ADD THIS ROUTE */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;