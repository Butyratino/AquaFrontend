// UserForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditUserForm from './EditUserForm'; 
import AddUserForm from './AddUserForm'; 
import './Shared.css'; // Import shared styles

const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAddingUser, setIsAddingUser] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/profile/all');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUpdateUser = async (id, updatedUser) => {
    try {
      await axios.put(`http://localhost:8090/api/profile/update/${id}`, updatedUser);
      fetchData();
      handleCloseEditForm();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditForm(true);
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/profile/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedUser(null);
  };

  const handleAddClick = () => {
    if (!showAddForm && !isAddingUser) {
      setShowAddForm(true);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      setIsAddingUser(true);

      const response = await axios.post('http://localhost:8090/api/profile/add', newUser);

      setUsers((prevUsers) => [...prevUsers, response.data]);

      handleCloseAddForm();
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setIsAddingUser(false);
    }
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <div>
      <h1>Users</h1>
      <div className="grid">
        {users.map((user) => (
          <div key={user.userId} className="card">
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
            {/* <p>Avatar: {user.avatar}</p> */}
            <p>Has Avatar: {user.hasAvatar}</p>
            {/* Add other user properties as needed */}
            <div className="actions">
              <button className="button-orange" onClick={() => handleEditClick(user)}>
                Edit
              </button>
              <button className="button-red" onClick={() => handleDeleteUser(user.userId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-button button-green" onClick={handleAddClick} disabled={isAddingUser}>
        Add User
      </button>
      {showEditForm && (
        <EditUserForm user={selectedUser} onUpdate={(updatedUser) => handleUpdateUser(selectedUser.userId, updatedUser)} onClose={handleCloseEditForm} />
      )}
      {showAddForm && <AddUserForm onAdd={handleAddUser} onClose={handleCloseAddForm} />}
    </div>
  );
  
};

export default UserForm;
