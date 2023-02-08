const socket = io('http://localhost:9000'); // the / endpoint
const socket2 = io('http://localhost:9000/admin');
socket.on('connect', () => {
  console.log('First Socket', socket.id);
});

socket2.on('connect', () => {
  console.log('Second Socket for /admin', socket2.id);
});

socket2.on('welcome', (msg) => {
  console.log(msg);
});

socket.on('messageFromServer', (dataFromServer) => {
  console.log(dataFromServer);
  // socket.emit('messageToServer', { data: 'This is from the client' });
});

socket.on('messageToClients', (msg) => {
  document.querySelector('#messages').innerHTML += `<li>${msg.text}</li>`;
});

document.querySelector('#message-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const newMessage = document.querySelector('#user-message').value;
  socket.emit('newMessageToServer', { text: newMessage });
});
//   socket.on('ping', () => {
//     console.log('Ping was received from the server');
//   });

//   socket.on('pong', (latency) => {
//     console.log(latency);
//     console.log('Pong was sent to the server');
//   });

//   socket.io.engine.on('packet', (packet) => {
//     if (packet.type === 'ping') {
//       console.log('socket.io.engine.on packet if ping has been hit');
//       console.log('ping');
//     }
//   });

//   socket.io.engine.on('pong', (latency) => {
//     console.log('socket.io.engine.on pong has been hit');
//     console.log('Latency', latency);
//     console.log('pong');
//   });
