import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  // Function to handle login
  const login = async (username, password) => {
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setAuthenticated(true);
      
      // You might want to decode the JWT to get user info
      // setUser(decoded user info from token);
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setAuthenticated(false);
    setUser(null);
  };

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (!token) {
        setAuthenticated(false);
        return;
      }

      try {
        // Verify token by making a request to a protected endpoint
        const response = await fetch('/protected', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          setAuthenticated(true);
        } else {
          // Token is invalid
          logout();
        }
      } catch (error) {
        console.error('Auth check error:', error);
        logout();
      }
    };

    checkAuth();
  }, [token]);

  if (authenticated === null) {
    return <div>Loading...</div>;
  }

  const contextValue = {
    authenticated,
    token,
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};