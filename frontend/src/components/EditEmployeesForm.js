import React, { useState } from 'react';
import axios from 'axios';

const EditEmployeesForm = ({ employee, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: employee.NAME,
    surname: employee.SURNAME,
    dateOfBirth: new Date(employee.DATEOFBIRTH).toISOString().slice(0, 10),
    attractionId: employee.ATTRACTIONID,
    superiorId: employee.SUPERIORID,
    addressId: employee.ADDRESSID,
    salary: employee.SALARY,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8090/api/employees/update/${employee.EMPLOYEEID}`, formData);

      onUpdate(formData);

      onClose();
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  return (
    <div className="edit-form">
      <h2>Edit Employee</h2>
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

export default EditEmployeesForm;
