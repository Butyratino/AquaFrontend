// AddUserForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddUserForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: '',
    phone: '',
    email: '',
    addressId: 0,
    avatar: '',
    hasAvatar: 0,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      await axios.post('http://localhost:8090/api/users/add', formData);

      onAdd(formData);

      onClose();
    } catch (error) {
      console.error('Error adding new user:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-form">
      <h2>Add New User</h2>
      <form>
        <label>Username:</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        <label>Role:</label>
        <input type="text" name="role" value={formData.role} onChange={handleChange} />
        <label>Phone:</label>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        <label>Address ID:</label>
        <input type="number" name="addressId" value={formData.addressId} onChange={handleChange} />
        <label>Avatar:</label>
        <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} />
        <label>Has Avatar:</label>
        <input type="number" name="hasAvatar" value={formData.hasAvatar} onChange={handleChange} />

        <div className="form-buttons">
          <button type="button" onClick={handleAdd} disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add'}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUserForm;
