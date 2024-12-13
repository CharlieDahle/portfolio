
// there should be a message table which stores sender, recepient, content, and the primary key id. 
// The sender and the receipent should be linked to username in the user table. 
// In this file, I will recieve a websocket request containing a sender, recepient, and 
// message content. First, I will log it in the database in the message table. Next,
// I will look up the receipient and add it to their 

// 
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database/database.db');




module.exports = function (app) {




    activeSessions = [];


    // WebSocket route for /hello
    app.ws('/oyster-talk', function (ws, req) {


        activeSessions.push(ws);
        console.log("connection established...");
        console.log("Current connections: " + activeSessions.length);




        ws.on('message', function (msg) {

            console.log('Received message:', msg);

            const messageJSON = JSON.parse(msg);

            const sender = messageJSON.sender;
            const recipient = messageJSON.recipient;
            const content = messageJSON.content;
            const group = messageJSON.group;
            const convo_id = messageJSON.convo_id;


            console.log("Not a group message");




            // Insert message into the message table for non-group message
            const getUserIdQuery = "SELECT id FROM users WHERE username = ?";
            db.get(getUserIdQuery, [sender], (err, row) => {
                if (err) {
                    console.error("Error fetching sender ID:", err);
                    return;
                }

                if (!row) {
                    console.error("No user found with username:", sender);
                    return;
                }

                const senderId = row.id;
                const insertMessageQuery = "INSERT INTO messages (sender_id, conversation_id, content) VALUES (?, ?, ?)";

                console.log("Sender_ID shit: " + senderId + convo_id + content);

                db.run(insertMessageQuery, [senderId, convo_id, content], (err) => {
                    if (err) {
                        console.error("Error inserting message into DB:", err);
                    } else {
                        console.log("Message inserted successfully.");
                    }
                });
            });



            // log 



            //ws.send('Message received: ' + msg);  // Send message back
            // broadcastMessage(msg);
        });

        ws.on('close', () => {
            //activeSessions.remove(ws)

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