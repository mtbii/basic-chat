var path = require('path');
var express = require('express');
var app = express();
//var http = require('http').Server(app);
//var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(path.join(__dirname, '/public')));
app.use('/libs', express.static(path.join(__dirname, 'bower_components')));

app.get('/', function (request, response) {
    response.send(path.join(__dirname, 'public', 'index.html'));
});

var io = require('socket.io').listen(app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
}));

io.sockets.on('connection', function (socket) {
    socket.emit('message', {
        user: {
            name: 'ChatUp!',
        },
        text: 'Welcome to the chat!',
        date: new Date()
    });

    socket.on('ready', function (data) {
        console.log('New user : ' + data.user);
        io.sockets.emit('message', {
            user: {
                name: 'ChatUp!',
                avatar: ''
            },
            text: 'New user joined: ' + data.user,
            date: new Date()
        });
    });

    socket.on('disconnect', function (evt) {
        console.log('Disconnect');
        console.log(evt);
    });

    socket.on('send', function (data) {
        console.log(data.user.name + ' : ' + data.text);
        socket.broadcast.emit('message', data);
    })
});