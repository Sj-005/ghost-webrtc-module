export function startWebRTC(videoElement, serverIP) {
  const ws = new WebSocket(`ws://${serverIP}:3000`);
  const pc = new RTCPeerConnection();

  ws.onopen = () => {
    ws.send(JSON.stringify({ type: "receiver" }));
  };

  pc.ontrack = (event) => {
    videoElement.srcObject = event.streams[0];
  };

  ws.onmessage = async (msg) => {
    const data = JSON.parse(msg.data);

    if (data.offer) {
      await pc.setRemoteDescription(data.offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      ws.send(JSON.stringify({ answer }));
    }

    if (data.candidate) {
      await pc.addIceCandidate(data.candidate);
    }
  };

  pc.onicecandidate = (e) => {
    if (e.candidate) {
      ws.send(JSON.stringify({ candidate: e.candidate }));
    }
  };
}