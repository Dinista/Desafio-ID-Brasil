import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  
  const navigate = useNavigate();

  // Inicializando localStorage
  // Return String OR Null
  
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // Atualizando o localStorage

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = (userData) => {
    // User data {name, e-mail, userRule}
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    navigate("/login")
  };

  const isAdmin = () => {
    // Check admin
    // Return True OR False
    return user?.userRole === 'Admin';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
