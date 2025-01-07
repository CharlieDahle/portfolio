// function ContactList(){
//     return <h1 id='bruh'>bruh</h1>
// }

import React, { useState, useEffect } from 'react';

function ContactsList() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('/api/usernames', { method: 'GET' })
            .then((response) => response.json()) // Parse the response as JSON
            .then((data) => {
                console.log(data); // Log the parsed data
                setContacts(data); // Update state with the returned array
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const contactItems = contacts.map((contact, index) => (
        <a key={index} className="list-group-item list-group-item-action">
            
            
            <div>


                

                <div className="card-body d-flex align-items-center p-3">
                    {/* Contact Photo */}
                    <div className="flex-shrink-0">
                        <img
                            src={`/api/placeholder/48/48`} // Placeholder image
                            className="rounded-circle"
                            width="48"
                            height="48"

                        />
                    </div>
                    {/* Contact Info */}
                    <div className="ms-3 flex-grow-1">
                        <h6 className="mb-0 fw-bold">{contact}</h6>

                        <p className="mb-0 text-muted text-truncate">
                            {contact.message || 'Omg I can\'t beli...'}
                        </p>
                    </div>
                    {/* Timestamp */}
                    <small className="text-muted ms-auto">N/A</small>
                </div>
            </div>
        </a>
    ));

    return <div className="list-group">{contactItems}</div>;
};

export default ContactsList
