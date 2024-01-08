// AddServicesForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditServiceForm from './EditServiceForm';
import AddNewServiceForm from './AddNewServiceForm';
import './Shared.css'; // Import shared styles

const AddServicesForm = () => {
  const [additionalServices, setAdditionalServices] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAddingService, setIsAddingService] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/addservices/all');
      setAdditionalServices(response.data);
    } catch (error) {
      console.error('Error fetching additional services:', error);
    }
  };

  const handleUpdateService = async (id, updatedService) => {
    try {
      await axios.put(`http://localhost:8090/api/addservices/update/${id}`, updatedService);
      fetchData();
      handleCloseEditForm();
    } catch (error) {
      console.error('Error updating additional service:', error);
    }
  };

  const handleEditClick = (service) => {
    setSelectedService(service);
    setShowEditForm(true);
  };

  const handleDeleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/addservices/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting additional service:', error);
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedService(null);
  };

  const handleAddClick = () => {
    if (!showAddForm && !isAddingService) {
      setShowAddForm(true);
    }
  };

  const handleAddService = async (newService) => {
    try {
      setIsAddingService(true);
  
      const response = await axios.post('http://localhost:8090/api/addservices/add', newService);
  
      setAdditionalServices((prevServices) => [...prevServices, response.data]);
  
      handleCloseAddForm();
    } catch (error) {
      console.error('Error adding additional service:', error);
    } finally {
      setIsAddingService(false);
    }
  };
  

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <div>
      <h1>Additional Services</h1>
      <div className="sections-grid">
        {additionalServices.map((service) => (
          <div key={service.additionalServiceId} className="section-card">
            <p>Section ID: {service.sectionId}</p>
            <p>Price: {service.price}</p>
            <p>Description: {service.description}</p>
            <p>Capacity: {service.capacity}</p>
            <div className="actions">
              <button className="button-orange" onClick={() => handleEditClick(service)}>
                Edit
              </button>
              <button className="button-red" onClick={() => handleDeleteService(service.additionalServiceId)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-button button-green" onClick={handleAddClick} disabled={isAddingService}>
        Add Service
      </button>
      {showEditForm && (
        <EditServiceForm service={selectedService} onUpdate={(updatedService) => handleUpdateService(selectedService.additionalServiceId, updatedService)} onClose={handleCloseEditForm} />
      )}
      {showAddForm && <AddNewServiceForm onAdd={handleAddService} onClose={handleCloseAddForm} />}
    </div>
  );
};

export default AddServicesForm;
