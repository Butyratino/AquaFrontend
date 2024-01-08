import React, { useState } from 'react';
import axios from 'axios';

const EditProfileForm = ({ user, onUpdate, onClose }) => {
  console.log('userInfo:', user);
  const [formData, setFormData] = useState({
    userid: user.userId,  
    username: user.username,
    password: user.password,
    role: user.role,
    phone: user.phone,
    email: user.email,
    addressId: user.addressid,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      // Make API request to update the user profile
      await axios.post(`http://localhost:8090/api/profile/update/${user.userId}`, formData);

      // Trigger the onUpdate callback to refresh the data
      onUpdate(formData);
      // Close the edit form
      onClose();
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  return (
    <div className="edit-form">
      <h2>Edit User Profile</h2>
      <form>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username || ''} onChange={handleChange} />
        <label>Password:</label>
        <input type="password" name="password" value={formData.password || ''} onChange={handleChange} />
        <label>Role:</label>
        <input type="text" name="role" value={formData.role || ''} onChange={handleChange} />
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
        <label>Address ID:</label>
        <input type="number" name="addressId" value={formData.addressId || ''} onChange={handleChange} />

        <div className="form-buttons">
          <button type="button" onClick={handleUpdate}>
            Update
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileForm;
