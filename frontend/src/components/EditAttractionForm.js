// EditAttractionForm.js
import React, { useState, useEffect } from 'react';

const EditAttractionForm = ({ attraction, onUpdate, onClose }) => {
  const [formData, setFormData] = useState(attraction || {}); // Ensure attraction is not undefined

  useEffect(() => {
    setFormData(attraction || {});
  }, [attraction]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="edit-form">
      <h2>Edit Attraction</h2>
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

export default EditAttractionForm;
