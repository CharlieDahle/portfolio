
const { useState, useEffect } = React;
// UserList Component
const UserList = () => {
    const [usernames, setUsernames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsernames = async () => {
            try {
                const response = await fetch('/api/usernames');
                const data = await response.json();
                setUsernames(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsernames();
    }, []);

    const handleUserClick = (username) => {
        // Fetch conversation data on user click
        fetch('/api/convo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username }),
        })
            .then(response => response.json())
            .then(data => {
                document.getElementById("convo_id").innerText = "Convo ID: " + data.convo_id;
                document.getElementById("convo_id").setAttribute("value", data.convo_id);

                console.log(data.messages);

                // Update messages
                ReactDOM.render(
                    React.createElement(ProcessMessage, { messages: data.messages, username }),
                    document.getElementById('chat_window')
                );
            })
            .catch(error => console.log('Error:', error));
    };

    if (loading) return React.createElement('div', null, 'Loading...');
    if (usernames.length === 0) return React.createElement('div', null, 'No users found');

    return React.createElement(
        'div',
        { className: 'd-flex flex-column p-3 bg-light' },
        React.createElement('h4', null, 'Contacts'),
        React.createElement(
            'div',
            { className: 'list-group' },
            usernames.map((username, index) =>
                React.createElement(
                    'a',
                    {
                        key: index,
                        href: '#',
                        className: 'list-group-item list-group-item-action d-flex align-items-center',
                        onClick: () => handleUserClick(username),
                    },
                    //  React.createElement('img', { src: '', className: 'rounded-circle', width: '40', height: '40' }),
                    React.createElement('span', { className: 'ms-3' }, username)
                )
            )
        )
    );
};

function renderMessage(sender, message, sent_at) {
    const bubbleClass = sender ? 'message-bubble right' : 'message-bubble left';

    // React component to render the message
    const MessageComponent = () => (
        <div className={bubbleClass}>
            <p>{message}</p>
            <span className="timestamp">{sent_at}</span>
        </div>
    );

    // Render the component to the #messages container
    const messagesContainer = document.getElementById('messages');
    const wrapper = document.createElement('div'); // Create a wrapper for each message
    messagesContainer.appendChild(wrapper); // Append wrapper to container

    ReactDOM.render(<MessageComponent />, wrapper);
}

function ProcessMessage({ messages, username }) {
    return (
        <div>
            {messages.map((msg, index) => (
                <div
                    key={index}
                    className={msg.sender === username ? 'message-bubble right' : 'message-bubble left'}
                >
                    <p>{msg.content}</p>
                    <span className="timestamp">{msg.sent_at}</span>
                </div>
            ))}
        </div>
    );
}

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
ReactDOM.render(React.createElement(UserList), document.getElementById('root'));
