import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditEmployeesForm from './EditEmployeesForm';
import AddEmployeesForm from './AddEmployeesForm';
import './Shared.css';

const EmployeesForm = () => {
    const [employees, setEmployees] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [isAddingEmployee, setIsAddingEmployee] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8090/api/employees/all');
            console.log('Response data:', response.data);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };


    const handleUpdateEmployee = async (id, updatedEmployee) => {
        try {
            await axios.put(`http://localhost:8090/api/employees/update/${id}`, updatedEmployee);
            fetchData();
            handleCloseEditForm();
        } catch (error) {
            console.error('Error updating employee:', error);
        }
    };

    const handleEditClick = (employee) => {
        setSelectedEmployee(employee);
        setShowEditForm(true);
    };

    const handleDeleteEmployee = async (id) => {
        try {
            await axios.delete(`http://localhost:8090/api/employees/delete/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleCloseEditForm = () => {
        setShowEditForm(false);
        setSelectedEmployee(null);
    };

    const handleAddClick = () => {
        if (!showAddForm && !isAddingEmployee) {
            setShowAddForm(true);
        }
    };

    const handleAddEmployee = async (newEmployee) => {
        try {
            setIsAddingEmployee(true);

            const response = await axios.post('http://localhost:8090/api/employees/add', newEmployee);

            setEmployees((prevEmployees) => [...prevEmployees, response.data]);

            handleCloseAddForm();
        } catch (error) {
            console.error('Error adding employee:', error);
        } finally {
            setIsAddingEmployee(false);
        }
    };

    const handleCloseAddForm = () => {
        setShowAddForm(false);
    };

    return (
        <div>
            <h1>Employees</h1>
            <div className="employees-grid">
                {employees.map((employee) => (
                    <div key={employee.employeeId} className="employee-card">
                        <p>Name: {employee.name}</p>
                        <p>Surname: {employee.surname}</p>
                        <p>Date of Birth: {new Date(employee.dateOfBirth).toLocaleDateString()}</p>
                        {/* <p>Attraction ID: {employee.attractionId}</p>
                        <p>Superior ID: {employee.superiorId}</p>
                        <p>Address ID: {employee.addressId}</p> */}
                        <p>Salary: {employee.salary}</p>
                        <div className="actions">
                            <button className="button-orange" onClick={() => handleEditClick(employee)}>
                                Edit
                            </button>
                            <button className="button-red" onClick={() => handleDeleteEmployee(employee.employeeId)}>
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="add-button button-green" onClick={handleAddClick} disabled={isAddingEmployee}>
                Add Employee
            </button>
            {showEditForm && (
                <EditEmployeesForm
                    employee={selectedEmployee}
                    onUpdate={(updatedEmployee) => handleUpdateEmployee(selectedEmployee.EMPLOYEEID, updatedEmployee)}
                    onClose={handleCloseEditForm}
                />
            )}
            {showAddForm && <AddEmployeesForm onAdd={handleAddEmployee} onClose={handleCloseAddForm} />}
        </div>
    );
};

export default EmployeesForm;
