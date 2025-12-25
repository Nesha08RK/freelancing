import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from "../config";


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
    const response = await axios.post(
      `${API_BASE_URL}/api/login`,
      { email, password },
      { headers: { "Content-Type": "application/json" } }
    );

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);

    return true;
  } catch (err) {
    console.error("Login error:", err.response?.data?.message || err.message);
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