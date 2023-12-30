import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditForm from './EditForm';
import AddForm from './AddForm';

const SectionsForm = () => {
  const [sections, setSections] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    console.log('Component mounted or updated');
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
      fetchData(); // Refresh the sections after update
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
      fetchData(); // Refresh the sections after deletion
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedSection(null);
  };

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleAddSection = async (newSection) => {
    try {
      console.log('Adding section:', newSection);
  
      const response = await axios.post('http://localhost:8090/api/sections/add', newSection);
      console.log('Section added successfully:', response.data);
  
      setSections((prevSections) => {
        const updatedSections = [...prevSections, response.data];
        console.log('Previous Sections:', prevSections);
        console.log('Updated Sections:', updatedSections);
        return updatedSections;
      });
  
      handleCloseAddForm();
  
      console.log('Section added successfully');
    } catch (error) {
      console.error('Error adding section:', error);
    }
  };
  



  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <div>
      <h1>Sections</h1>
      {sections.map((section) => (
        <div key={section.sectionId}>
          <p>Name: {section.name}</p>
          <p>Description: {section.description}</p>
          <p>Capacity: {section.capacity}</p>
          <p>Address ID: {section.addressId}</p>
          <button onClick={() => handleEditClick(section)}>Edit</button>
          <button onClick={() => handleDeleteSection(section.sectionId)}>Delete</button>
          <hr />
        </div>
      ))}
      {showEditForm && (
        <EditForm section={selectedSection} onUpdate={(updatedSection) => handleUpdateSection(selectedSection.sectionId, updatedSection)} onClose={handleCloseEditForm} />
      )}
      <button onClick={handleAddClick}>Add Section</button>
      {showAddForm && (
        <AddForm onAdd={handleAddSection} onClose={handleCloseAddForm} />
      )}
    </div>
  );
};

export default SectionsForm;
