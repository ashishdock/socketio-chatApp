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
    // io.of('/').emit('messageToClients', { text: msg.text });
  });

  setTimeout(() => {
    io.of('/admin').emit(
      'welcome',
      'Welcome to the admin channel from the root channel'
    );
  }, 2000);

  //   io.of('/admin').emit(
  //     'welcome',
  //     'Welcome to the admin channel from the root channel'
  //   );
  // This will not be executed because the /admin namespace is not even connectedby the time this is called, hence it does not get executed at client side. Use setTimeout to get this to execute.
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

io.of('/admin').on('connection', (socket) => {
  console.log('Someone connected to the admin namespace');
  io.of('/admin').emit('welcome', 'Welcome to the admin namespace');
});
