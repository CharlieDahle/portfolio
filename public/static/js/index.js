import React from 'react'
import ReactDOM from 'react-dom/client'
import ContactList from './Contacts'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ContactList />
    </React.StrictMode>
);


// import React from "https://cdn.skypack.dev/react@18";
// import ReactDOM from "https://cdn.skypack.dev/react-dom@18";

// const { useState, useEffect } = React;



// function Contacts() {
//     const [contacts, setContacts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [selectedContact, setSelectedContact] = useState(null);

//     useEffect(() => {
//         fetch('/api/usernames', { method: 'GET' })
//             .then((response) => response.json())
//             .then((data) => {
//                 setContacts(data);
//                 setLoading(false);
//             });
//     }, []);

//     if (loading) {
//         return React.createElement('p', null, 'Loading...');
//     }

//     const contactItems = contacts.map((contact, index) =>
//         React.createElement(
//             'a',
//             {
//                 key: index,
//                 href: '#',
//                 className: 'list-group-item list-group-item-action',
//                 onClick: () => setSelectedContact(contact),
//             },
//             React.createElement(
//                 'div',
//                 { className: 'border-0' },
//                 React.createElement(
//                     'div',
//                     { className: 'card-body d-flex align-items-center p-2' },
//                     React.createElement(
//                         'div',
//                         { className: 'flex-shrink-0' },
//                         React.createElement('img', {
//                             src: `/api/placeholder/48/48`,
//                             className: 'rounded-circle',
//                             width: '48',
//                             height: '48',
//                         })
//                     ),
//                     React.createElement(
//                         'div',
//                         { className: 'ms-3 flex-grow-1' },
//                         React.createElement(
//                             'h6',
//                             { className: 'mb-0 fw-bold' },
//                             contact
//                         ),
//                         React.createElement(
//                             'small',
//                             { className: 'text-muted ms-auto' },
//                             'last message was a b...'
//                         )
//                     ),
//                     React.createElement(
//                         'small',
//                         { className: 'text-muted ms-auto' },
//                         'N/A'
//                     )
//                 )
//             )
//         )
//     );

//     // Define the Messages component here
//     function Messages({ selectedContact }) {
//         const [messages, setMessages] = useState([]);

//         useEffect(() => {
//             if (selectedContact) {
//                 fetch('/api/convo', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ contact: selectedContact }),
//                 })
//                     .then((response) => response.json())
//                     .then((data) => setMessages(data.messages));
//             }
//         }, [selectedContact]);

//         console.log(messages);


//         const messageItems = messages.map((message, index) =>
//             React.createElement(
//                 'div',
//                 { key: index, className: 'message' },
//                 React.createElement(
//                     'p',
//                     null,
//                     React.createElement('strong', null, message.sender),  // Display sender's name
//                     ': ',
//                     message.content // Display the message content
//                 ),
//                 React.createElement(
//                     'small',
//                     { className: 'text-muted' },
//                     message.sent_at // Display timestamp of the message
//                 )
//             )
//         );

//         return React.createElement(
//             'div',
//             { id: 'chat_window', style: { height: '78vh', overflowY: 'auto' } },
//             ...messageItems  // Spread the array of message elements here
//         );
//     }
//     // Dynamically render Contacts component in the contacts_list div
//     const contactContainer = document.getElementById('contacts_list');
//     if (contactContainer) {
//         ReactDOM.render(React.createElement(Contacts), contactContainer);
//     }

//     // Dynamically render Messages component in the chat_window div
//     const chatContainer = document.getElementById('chat_window');
//     if (chatContainer && selectedContact) {
//         ReactDOM.render(React.createElement(Messages, { selectedContact }), chatContainer);
//     }

//     return null;  // We're rendering directly to the container, so return null here
// }

// // Ensure the Contacts component is rendered in the #contacts_list div
// const contactContainer = document.getElementById('contacts_list');
// if (contactContainer) {
//     ReactDOM.render(React.createElement(Contacts), contactContainer);
// }