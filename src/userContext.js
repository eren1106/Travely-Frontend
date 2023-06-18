import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUsers] = useState({});

  // Retrieve user object from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUsers(JSON.parse(storedUser));
      console.log('Retrieved user from localStorage:', JSON.parse(storedUser));
    }
  }, []);
  
  return (
    <UserContext.Provider value={{ user, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};