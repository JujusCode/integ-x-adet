import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null means logged out
  const [isAdmin, setIsAdmin] = useState(false);

  // Mock functions (we will replace these with real Django API calls later)
  const login = (userData) => {
    setUser(userData);
    // For now, if they login with admin@vault.com, make them an admin
    setIsAdmin(userData.email === "admin@vault.com");
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
