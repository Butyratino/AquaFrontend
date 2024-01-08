import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditForm from './editTicketForm'; // Corrected the import path
import AddForm from './AddTicketForm';
import './Shared.css'; // Import shared styles

const TicketsForm = () => {
  const [tickets, setTickets] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAddingTicket, setIsAddingTicket] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/tickets/all');
      console.log('Response data:', response.data);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const handleUpdateTicket = async (id, updatedTicket) => {
    try {
      await axios.put(`http://localhost:8090/api/tickets/update/${id}`, updatedTicket);
      fetchData();
      handleCloseEditForm();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const handleEditClick = (ticket) => {
    setSelectedTicket(ticket);
    setShowEditForm(true);
  };

  const handleDeleteTicket = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/tickets/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedTicket(null);
  };

  const handleAddClick = () => {
    if (!showAddForm && !isAddingTicket) {
      setShowAddForm(true);
    }
  };

  const handleAddTicket = async (newTicket) => {
    try {
      setIsAddingTicket(true);

      const response = await axios.post('http://localhost:8090/api/tickets/add', newTicket);

      setTickets((prevTickets) => [...prevTickets, response.data]);

      handleCloseAddForm();
    } catch (error) {
      console.error('Error adding ticket:', error);
    } finally {
      setIsAddingTicket(false);
    }
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <div>
      <h1>Tickets</h1>
      <div className="tickets-grid">
        {tickets.map((ticket) => (
          <div key={ticket.TICKETID} className="ticket-card">
            {/* Render ticket details here */}
            <div className="actions">
              <button className="button-orange" onClick={() => handleEditClick(ticket)}>
                Edit
              </button>
              <button className="button-red" onClick={() => handleDeleteTicket(ticket.TICKETID)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-button button-green" onClick={handleAddClick} disabled={isAddingTicket}>
        Add Ticket
      </button>
      {showEditForm && (
        <EditForm ticket={selectedTicket} onUpdate={(updatedTicket) => handleUpdateTicket(selectedTicket.TICKETID, updatedTicket)} onClose={handleCloseEditForm} />
      )}
      {showAddForm && <AddForm onAdd={handleAddTicket} onClose={handleCloseAddForm} />}
    </div>
  );
};

export default TicketsForm;
