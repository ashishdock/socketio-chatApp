const express = require('express');
const app = express();
const socketio = require('socket.io');

app.use(express.static(__dirname + '/public'));

const expressServer = app.listen(9000, () => {
  console.log('Listening on port 9000');
});
const io = socketio(expressServer);

io.on('connection', (socket) => {
  //   console.log(io.id); no such thing on client side
  //   socket.emit('messageFromServer', { data: 'Welcome to the socketio server' });
  socket.on('messageToServer', (dataFromClient) => {
    console.log(dataFromClient);
  });

  socket.on('newMessageToServer', (msg) => {
    // console.log(msg);
    io.emit('messageToClients', { text: msg.text });
  });
});

// io.emit('ping', () => console.log('Sending ping from server'));
// io.emit('pong', () => console.log('Sending pong from server'));

// io.serverSideEmit('ping', (err, responses) => {
//   console.log('Sending ping from serverSideEmit');
//   console.log(responses[0]); // prints "pong"
// });
//! serversideemit is only for comm between server to server

// io.on('ping', (cb) => {
//   console.log('io.on ping has been hit on the server');
//   cb('pong');
// });

// io.on('pong', () => {
//   console.log('io.on pong hasbeen hit on server.');
// });
