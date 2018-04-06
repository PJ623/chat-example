// Code pretty much copied from the Socket.io chat tutorial: https://socket.io/get-started/chat/

var app = require("express")();
const port = 3000;
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

http.listen(port, () => {
    console.log("Server started on port " + port + "... press CTRL+C to close.");
});