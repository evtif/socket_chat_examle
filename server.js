const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 3000 });

const clientsOfChat = {};

server.on('connection', wss => {
  console.log('We have new connection:)');

  const id = Math.floor(Math.random() * Date.now() / 1000000);
  clientsOfChat[id] = wss;

  wss.on('message', function incoming(data) {
    // modern
    server.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) client.send(data);
    });

    // old
    for (let client in clientsOfChat) {
      clientsOfChat[client].send(data);
    }
  });

  wss.on('close', function incoming(data) {
    delete clientsOfChat[id];
  });

  wss.send('Hey! Wat\'s up?');
});
