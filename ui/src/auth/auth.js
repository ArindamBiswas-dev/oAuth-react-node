import React, { useContext, useState } from 'react';

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = {
    user,
  };

  return (
    <AuthContext.Provider value={value}>{{ children }}</AuthContext.Provider>
  );
}
