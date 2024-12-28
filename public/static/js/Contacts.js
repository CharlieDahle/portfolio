
// const { useState, useEffect } = React;

// import Messages from '/static/js/messages';  // Adjusted path to the messages.js file

// export default function Contacts() {
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
//                 className: 'list-group-item list-group-item-action d-flex align-items-center',
//                 onClick: () => setSelectedContact(contact),
//             },
//             React.createElement('span', { className: 'ms-3' }, contact)
//         )
//     );

//     return React.createElement(
//         'div',
//         { className: 'd-flex flex-column p-3 bg-light' },
//         React.createElement('h4', null, 'Contacts'),
//         React.createElement('div', { className: 'list-group' }, ...contactItems),
//         selectedContact && React.createElement(Messages, { selectedContact })
//     );
// }

