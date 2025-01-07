import './App.css';
import ContactsList from './ContactList';

function App() {
  return (
    <div>     
      <ContactsList style={{ overflowY: 'scroll' }}></ContactsList>
    </div>
  );
}

export default App;
