import React, { useState } from 'react';
import ContactsList from './ContactsList';
import ChatWindow from './ChatWindow';

const App = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        <ContactsList 
          onSelectContact={setSelectedContact}
          selectedContact={selectedContact}
        />
        <ChatWindow 
          contact={selectedContact}
        />
      </div>
    </div>
  );
};

export default App;