// function ContactList(){
//     return <h1 id='bruh'>bruh</h1>
// }

// export default ContactList



// const { useState, useEffect } = React;
// // import Messages from '/static/js/messages';  // Adjusted path to the messages.js file



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


    const contactItems = contacts.map((contact, index) =>
        React.createElement(
            'a',
            {
                key: index,
                href: '#',
                className: 'list-group-item list-group-item-action',
                onClick: () => setSelectedContact(contact),
            },
            React.createElement(
                'div',
                { className: 'card border-0 contact-card' },
                React.createElement(
                    'div',
                    { className: 'card-body d-flex align-items-center p-3' },
                    // Contact Photo
                    React.createElement(
                        'div',
                        { className: 'flex-shrink-0' },
                        React.createElement('img', {
                            src: `/api/placeholder/48/48`, // Placeholder image
                            className: 'rounded-circle',
                            width: '48',
                            height: '48',
                        })
                    ),
                    // Contact Info
                    React.createElement(
                        'div',
                        { className: 'ms-3 flex-grow-1' },
                        React.createElement(
                            'h6',
                            { className: 'mb-0 fw-bold' },
                            contact // Use contact's name dynamically
                        ),
                        // React.createElement(
                        //     'p',
                        //     { className: 'mb-0 text-muted text-truncate' },
                        //     contact.message || 'No message' // Fallback for message
                        // )
                    ),
                    // Timestamp
                    React.createElement(
                        'small',
                        { className: 'text-muted ms-auto' }, 'N/A' // Fallback for timestamp
                    )
                )
            )
        )
    );



//     return React.createElement(
//         'div',
//         { className: 'd-flex flex-column p-3 bg-light' },
//         React.createElement('h4', null, 'Contacts'),
//         React.createElement('div', { className: 'list-group' }, ...contactItems)
//     );
// }

