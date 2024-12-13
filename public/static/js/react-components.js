
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
                    React.createElement(Messages, { messages: data.messages, username }),
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
                    React.createElement('img', { src: './public/static/images/ram1.png', className: 'rounded-circle', width: '40', height: '40' }),
                    React.createElement('span', { className: 'ms-3' }, username)
                )
            )
        )
    );
};

// Messages Component
const Messages = ({ messages, username }) => {

    const renderMessages = () => {
        return messages.map((message, index) => {
            console.log("Username: " + username);
            console.log("Sender: " + message.sender)
            const isContact = message.sender === username; // Check if the sender is the contact

            return React.createElement(
                'div',
                {
                    key: index,
                    className: isContact ? 'message left' : 'message right', // Different class for left or right alignment
                },
                React.createElement('strong', null, message.sender),
                React.createElement('p', null, message.content),
                React.createElement('small', null, message.sent_at)
            );
        });
    };

    return React.createElement(
        'div',
        { className: 'messages-container' },
        renderMessages()
    );
};


// Initial Render of UserList
ReactDOM.render(React.createElement(UserList), document.getElementById('root'));
