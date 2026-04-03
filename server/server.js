const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3000 });

let sender = null;
let receiver = null;

wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    const data = JSON.parse(msg);

    if (data.type === "sender") sender = ws;
    if (data.type === "receiver") receiver = ws;

    if (ws === sender && receiver) receiver.send(msg);
    if (ws === receiver && sender) sender.send(msg);
  });
});

console.log("WebRTC signaling running on ws://localhost:3000");