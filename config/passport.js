const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;  // Note the .Strategy here
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db');


// Create and use the LocalStrategy directly
passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("Authentication attempt for username:", username);

        // Query the database for the user
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
            if (err) {
                console.error('Database error:', err);
                return done(err); // Pass the error to Passport
            }

            if (!user) {
                console.log('User not found');
                return done(null, false, { message: 'Incorrect username.' });
            }

            // Compare the plain text passwords (not recommended for production)
            if (user.password !== password) {
                console.log('Incorrect password');
                return done(null, false, { message: 'Incorrect password.' });
            }

            // Successful authentication
            console.log('Authentication successful');
            return done(null, user);
        });
    }
));
// Serialize user for the session
passport.serializeUser((user, done) => {
    done(null, user.id); // Store the user ID in the session
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
    // Query the database to retrieve the user by ID
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
        if (err) {
            console.error('Database error:', err);
            return done(err);
        }

        if (!user) {
            return done(null, false); // User not found
        }

        done(null, user); // Pass the user object to the session
    });
});

module.exports = passport;