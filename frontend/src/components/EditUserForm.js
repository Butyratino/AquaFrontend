// EditUserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditUserForm = ({ user, onUpdate, onClose }) => {
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    setEditedUser({ ...user });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8090/api/users/update/${editedUser.userId}`, editedUser);
      onUpdate(editedUser);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={editedUser.username} onChange={handleChange} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={editedUser.password} onChange={handleChange} />

        <label htmlFor="role">Role:</label>
        <input type="text" id="role" name="role" value={editedUser.role} onChange={handleChange} />

        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" value={editedUser.phone} onChange={handleChange} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={editedUser.email} onChange={handleChange} />

        <label htmlFor="addressId">Address ID:</label>
        <input type="number" id="addressId" name="addressId" value={editedUser.addressId} onChange={handleChange} />

        <label htmlFor="avatar">Avatar:</label>
        <input type="text" id="avatar" name="avatar" value={editedUser.avatar} onChange={handleChange} />

        <label htmlFor="hasAvatar">Has Avatar:</label>
        <input type="number" id="hasAvatar" name="hasAvatar" value={editedUser.hasAvatar} onChange={handleChange} />

        <button type="button" onClick={handleUpdate}>
          Update
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditUserForm;
