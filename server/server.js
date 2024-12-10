const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5000 }); // WebSocket server on port 5000
let dataObj;
wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received data:', message);
    const data = JSON.parse(message);
    dataObj=data;
    // Handle the data (e.g., store, process, or forward it)
    console.log('Username:', data.username);
    console.log('Password:', data.password);
    console.log('Editable Field:', data.editableField);

    // Optionally, send a response back to the client
    ws.send(JSON.stringify({ status: 'success', message: 'Data received successfully' }));
  });
  setTimeout(() => {
    ws.send(JSON.stringify(dataObj));
  }, 500)

  ws.on('close', () => {
    console.log('Connection closed');
  });

  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
});

console.log('WebSocket server listening on ws://localhost:5000');
