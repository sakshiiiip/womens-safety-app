const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001; 

// --- In-Memory Database ---
let emergencyContacts = [
  { id: 1, name: 'Jane Doe (Mom)', phone: '111-222-3333' },
  { id: 2, name: 'John Smith (Friend)', phone: '444-555-6666' },
];

// --- Middleware ---
app.use(express.json());
const allowedOrigins = [
  'http://localhost:3000', // For local development
`https://womens-safety-kvysr0s99-pandeysakshii277-5369s-projects.vercel.app/`  // We will add your Vercel frontend URL here later!
];
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};
app.use(cors(corsOptions));

// --- API Routes for Contacts (CRUD) ---
// (GET, POST, DELETE, PUT routes for /api/contacts remain the same as the previous version)
app.get("/api/contacts", (req, res) => {
    res.status(200).json(emergencyContacts);
});
app.post("/api/contacts", (req, res) => {
    const newContact = { id: Date.now(), ...req.body };
    emergencyContacts.push(newContact);
    res.status(201).json(newContact);
});
app.delete("/api/contacts/:id", (req, res) => {
    emergencyContacts = emergencyContacts.filter(c => c.id !== parseInt(req.params.id));
    res.status(200).json({ message: "Contact deleted." });
});


// --- ENHANCED SOS Alert Route ---
app.post("/api/send-alert", (req, res) => {
    const { location } = req.body; // Destructure location from the request body

    console.log("\n\n!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.log("!!!   SOS ALERT RECEIVED  !!!");
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!\n");

    if (location) {
        console.log(`User's Location Detected:`);
        console.log(`  - Latitude: ${location.latitude}`);
        console.log(`  - Longitude: ${location.longitude}`);
        console.log(`  - Quick Link: https://www.google.com/maps?q=${location.latitude},${location.longitude}\n`);
    } else {
        console.log("User's location was not provided.\n");
    }
    
    console.log("Notifying all emergency contacts:");
    emergencyContacts.forEach(contact => {
      let message = `--> Simulating SMS to ${contact.name} at ${contact.phone}. Message: EMERGENCY!`;
      if(location) {
        message += ` Location: https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
      }
      console.log(message);
    });
    
    res.status(200).json({ message: "Alert Sent! Your emergency contacts have been notified." });
});
app.post("/api/tracking/start", (req, res) => {
  const sessionId = uuidv4(); // Generate a unique ID for the session
  liveSessions[sessionId] = { lat: null, lng: null, timestamp: Date.now() };
  console.log(`Live tracking session started: ${sessionId}`);
  res.status(201).json({ sessionId });
});

// 2. UPDATE a session with the user's current location
app.post("/api/tracking/:sessionId/update", (req, res) => {
  const { sessionId } = req.params;
  const { lat, lng } = req.body;

  if (liveSessions[sessionId]) {
    liveSessions[sessionId] = { lat, lng, timestamp: Date.now() };
    // console.log(`Location update for ${sessionId}: ${lat}, ${lng}`); // Can be spammy
    res.status(200).json({ message: "Location updated." });
  } else {
    res.status(404).json({ message: "Session not found." });
  }
});

// 3. GET the latest location for a specific session (for the friend watching the map)
app.get("/api/tracking/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  if (liveSessions[sessionId]) {
    res.status(200).json(liveSessions[sessionId]);
  } else {
    res.status(404).json({ message: "Session not found or has ended." });
  }
});

// 4. END a tracking session
app.delete("/api/tracking/:sessionId/stop", (req, res) => {
    const { sessionId } = req.params;
    if (liveSessions[sessionId]) {
        delete liveSessions[sessionId];
        console.log(`Live tracking session stopped: ${sessionId}`);
        res.status(200).json({ message: "Session stopped successfully." });
    } else {
        res.status(404).json({ message: "Session not found." });
    }
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});