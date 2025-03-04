import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';

const ChatWindow = ({ contact }) => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (contact) {
      fetchMessages();
    }
  }, [contact]);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/convo', {
        method: 'POST',
        credentials: 'same-origin', // This is crucial for sending the session cookie
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contact: contact.name })
      });

      if (!response.ok) {
        if (response.status === 401) {
          // If not authenticated, redirect to your existing login page
          window.location.href = '/trying';
          return;
        }
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      setMessages(data.messages.map(msg => ({
        id: msg.sent_at,
        text: msg.content,
        timestamp: new Date(msg.sent_at),
        sender: msg.sender === contact.name ? 'them' : 'me'
      })));
    } catch (err) {
      setError(err.message);
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    
    // Optimistically add message to UI
    const newMessage = {
      id: Date.now(),
      text,
      timestamp: new Date(),
      sender: 'me'
    };
    
    setMessages(prev => [...prev, newMessage]);

    try {
      // You'll need to create this endpoint in your Express backend
      const response = await fetch('/api/messages', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipient: contact.name,
          content: text
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }
    } catch (err) {
      setError(err.message);
      // Remove the message from UI if sending failed
      setMessages(prev => prev.filter(msg => msg.id !== newMessage.id));
    }
  };

  if (!contact) {
    return (
      <div className="col-md-8 col-lg-9 d-flex flex-column h-100 justify-content-center align-items-center">
        <h3 className="text-muted">Select a contact to start chatting</h3>
      </div>
    );
  }

  return (
    <div className="col-md-8 col-lg-9 d-flex flex-column h-100">
      <ChatHeader contact={contact} />
      {error && <div className="alert alert-danger m-2">{error}</div>}
      <MessagesList messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;