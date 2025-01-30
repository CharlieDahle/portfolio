import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import MessagesList from './MessagesList';
import ChatInput from './ChatInput';

const ChatWindow = ({ contact }) => {
  const [messages, setMessages] = useState([]);
  
  const sendMessage = (text) => {
    if (!text.trim()) return;
    
    setMessages([...messages, {
      id: Date.now(),
      text,
      timestamp: new Date(),
      sender: 'me'
    }]);
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
      <MessagesList messages={messages} />
      <ChatInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatWindow;