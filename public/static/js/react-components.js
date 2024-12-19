
/**
 * Rendering contacts:
 * - get usernames from /api/usernames
 * - figured out how react works lol 
 * - ???
 */

const { useState, useEffect } = React;

export default function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [messages, setMessages] = useState([]);
    const [selectedContact, setSelectedContact] = useState(null);

    // Fetch contacts on component mount
    useEffect(() => {
        fetch('/api/usernames', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                setContacts(data);
                setLoading(false);
            });
    }, []);

    // Fetch messages when selectedContact changes
    useEffect(() => {
        if (selectedContact) {
            fetch('/api/convo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contact: selectedContact }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setMessages(data);
                });
        }
    }, [selectedContact]);

    if (loading) {
        return React.createElement('p', null, 'Loading...');
    }

    // Create the messages section if there's a selected contact
    const messagesSection = selectedContact && messages.length > 0
        ? React.createElement(
            'div',
            { className: 'messages-container mt-3' },
            React.createElement('h5', null, `Conversation with ${selectedContact}`),
            messages.map((message, index) =>
                React.createElement(
                    'div',
                    {
                        key: index,
                        className: 'message'
                    },
                    React.createElement('p', null, message.content)
                )
            )
        )
        : null;

    // Main component render
    return React.createElement(
        'div',
        { className: 'd-flex flex-column p-3 bg-light' },
        React.createElement('h4', null, 'Contacts'),
        React.createElement(
            'div',
            { className: 'list-group' },
            contacts.map((contact, index) =>
                React.createElement(
                    'a',
                    {
                        key: index,
                        href: '#',
                        className: 'list-group-item list-group-item-action d-flex align-items-center',
                        onClick: () => setSelectedContact(contact),
                    },
                    React.createElement('span', { className: 'ms-3' }, contact)
                )
            )
        ),
        messagesSection
    );
}

// Render the component
ReactDOM.render(React.createElement(Contacts), document.getElementById('root'));


        /**
         * 
         * 
         * 
         * 
         * for message in messages {
              Re
            
            }
        
         * 
         */




    }
};






ReactDOM.render(React.createElement(Contacts), document.getElementById('root'));

/////////





// // this creates the contacts
// const UserList = () => {
//     const [usernames, setUsernames] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {   // db query for usernames
//         const fetchUsernames = async () => {
//             console.log("here");
//             try {
//                 const response = await fetch('/api/usernames');
//                 const data = await response.json();
//                 setUsernames(data);
//             } catch (error) {
//                 console.error('Error:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUsernames();
//     }, []);

//     const handleUserClick = (username) => {
//         // Fetch conversation data on user click
// fetch('/api/convo', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({ username }),
// })
//             .then(response => response.json())
//             .then(data => {
//                 document.getElementById("convo_id").innerText = "Convo ID: " + data.convo_id;
//                 document.getElementById("convo_id").setAttribute("value", data.convo_id);

//                 console.log(data.messages);

//                 // Update messages
//                 ReactDOM.render(
//                     React.createElement(renderMessage, { messages: data.messages, username }),
//                     document.getElementById('chat_window')
//                 );
//             })
//             .catch(error => console.log('Error:', error));
//     };

//     if (loading) return React.createElement('div', null, 'Loading...');
//     if (usernames.length === 0) return React.createElement('div', null, 'No users found');

//     return React.createElement(
//         'div',
//         { className: 'd-flex flex-column p-3 bg-light' },
//         React.createElement('h4', null, 'Contacts'),
//         React.createElement(
//             'div',
//             { className: 'list-group' },
//             usernames.map((username, index) =>
//                 React.createElement(
//                     'a',
//                     {
//                         key: index,
//                         href: '#',
//                         className: 'list-group-item list-group-item-action d-flex align-items-center',
//                         onClick: () => handleUserClick(username),
//                     },
//                     //  React.createElement('img', { src: '', className: 'rounded-circle', width: '40', height: '40' }),
//                     React.createElement('span', { className: 'ms-3' }, username)
//                 )
//             )
//         )
//     );
// };

// function renderMessage(sender, message, sent_at) {
//     const bubbleClass = sender ? 'message-bubble right' : 'message-bubble left';

//     const MessageComponent = () => {
//         return React.createElement(
//             'div',
//             { className: bubbleClass },
//             React.createElement('p', null, message),
//             React.createElement('span', { className: 'timestamp' }, sent_at)
//         );
//     };

//     // Render the component to the #messages container
//     const messagesContainer = document.getElementById('chat_window');
//     const wrapper = document.createElement('div'); // Create a wrapper for each message
//     messagesContainer.appendChild(wrapper); // Append wrapper to container

//     ReactDOM.render(
//         React.createElement(MessageComponent, null),
//         wrapper
//     );
// }

// function processMessages(messages, username) {
//     messages.forEach(msg => {
//         const isSender = msg.sender === username;
//         const formattedSentAt = new Date(msg.sent_at).toLocaleString();
//         renderMessage(isSender, msg.content, formattedSentAt);
//         renderMessage(isSender, msg.content, msg.sent_at);
//     });
// }






// // Messages Component

// const Messages = ({ messages, username }) => {

//     const renderMessages = () => {
//         return messages.map((message, index) => {


//             const isContact = message.sender === username; // Check if the sender is the contact

//             return React.createElement(
//                 'div',
//                 {
//                     key: index,
//                     className: isContact ? 'message left' : 'message right', // Different class for left or right alignment
//                 },
//                 React.createElement('strong', null, message.sender),
//                 React.createElement('p', null, message.content),
//                 React.createElement('small', null, message.sent_at)
//             );
//         });
//     };

//     return React.createElement(
//         'div',
//         { className: 'messages-container' },
//         renderMessages()
//     );
// };


// get the message that is sent, create a


// Initial Render of UserList


// ReactDOM.render(React.createElement(UserList), document.getElementById('root'));
