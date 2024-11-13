// Import Express
const express = require('express');

// Create an instance of Express
const app = express();

// Set the port
const PORT = 3000;

app.use(express.static('public'));

// Basic route
app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/index`);
});
