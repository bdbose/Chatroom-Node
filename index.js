const express = require('express');
const app = express();
const options = {
  cors: true,
};

const http = require('http').createServer(app);
const io = require('socket.io')(http, options);

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('join', (data, callback) => {
    socket.join('global');
    io.to('global').emit('getMessage', {
      username: 'Admin',
      message: `${data.username} has joined!`,
    });
    callback();
  });
  socket.on('sendMessage', (data) => {
    // console.log(dat);
    io.to('global').emit('getMessage', {
      username: data.username,
      message: data.message,
    });
  });
});

http.listen(process.env.PORT || 4040, () => {
  console.log('Server is up!');
});
