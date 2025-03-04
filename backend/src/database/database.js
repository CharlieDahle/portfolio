const sqlite3 = require('sqlite3').verbose();

// Open or create the database
const db = new sqlite3.Database('./database/database.db', (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

db.run('UPDATE users SET password = "ohyeah" WHERE id = 3', function (err) {
    if (err) {
        console.error('Error updating password:', err);
    } else {
        console.log(`Password updated for user ID 3. Rows affected: ${this.changes}`);
    }
});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    } else {
        console.log('Database connection closed.');
    }
});