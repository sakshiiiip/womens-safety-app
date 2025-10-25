import React from 'react';
import './SafetyTips.css';

function SafetyTips() {
  return (
    <div className="container">
      <div className="tips-header">
        <h1>Safety Tips and Resources</h1>
        <p>Stay informed, stay safe. Here are some essential tips for personal security.</p>
      </div>
      <div className="tips-grid">
        <div className="tip-card">
          <h3>Be Aware of Your Surroundings</h3>
          <p>Avoid distractions like your phone when walking alone. Pay attention to who is around you and trust your instincts.</p>
        </div>
        <div className="tip-card">
          <h3>Share Your Plans</h3>
          <p>Before you go out, let a trusted friend or family member know your plans, including where you are going and when you expect to return.</p>
        </div>
        <div className="tip-card">
          <h3>Secure Your Home</h3>
          <p>Always lock doors and windows. Consider a security system and be cautious about who you let into your home.</p>
        </div>
        <div className="tip-card">
          <h3>Online Safety</h3>
          <p>Be cautious about sharing personal information online. Use strong, unique passwords and be wary of suspicious emails or messages.</p>
        </div>
      </div>
    </div>
  );
}

export default SafetyTips;