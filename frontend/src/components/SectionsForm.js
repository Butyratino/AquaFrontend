//SectionsForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditForm from './EditForm';
import AddForm from './AddForm';
import './Shared.css'; // Import shared styles

const SectionsForm = () => {
  const [sections, setSections] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAddingSection, setIsAddingSection] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/sections/all');
      setSections(response.data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const handleUpdateSection = async (id, updatedSection) => {
    try {
      await axios.put(`http://localhost:8090/api/sections/update/${id}`, updatedSection);
      fetchData();
      handleCloseEditForm();
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  const handleEditClick = (section) => {
    setSelectedSection(section);
    setShowEditForm(true);
  };

  const handleDeleteSection = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/sections/delete/${id}`);
      fetchData(); // Refresh sections after deletion
    } catch (error) { 
      console.error('Error deleting section:', error);
    }
  };
  

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedSection(null);
  };

  const handleAddClick = () => {
    if (!showAddForm && !isAddingSection) {
      setShowAddForm(true);
    }
  };

  const handleAddSection = async (newSection) => {
    try {
      setIsAddingSection(true);

      const response = await axios.post('http://localhost:8090/api/sections/add', newSection);

      setSections((prevSections) => [...prevSections, response.data]);

      handleCloseAddForm();
    } catch (error) {
      console.error('Error adding section:', error);
    } finally {
      setIsAddingSection(false);
    }
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <div>
      <h1>Sections</h1>
      <div className="sections-grid">
        {sections.map((section) => (
          <div key={section.sectionId} className="section-card">
            <p>Name: {section.sectionName}</p>
            <p>Description: {section.sectionDescription}</p>
            <p>Capacity: {section.sectionCapacity}</p>
            <div className="address-details">
              <p>House Number: {section.houseNumber}</p>
              <p>Street: {section.street}</p>
              <p>Postal Code: {section.postalCode}</p>
              {/* <p>District ID: {section.districtId}</p> */}
              <p>District Name: {section.districtName}</p>
            </div>
            <div className="actions">
              <button className="button-orange" onClick={() => handleEditClick(section)}>
                Edit
              </button>
              <button className="button-red" onClick={() => handleDeleteSection(section.sectionId)}>
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
      <button className="add-button button-green" onClick={handleAddClick} disabled={isAddingSection}>
        Add Section
      </button>
      {showEditForm && (
        <EditForm section={selectedSection} onUpdate={(updatedSection) => handleUpdateSection(selectedSection.sectionId, updatedSection)} onClose={handleCloseEditForm} />
      )}
      {showAddForm && <AddForm onAdd={handleAddSection} onClose={handleCloseAddForm} />}
    </div>
  );
};

export default SectionsForm;