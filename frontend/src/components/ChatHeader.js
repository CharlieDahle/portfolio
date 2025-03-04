import React from 'react';

const ChatHeader = ({ contact }) => (
  <div className="p-3 border-bottom d-flex justify-content-between">
    <div className="d-flex align-items-center">
      <img src="/api/placeholder/40/40" className="rounded-circle me-2" alt="Avatar" />
      <div className="fw-bold">{contact.name}</div>
    </div>
    <div>
      <button className="btn btn-light me-2">
        <i className="fas fa-paperclip"></i>
      </button>
      <button className="btn btn-light">
        <i className="fas fa-cog"></i>
      </button>
    </div>
  </div>
);

export default ChatHeader;