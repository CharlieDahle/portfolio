import React from 'react';

const MessagesList = ({ messages }) => (
 <div className="p-3 flex-grow-1 overflow-auto bg-light">
   {messages.map(message => (
     <div 
       key={message.id}
       className={`mb-3 w-75 ${message.sender === 'me' ? 'ms-auto' : ''}`}
     >
       <div className={`card ${message.sender === 'me' ? 'bg-primary text-white' : ''}`}>
         <div className="card-body">
           <p className="mb-1">{message.text}</p>
           <small className={message.sender === 'me' ? 'text-white-50' : 'text-muted'}>
             {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           </small>
         </div>
       </div>
     </div>
   ))}
 </div>
);

export default MessagesList;