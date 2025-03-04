import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import ContactsList from './components/ContactsList';
import ChatWindow from './components/ChatWindow';


// This component wraps protected routes and checks authentication
const PrivateRoute = ({ children }) => {
  const { authenticated } = useAuth();  // Get auth status from context
  return authenticated ? children : <Navigate to="/login" />; // If not authenticated, redirect to login
};

const ChatLayout = () => {
  const [selectedContact, setSelectedContact] = useState(null);
  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">

        <p>heyyyyy</p>
        <ContactsList
          onSelectContact={setSelectedContact}
          selectedContact={selectedContact}
        />
        <ChatWindow
          contact={selectedContact}
        />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* If user goes to /login, show login page */}
          <Route path="/login" element={<Login />} />

          
          
          {/* If user goes to /, show chat interface but only if they're logged in */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ChatLayout /> 
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};



export default App;