import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ws_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ws_token') || null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      localStorage.setItem('ws_token', data.access_token);
      localStorage.setItem('ws_user', JSON.stringify(data.user));
      setToken(data.access_token);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (full_name, email, password) => {
    setLoading(true);
    try {
      await api.post('/api/auth/signup', { full_name, email, password });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.detail || 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ws_token');
    localStorage.removeItem('ws_user');
    setToken(null);
    setUser(null);
  };

  const isAdmin = user?.role === 'super_admin';
  const isLoggedIn = !!token && !!user;

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout, isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export default AuthContext;
