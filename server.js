/**
 * This is the main Node.js server script for your project
 */

const express = require('express');
const app = express();
const server = app.listen(process.env.PORT | 3000);

app.use(express.static('public'));

const socket = require('socket.io');
const io = socket(server);

// this is a callback function for when the server is finished setting up.
// you probably won't need to alter code anywhere else in this file.
// here, we set up the callback to establish a socket connection with a
// client as they appear.
io.on("connection", function (socket) {
    console.log("\n" + socket.id + " is attempting connection...");

    io.emit("connected", socket.id);

    // set up event listeners for this new socket connection
    // to receive other invites

    // TODO: add your own socket.on events for different interactions
    // in your app, if needed.
    
    socket.on("sendData", onSendData);
    function onSendData(data) {
      
      // this simple event function recognizes when it receives
      // a "sendData" message from a client, and just sends that
      // data out to other connected clients as-is.
      
      // goes only to OTHER clients (not the one that sent)
      //socket.broadcast.emit('receiveData', data);

      // goes to all clients, including one who sent
      io.emit("receiveData", data);
      
      // note: this is a server side console, and will show up in the
      // glitch LOGS tab at the bottom of the screen -- but not the client's
      // console in their browser's developer tools.
      console.log(data);
    }

    // when the user disconnects.. perform this
    socket.on("disconnect", () => {});
});



