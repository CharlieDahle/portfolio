import React, { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
 const [message, setMessage] = useState('');

 const handleSubmit = (e) => {
   e.preventDefault();
   onSendMessage(message);
   setMessage('');
 };

 return (
   <div className="p-3 border-top">
     <form onSubmit={handleSubmit} className="input-group">
       <button type="button" className="btn btn-outline-secondary">
         <i className="fas fa-paperclip"></i>
       </button>
       <input
         type="text"
         className="form-control"
         placeholder="Type a message..."
         value={message}
         onChange={(e) => setMessage(e.target.value)}
       />
       <button type="submit" className="btn btn-primary">
         <i className="fas fa-paper-plane"></i>
       </button>
     </form>
   </div>
 );
};

export default ChatInput;