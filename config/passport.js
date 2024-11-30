const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;  // Note the .Strategy here
const bcrypt = require('bcryptjs');

// Sample users for authentication (in a real app, replace this with a database)
const users = [
    {
        id: 1,
        username: 'charlie',
        password: 'ohyeah'
    },
    {
        id: 2,
        username: 'daisy',
        password: 'ohyeah'

    }
];

// Create and use the LocalStrategy directly
passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log("Authentication attempt for username:", username);

        // Find user
        const user = users.find(u => u.username === username);

        // If user not found
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        // Check password (in a real app, use bcrypt.compare)
        if (password !== user.password) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }
));

// Serialize user for the session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

module.exports = passport;