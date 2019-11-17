const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

server.listen(3000);

app.get('/', function (request, respons) {
  respons.sendFile(__dirname + '/index.html');
});

users = [];
connection = [];


io.sockets.on('connection', function(socket) {
    console.log("Успешное соединение");
    connection.push(socket);

    socket.on('disconnect', function (data) {
        connection.splice(connection.indexOf(socket), 1);
        console.log("Откл.");
    });

    socket.on('send mess', function (data) {
       io.sockets.emit('add mess', {mess: data.mess, name: data.name, className: data.className});
    });
});