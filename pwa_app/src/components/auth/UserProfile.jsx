import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import '../../style/Auth.css';

const UserProfile = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (!currentUser) return null;

  const getUserInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : 'U';
  };

  return (
    <div className="user-info">
      <div className="user-avatar">
        {getUserInitials(currentUser.email)}
      </div>
      <div className="user-details">
        <h3>{currentUser.displayName || 'User'}</h3>
        <p>{currentUser.email}</p>
      </div>
      <button 
        className="logout-button" 
        onClick={handleLogout}
        title="Sign Out"
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserProfile;