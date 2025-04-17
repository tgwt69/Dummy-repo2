// server.js - Dummy server to keep your main server alive
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Your main server URL
const MAIN_SERVER_URL = 'https://dischecker.onrender.com/token-checker';
// How often to ping (in milliseconds) - 10 minutes
const PING_INTERVAL = 10 * 60 * 1000;

// Basic route to check if dummy server is running
app.get('/', (req, res) => {
  res.send({
    status: 'Dummy server running',
    purpose: 'Keeping main server alive on Render free tier',
    lastPingTime: new Date().toISOString()
  });
});

// Endpoint that will be pinged by the main server
app.get('/ping', (req, res) => {
  console.log('Received ping from main server at:', new Date().toISOString());
  res.send({ status: 'alive', timestamp: new Date().toISOString() });
});

// Health check endpoint (useful for Render)
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Dummy server listening on port ${PORT}`);
  console.log(`Will ping main server at ${MAIN_SERVER_URL} every ${PING_INTERVAL/1000} seconds`);
  
  // Start the ping cycle immediately
  pingMainServer();
  
  // Setup the interval for continuous pinging
  setInterval(pingMainServer, PING_INTERVAL);
});

// Function to ping the main server
async function pingMainServer() {
  try {
    console.log(`Pinging main server at: ${new Date().toISOString()}`);
    const response = await axios.get(MAIN_SERVER_URL);
    console.log('Main server response:', response.data);
  } catch (error) {
    console.error('Error pinging main server:', error.message);
  }
}
