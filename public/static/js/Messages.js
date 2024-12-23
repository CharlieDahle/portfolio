// Messages.js
import React, { useState, useEffect } from 'react';

export default function Messages({ selectedContact }) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (selectedContact) {
            fetch('/api/convo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contact: selectedContact }),
            })
                .then((response) => response.json())
                .then((data) => setMessages(data));
        }
    }, [selectedContact]);

    const messageItems = messages.map((message, index) =>
        React.createElement(
            'div',
            { key: index, className: 'message' },
            React.createElement('p', null, message.content)
        )
    );

    return React.createElement(
        'div',
        { id: 'chat_window', style: { height: '78vh', overflowY: 'auto' } },
        ...messageItems
    );
}