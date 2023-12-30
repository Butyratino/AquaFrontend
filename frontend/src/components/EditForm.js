// EditForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EditForm = ({ section, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: section.name,
    description: section.description,
    capacity: section.capacity,
    addressId: section.addressId,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      // Make API request to update the section
      await axios.put(`http://localhost:8090/api/sections/update/${section.sectionId}`, formData);

      // Trigger the onUpdate callback to refresh the data
      onUpdate(formData);
      // Close the edit form
      onClose();
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  return (
    <div className="edit-form">
      <h2>Edit Section</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
        <label>Capacity:</label>
        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} />
        <label>Address ID:</label>
        <input type="number" name="addressId" value={formData.addressId} onChange={handleChange} />

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

export default EditForm;
