import React, { useState } from 'react';
import axios from 'axios';

const AddEmployeesForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    dateOfBirth: '',
    attractionId: 0,
    superiorId: 0,
    addressId: 0,
    salary: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post('http://localhost:8090/api/employees/add', formData);
      onAdd(response.data);
      onClose();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="add-form">
      <h2>Add Employee</h2>
      <form>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        <label>Surname:</label>
        <input type="text" name="surname" value={formData.surname} onChange={handleChange} />
        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
        <label>Attraction ID:</label>
        <input type="number" name="attractionId" value={formData.attractionId} onChange={handleChange} />
        <label>Superior ID:</label>
        <input type="number" name="superiorId" value={formData.superiorId} onChange={handleChange} />
        <label>Address ID:</label>
        <input type="number" name="addressId" value={formData.addressId} onChange={handleChange} />
        <label>Salary:</label>
        <input type="number" name="salary" value={formData.salary} onChange={handleChange} />

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

export default AddEmployeesForm;
