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

    return (
        <ul>
            {contacts.map((contact, index) => (
                <li key={index}>{contact}</li>
            ))}
        </ul>
    );
};

export default ContactsList
