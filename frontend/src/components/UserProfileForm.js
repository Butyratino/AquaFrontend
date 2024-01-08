import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProfileForm from './EditProfileForm';
import ChangeAvatarForm from './ChangeAvatarForm';
import './Shared.css';
import { useUser } from './UserContext';

const UserProfileForm = () => {
  const { user, loginUser, setUser } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showChangeAvatarForm, setShowChangeAvatarForm] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (user && user.username) {
          const response = await axios.get(`http://localhost:8090/api/profile/${user.username}`);
          setUserInfo(response.data);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    const userIdFromStorage = localStorage.getItem('userid');

    if (userIdFromStorage && !user) {
      setUser({
        username: localStorage.getItem('username'),
        userid: localStorage.getItem('userid'),
        role: localStorage.getItem('role'),
      });
    }

    if (user && user.username) {
      fetchUserProfile();
    }
  }, [user, setUser]);

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      if (user && user.userid) {
        await axios.post(`http://localhost:8090/api/profile/update/${user.userid}`, updatedProfile);
        const response = await axios.get(`http://localhost:8090/api/profile/${user.username}`);
        const updatedUserData = response.data;

        loginUser(updatedUserData);
        setShowEditForm(false);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
  };

  const handleAvatarClick = () => {
    setShowChangeAvatarForm(true);
  };

  const handleCloseChangeAvatarForm = () => {
    setShowChangeAvatarForm(false);
  };

  const downloadLogs = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/aquapark/logs');
      const logsData = response.data;
      const logsJSON = JSON.stringify(logsData);

      const blob = new Blob([logsJSON], { type: 'application/json' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = 'logs.json';
      downloadLink.click();
    } catch (error) {
      console.error('Error downloading logs:', error);
    }
  };

  return (
    <div>
      {user && userInfo ? (
        <div>
          <h2>User Profile</h2>
          <img
            src={user && user.userid ? `http://localhost:8090/api/profile/${user.userid}/avatar` : ''}
            alt="User Avatar"
            onLoad={() => console.log('Avatar loaded successfully')}
            onError={(e) => console.error('Error loading avatar:', e.message, e)}
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />

          <p>Username: {userInfo.username}</p>
          <p>Password: {userInfo.password}</p>
          <p>Role: {userInfo.role}</p>
          <p>Phone: {userInfo.phone}</p>
          <p>Email: {userInfo.email}</p>
          <div className="actions">
            <button className="button-orange" onClick={handleEditClick}>
              Edit Profile
            </button>
            <button className="button-blue" onClick={handleAvatarClick}>
              Change Avatar
            </button>
            {user.role === 'admin' && (
              <button className="button-green" onClick={downloadLogs}>
                Download Logs
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Please log in to view your profile.</p>
      )}

      {showEditForm && <EditProfileForm user={userInfo} onUpdate={handleUpdateProfile} onClose={handleCloseEditForm} />}
      {showChangeAvatarForm && <ChangeAvatarForm onClose={handleCloseChangeAvatarForm} />}
    </div>
  );
};

export default UserProfileForm;
