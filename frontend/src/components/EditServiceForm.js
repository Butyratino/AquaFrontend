// EditServiceForm.js
import React, { useState, useEffect } from 'react';

const EditServiceForm = ({ service, onUpdate, onClose }) => {
  const [formData, setFormData] = useState(service || {}); // Ensure service is not undefined

  useEffect(() => {
    setFormData(service || {});
  }, [service]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    onUpdate(formData);
    onClose();
  };

  return (
    <div className="edit-form">
      <h2>Edit Service</h2>
      <form>
        <label>Price:</label>
        <input type="number" name="price" value={formData.price} onChange={handleChange} />
        <label>Description:</label>
        <input type="text" name="description" value={formData.description} onChange={handleChange} />
        <label>Capacity:</label>
        <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} />

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

export default EditServiceForm;
