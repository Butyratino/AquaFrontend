import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditScheduleForm from './EditScheduleForm';
import AddScheduleForm from './AddScheduleForm';

const SchedulesForm = () => {
  const [schedules, setSchedules] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/schedules/all');
      setSchedules(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    }
  };

  const handleEditClick = (schedule) => {
    setSelectedSchedule(schedule);
    setShowEditForm(true);
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/schedules/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedSchedule(null);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <div>
      <h1>Schedules</h1>
      <div className="schedules-grid">
        {schedules.map((schedule) => (
          <div key={schedule.SCHEDULEID} className="schedule-card">
            {/* Render schedule details here */}
            <div className="actions">
              <button onClick={() => handleEditClick(schedule)}>Edit</button>
              <button onClick={() => handleDeleteSchedule(schedule.SCHEDULEID)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleAddClick}>Add Schedule</button>
      {showEditForm && (
        <EditScheduleForm
          schedule={selectedSchedule}
          onUpdate={(updatedSchedule) => {
            fetchData();
            handleCloseEditForm();
          }}
          onClose={handleCloseEditForm}
        />
      )}
      {showAddForm && (
        <AddScheduleForm
          onAdd={() => {
            fetchData();
            handleCloseAddForm();
          }}
          onClose={handleCloseAddForm}
        />
      )}
    </div>
  );
};

export default SchedulesForm;
