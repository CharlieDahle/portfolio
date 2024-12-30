// function ContactList(){
//     return <h1 id='bruh'>bruh</h1>
// }

export default ContactList



function Contacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedContact, setSelectedContact] = useState(null);

    useEffect(() => {
        fetch('/api/usernames', { method: 'GET' })
            .then((response) => response.json())
            .then((data) => {
                setContacts(data);
                setLoading(false);
            });
    }, []);

    console.log

    if (loading) {
        return <h1>loading</h1>
    }

    return 
};