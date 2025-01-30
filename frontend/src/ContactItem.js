import React from 'react';

const ContactItem = ({ name, status, isSelected, onClick }) => (
  <div 
    className={`p-3 border-bottom ${isSelected ? 'bg-light' : ''}`}
    onClick={onClick}
    style={{ cursor: 'pointer' }}
  >
    <div className="d-flex">
      <img src="/api/placeholder/40/40" className="rounded-circle me-2" alt="Avatar" />
      <div>
        <div className="fw-bold">{name}</div>
        <small className="text-muted">{status}</small>
      </div>
    </div>
  </div>
);

export default ContactItem;