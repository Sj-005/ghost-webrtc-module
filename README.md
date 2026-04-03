# Ghost WebRTC Module

Simple WebRTC streaming module for Ghost Controller system.

## Features
- WebRTC screen streaming (PC → Mobile)
- WebSocket signaling server
- Plug-and-play integration
- Works alongside existing controller (no changes required)

## Structure
- server/ → signaling server
- sender/ → PC screen sender
- client/ → integration module

## Run Server
cd server
npm install
node server.js

## Run Sender (PC)
Open sender.html in browser and allow screen capture

## Integration
Import webrtc.js in your React app:

startWebRTC(videoElement, serverIP)

## Notes
- Works on same WiFi network
- Does not modify existing controller system
