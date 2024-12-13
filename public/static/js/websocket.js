// Create a new WebSocket connection to the server
const socket = new WebSocket('ws://localhost:3000/oyster-talk');

// Listen for messages from the server
socket.onmessage = function (event) {
    const messages = document.getElementById('messages');
    messages.value += `Server: ${event.data}\n`;  // Display the received message
};

// Handle connection open event
socket.onopen = function () {
    console.log('Connected to WebSocket server');
};

// Handle connection close event
socket.onclose = function () {
    console.log('Disconnected from WebSocket server');
};

// Function to send a message to the server
function sendMessage() {
    const inputMessage = document.getElementById('inputMessage').value;
    const convo_id = document.getElementById("convo_id").getAttribute("value");

    console.log(convo_id);

    let messageToSend = {
        'group': 'false',
        'sender': 'charlie',
        'recipient': 'daisy',
        'content': inputMessage,
        'convo_id': convo_id,
    }

    const jsonString = JSON.stringify(messageToSend);

    socket.send(jsonString);  // Send message to the server
    document.getElementById('inputMessage').value = '';  // Clear the input field
}

window.sendMessage = sendMessage;