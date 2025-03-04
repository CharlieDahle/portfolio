import React, { useState, useEffect } from 'react';
import ContactItem from './ContactItem';

const ContactsList = ({ onSelectContact, selectedContact }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/usernames');
        if (!response.ok) throw new Error('Failed to fetch contacts');
        const usernames = await response.json();
        setContacts(usernames.map((username, index) => ({
          id: index + 1,
          name: username,
          status: 'Online' // for now 
        })));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="p-3">Loading contacts...</div>;
  if (error) return <div className="p-3 text-danger">Error: {error}</div>;

  return (
    <div className="col-md-4 col-lg-3 border-end d-flex flex-column h-100">
      <div className="p-3 border-bottom sticky-top bg-white">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-secondary">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
      <div className="overflow-auto">
        {filteredContacts.map((contact) => (
          <ContactItem
            key={contact.id}
            name={contact.name}
            status={contact.status}
            isSelected={selectedContact?.id === contact.id}
            onClick={() => onSelectContact(contact)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactsList;