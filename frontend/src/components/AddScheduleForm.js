import React, { useState } from 'react';
import axios from 'axios';

const AddScheduleForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    sectionId: '',
    dayOfWeek: '',
    openingHours: '',
    closingHours: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      await axios.post('http://localhost:8090/api/schedules/add', formData);
      onAdd();
    } catch (error) {
      console.error('Error adding schedule:', error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="add-form">
      <h2>Add Schedule</h2>
      <form>
        <label>Section ID:</label>
        <input type="number" name="sectionId" value={formData.sectionId} onChange={handleChange} />
        <label>Day of Week:</label>
        <input type="text" name="dayOfWeek" value={formData.dayOfWeek} onChange={handleChange} />
        <label>Opening Hours:</label>
        <input type="text" name="openingHours" value={formData.openingHours} onChange={handleChange} />
        <label>Closing Hours:</label>
        <input type="text" name="closingHours" value={formData.closingHours} onChange={handleChange} />

        <div className="form-buttons">
          <button type="button" onClick={handleAdd}>
            Add
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScheduleForm;
