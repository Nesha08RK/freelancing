import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user'); // Retrieve the full user object

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        const decoded = JSON.parse(atob(token.split('.')[1]));
        const expiry = decoded.exp * 1000; // Convert to milliseconds
        if (Date.now() >= expiry) {
          logout(); // Token expired
        } else {
          setUser(parsedUser); // Set the full user object
        }
      } catch (err) {
        console.error('Error processing token or user data:', err);
        logout();
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token); // Store token
      localStorage.setItem('user', JSON.stringify(user)); // Store the full user object
      setUser(user); // Update user state with the full user object
      return true;
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Remove the stored user object
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);