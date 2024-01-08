// AttractionsForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditAttractionForm from './EditAttractionForm'; // Make sure to create this component
import AddAttractionForm from './AddAttractionForm'; // Make sure to create this component
import './Shared.css'; // Import shared styles

const AttractionsForm = () => {
  const [attractions, setAttractions] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAddingAttraction, setIsAddingAttraction] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/attractions/all');
      setAttractions(response.data);
    } catch (error) {
      console.error('Error fetching attractions:', error);
    }
  };

  const handleUpdateAttraction = async (id, updatedAttraction) => {
    try {
      await axios.put(`http://localhost:8090/api/attractions/update/${id}`, updatedAttraction);
      fetchData();
      handleCloseEditForm();
    } catch (error) {
      console.error('Error updating attraction:', error);
    }
  };

  const handleEditClick = (attraction) => {
    setSelectedAttraction(attraction);
    setShowEditForm(true);
  };

  const handleDeleteAttraction = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/attractions/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting attraction:', error);
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedAttraction(null);
  };

  const handleAddClick = () => {
    if (!showAddForm && !isAddingAttraction) {
      setShowAddForm(true);
    }
  };

  const handleAddAttraction = async (newAttraction) => {
    try {
      setIsAddingAttraction(true);
  
      const response = await axios.post('http://localhost:8090/api/attractions/add', newAttraction);
  
      setAttractions((prevAttractions) => [...prevAttractions, response.data]);
  
      handleCloseAddForm();
    } catch (error) {
      console.error('Error adding attraction:', error);
    } finally {
      setIsAddingAttraction(false);
    }
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  const calculateAvgSalary = async (attractionId) => {
    try {
      const response = await axios.get(`http://localhost:8090/api/attractions/avg1/${attractionId}`);
      alert(`Average Salary for Attraction ID ${attractionId}: $${response.data}`);
    } catch (error) {
      console.error('Error calculating average salary:', error);
    }
  };

  return (
    <div>
      <h1>Attractions</h1>
      <div className="grid"> {/* Apply shared grid style */}
        {attractions.map((attraction) => (
          <div key={attraction.attractionId} className="card"> {/* Apply shared card style */}
            <p>Name: {attraction.name}</p>
            <p>Color: {attraction.color}</p>
            <p>Length: {attraction.length}</p>
            <p>Min Age: {attraction.minAge}</p>
            <p>Section ID: {attraction.sectionId}</p>
            {/* Add the button for calculating average salary */}
            <button className="calculate-button button-blue" onClick={() => calculateAvgSalary(attraction.attractionId)}>
              Calculate Avg Salary
            </button>
            <div className="actions">
              <button className="button-orange" onClick={() => handleEditClick(attraction)}>
                Edit
              </button>
              <button className="button-red" onClick={() => handleDeleteAttraction(attraction.attractionId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-button button-green" onClick={handleAddClick} disabled={isAddingAttraction}>
        Add Attraction
      </button>
      
      {showEditForm && (
        <EditAttractionForm attraction={selectedAttraction} onUpdate={(updatedAttraction) => handleUpdateAttraction(selectedAttraction.attractionId, updatedAttraction)} onClose={handleCloseEditForm} />
      )}
      {showAddForm && <AddAttractionForm onAdd={handleAddAttraction} onClose={handleCloseAddForm} />}
    </div>
  );
};

export default AttractionsForm;
