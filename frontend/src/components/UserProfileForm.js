import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditProfileForm from './EditProfileForm';
import ChangeAvatarForm from './ChangeAvatarForm'; // Import the new component
import './Shared.css';
import { useUser } from './UserContext';

const UserProfileForm = () => {
  const { user, loginUser } = useUser();
  const [userInfo, setUserInfo] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showChangeAvatarForm, setShowChangeAvatarForm] = useState(false); // State for showing the ChangeAvatarForm

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/api/profile/${user.username}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const handleEditClick = () => {
    setShowEditForm(true);
  };

  const handleUpdateProfile = async (updatedProfile) => {
    try {
      // Make sure that user is not undefined before accessing properties
      if (user) {
        // Make API request to update the user's own profile
        await axios.post(`http://localhost:8090/api/profile/update/${user.userid}`, updatedProfile);

        // Fetch updated user data after the update
        const response = await axios.get(`http://localhost:8090/api/profile/${user.username}`);
        const updatedUserData = response.data;

        // Update the user context with the new data
        loginUser(updatedUserData);

        // Close the edit form
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

  return (
    <div>
      {userInfo ? (
        <div>
          <h2>User Profile</h2>
          <img src={`http://localhost:8090/api/users/${user.userid}/avatar`} alt="User Avatar" />
          <p>Username: {userInfo.username}</p>
          <p>Password: {userInfo.password}</p>
          <p>Role: {userInfo.role}</p>
          <p>Phone: {userInfo.phone}</p>
          <p>Email: {userInfo.email}</p>
          <p>Address ID: {userInfo.addressid}</p>

          <div className="actions">
            <button className="button-orange" onClick={handleEditClick}>
              Edit Profile
            </button>
            <button className="button-blue" onClick={handleAvatarClick}>
              Change Avatar
            </button>
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
