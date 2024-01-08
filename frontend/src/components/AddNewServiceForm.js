import React, { useState } from 'react';
import axios from 'axios';

const AddNewServiceForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    price: 0,
    description: '',
    capacity: 0,
    sectionId: 0,
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

      
      await axios.post('http://localhost:8090/api/addservices/add', formData);

      onAdd(formData);

      onClose();
    } catch (error) {
      console.error('Error adding new service:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-form">
      <h2>Add New Service</h2>
      <form>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
        <label>Capacity:</label>
        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} />
        <label>Section ID:</label>
        <input type="number" name="sectionId" value={formData.sectionId} onChange={handleChange} />

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

export default AddNewServiceForm;
