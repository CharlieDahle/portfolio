const express = require('express');  // Import Express
const session = require('express-session');  // Import session middleware
const passport = require('./config/passport');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');
const messageRoutes = require('./message');  // Import WebSocket logic
const expressWs = require("express-ws");

// Create an instance of Express
const app = express();
expressWs(app);  // Integrates express-ws with the app
messageRoutes(app);  // Call the WebSocket route handling

// Set the port
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static('public'));

/** ========== Passport stuff =========== */

app.use(session({
    secret: 'key',  // Secret key used to sign the session ID cookie 
    resave: false,  // Don't save session if unmodified
    saveUninitialized: false  // Don't create a session until something is stored
}));
// Initialize Passport to manage authentication
app.use(passport.initialize());
// Initialize Passport session handling (used to store user info in the session)
app.use(passport.session());

/** ===================================== */


// Basic route
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/index`);
});

app.get('/trying', (req, res) => {
    res.sendFile(__dirname + '/public/trying.html');

});

app.get('/chat', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/private/chat.html');
});

// POST route to handle login form submission
app.post('/login',
    passport.authenticate('local',
        {
            successRedirect: '/chat',
            failureRedirect: '/trying'
        })
);


// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();  // Continue to the dashboard if authenticated
    }
    res.redirect('/trying');  // Redirect to login page if not authenticated
}

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
