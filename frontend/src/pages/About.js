import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page-container">
      <div className="about-header">
        <h1>About SafetyShield</h1>
        <p>Your trusted partner in personal security and peace of mind.</p>
      </div>

      <div className="about-content">
        <div className="about-section">
          <h2>Our Mission</h2>
          <p>
            In a world where personal safety is a growing concern, our mission is to provide a simple, reliable, and instantly accessible tool for women to feel more secure. We believe that technology can be a powerful ally in emergency situations. SafetyShield was born from a desire to create a straightforward solution that connects you with your trusted contacts when you need them most, without any unnecessary complexity.
          </p>
        </div>

        <div className="about-section how-it-works">
          <h2>How It Works</h2>
          <p>We've designed the system to be as intuitive as possible:</p>
          <ol>
            <li><strong>Manage Contacts:</strong> On the homepage, you can easily add, update, or remove the emergency contacts you want to notify. These should be people you trust implicitly.</li>
            <li><strong>Press the SOS Button:</strong> In a threatening or unsafe situation, press the large red SOS button on the homepage.</li>
            <li><strong>Instant Alerts:</strong> Our system immediately simulates sending an alert to all of your saved emergency contacts. To provide critical information, we also attempt to capture your current GPS location and include a map link in the message.</li>
          </ol>
        </div>

        <div className="about-section">
          <h2>Our Commitment to You</h2>
          <p>
            SafetyShield is more than just an app; it's a commitment. We are dedicated to maintaining a reliable service and continuously exploring new features to enhance user safety. While this is currently a demonstration project, it is built on the principles of privacy, speed, and reliability. Your data is for your use only, and the alert system is designed to be fast and effective. We are always open to feedback to make this tool even better.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;