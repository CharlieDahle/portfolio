// function ContactList(){
//     return <h1 id='bruh'>bruh</h1>
// }

import React, { useState, useEffect } from 'react';

function ContactsList() {
    // const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetch('/api/usernames', { method: 'GET' })
            .then((response) => {
                console.log("Check it: ")
                console.log(response);
                return response.text(); // Use `.text()` to inspect the raw response
            })
            .then((data) => {
                // console.log(data);
                // // Optional: Try parsing the JSON here to see the issue
                // try {
                //     const jsonData = JSON.parse(data);
                //     console.log(jsonData);
                // } catch (err) {
                //     console.error('JSON Parse Error:', err);
                // }
            });
    }, []);




    return <p>poop fart</p>
};

export default ContactsList
