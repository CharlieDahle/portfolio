
// there should be a message table which stores sender, recepient, content, and the primary key id. 
// The sender and the receipent should be linked to username is the user table. 
// In this file, I will recieve a websocket request containing a sender, recepient, and 
// message content. I will pass on the message to any user 



const expressWs = require('express-ws');

activeSessions = [];

module.exports = function (app) {
    expressWs(app);  // Integrates express-ws with the app

    // WebSocket route for /hello
    app.ws('/oyster-talk', function (ws, req) {


        activeSessions.push(ws);
        console.log('New connection established');




        ws.on('message', function (msg) {
            // console.log('Received message:', msg);

            const messageJSON = JSON.parse(msg);
            // console.log(parsedObject);

            const sender = messageJSON.sender;
            const recipient = messageJSON.recipient;
            const content = messageJSON.content;




            //ws.send('Message received: ' + msg);  // Send message back
            // broadcastMessage(msg);
        });

        ws.on('close', () => {
            console.log('Connection closed');
        });
    });

    function broadcastMessage(message) {
        // Send the message to all active WebSocket connections
        activeSessions.forEach(session => {
            session.send(JSON.stringify({ from: 'server', message: message }));
        });
    }

    // Add more WebSocket routes here as needed
};