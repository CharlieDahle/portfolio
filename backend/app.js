const express = require('express');  // Import Express
const sqlite3 = require('sqlite3').verbose();
const JWTService = require('./src/services/jwt.service');
const { authenticateToken } = require('./src/middleware/auth.middleware');
const db = new sqlite3.Database('./src/database/database.db');
const messageRoutes = require('./src/websocket/message');  // Import WebSocket logic
const expressWs = require("express-ws");

// Create an instance of Express
const app = express();
expressWs(app);  // Integrates express-ws with the app
messageRoutes(app);  // Call the WebSocket route handling

// Set the port
const PORT = 5001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));


// Basic route
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/trying`);
});

app.get('/trying', (req, res) => {
    res.sendFile(__dirname + 'trying.html');

});

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/private/chat.html');
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    db.get(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password],
      (err, user) => {
        if (err) {
          return res.status(500).json({ error: 'Database error' });
        }
        
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
  
        const payload = {
          id: user.id,
          username: user.username
        };
  
        const token = JWTService.generateToken(payload);
        res.json({ token });
      }
    );
});

// Protected route example
app.get('/protected', authenticateToken, (req, res) => {
    res.json({ 
      message: 'Protected route accessed successfully', 
      user: req.user 
    });
  });


app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) return next(err);
        res.redirect('/trying');  // Redirect to login page after logout
    });
});



app.get('/api/usernames', (req, res) => {
    db.all("SELECT username FROM users", (err, rows) => {
        if (err) {
            return res.status(500).json({ error: 'Database error' });
        }
        const usernames = rows.map(row => row.username);
        res.json(usernames);
    });
});

app.post('/api/convo', (req, res) => {

    if (!req.isAuthenticated()) {
        return res.status(401).json({ error: 'Not authenticated' });
    }

    const username = req.body.contact;
    const currentUser = req.user.username;  // Get the logged-in user's username

    console.log(currentUser + " viewing convo with " + username);



    // Step 1: Find the conversation ID between these two users
    const findConvoQuery = `
        SELECT c.id 
        FROM conversations c
        JOIN conversation_participants cp1 ON c.id = cp1.conversation_id
        JOIN conversation_participants cp2 ON c.id = cp2.conversation_id
        WHERE cp1.user_id = (SELECT id FROM users WHERE username = ?) 
        AND cp2.user_id = (SELECT id FROM users WHERE username = ?)
    `;

    db.get(findConvoQuery, [currentUser, username], (err, convo) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        if (!convo) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        const convoId = convo.id;

        // Step 2: Get the last 20 messages for this conversation
        const getMessagesQuery = `
            SELECT m.content, m.sent_at, u.username AS sender
            FROM messages m
            JOIN users u ON m.sender_id = u.id
            WHERE m.conversation_id = ?
            ORDER BY m.sent_at DESC
            LIMIT 20
        `;

        db.all(getMessagesQuery, [convoId], (err, messages) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }

            // Log messages to inspect the data structure
            console.log("Fetched messages:", messages);

            if (!Array.isArray(messages)) {
                console.error("Expected an array, but got:", messages);
                return res.status(500).json({ error: 'Invalid messages format' });
            }


            // Step 3: Return the messages and the conversation ID in JSON format
            res.json({
                convo_id: convoId,
                messages: messages.reverse()  // Reverse to return messages in correct order
            });
        });
    });
});




