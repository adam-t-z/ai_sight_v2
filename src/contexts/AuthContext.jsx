import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock signup function
  const signup = async (email, password) => {
    // Simulate Firebase signup without actual connection
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = {
          uid: 'mock-user-' + Date.now(),
          email: email,
          displayName: email.split('@')[0]
        };
        setCurrentUser(mockUser);
        resolve({ user: mockUser });
      }, 1000);
    });
  };

  // Mock login function
  const login = async (email, password) => {
    // Simulate Firebase login without actual connection
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'sarah@example.com' && password === 'password123') {
          const mockUser = {
            uid: 'mock-user-sarah',
            email: email,
            displayName: 'Sarah'
          };
          setCurrentUser(mockUser);
          resolve({ user: mockUser });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  };

  // Mock logout function
  const logout = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setCurrentUser(null);
        resolve();
      }, 500);
    });
  };

  useEffect(() => {
    // Mock auth state persistence
    const savedUser = localStorage.getItem('mockUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Save user to localStorage for persistence
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('mockUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('mockUser');
    }
  }, [currentUser]);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};