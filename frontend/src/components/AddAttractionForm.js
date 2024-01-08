// AddAttractionForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddAttractionForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    color: '',
    length: 0,
    minAge: 0,
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

      await axios.post('http://localhost:8090/api/attractions/add', formData);

      onAdd(formData);

      onClose();
    } catch (error) {
      console.error('Error adding new attraction:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-form">
      <h2>Add New Attraction</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label>Color:</label>
        <input type="text" name="color" value={formData.color} onChange={handleChange} />
        <label>Length:</label>
        <input type="number" name="length" value={formData.length} onChange={handleChange} />
        <label>Min Age:</label>
        <input type="number" name="minAge" value={formData.minAge} onChange={handleChange} />
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

export default AddAttractionForm;
