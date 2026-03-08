import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // We need a loading state so the app doesn't flash before checking your token
  const [loading, setLoading] = useState(true);

  // When the app first loads, check if we already have a token saved
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // Hits the secure endpoint we built in Django to get your user info
  const fetchUserProfile = async () => {
    try {
      const response = await api.get("users/profile/");
      setUser(response.data);
      setIsAdmin(response.data.isAdmin); // This reads the is_staff flag from Django!
    } catch (error) {
      console.error("Invalid token or session expired", error);
      logout(); // If the token is fake or expired, kick them out
    } finally {
      setLoading(false);
    }
  };

  // The actual login function
  const login = async (email, password) => {
    try {
      // 1. Send credentials to Django's JWT endpoint
      // Note: Django SimpleJWT uses 'username' by default, so we map email to it
      const response = await api.post("users/login/", {
        username: email,
        password: password,
      });

      // 2. Save the VIP wristbands to the browser's Local Storage
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);

      // 3. Fetch the user's profile data to see if they are an admin
      await fetchUserProfile();

      return { success: true };
    } catch (error) {
      console.error("Login failed", error.response?.data);
      return { success: false, error: "Invalid credentials" };
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
