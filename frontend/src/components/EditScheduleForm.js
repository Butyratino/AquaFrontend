import React, { useState } from 'react';
import axios from 'axios';

const EditScheduleForm = ({ schedule, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    sectionId: schedule.sectionId,
    dayOfWeek: schedule.dayOfWeek,
    openingHours: schedule.openingHours,
    closingHours: schedule.closingHours,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8090/api/schedules/update/${schedule.scheduleId}`, formData);
      onUpdate();
    } catch (error) {
      console.error('Error updating schedule:', error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="edit-form">
      <h2>Edit Schedule</h2>
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

export default EditScheduleForm;
