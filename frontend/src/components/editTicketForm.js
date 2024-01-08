// EditTicketForm.js
import React, { useState } from 'react';
import axios from 'axios';

const EditTicketForm = ({ ticket, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    TICKETID: ticket.TICKETID,
    PURCHASEDATE: ticket.PURCHASEDATE,
    USERID: ticket.USERID,
    TICKETTYPEID: ticket.TICKETTYPEID,
    SECTIONID: ticket.SECTIONID,
    PRICE: ticket.PRICE,
    DATEOFISSUE: ticket.DATEOFISSUE,
    EXPIRATIONTIME: ticket.EXPIRATIONTIME,
    ISACTIVE: ticket.ISACTIVE,
    ADDITIONALSERVICEID: ticket.ADDITIONALSERVICEID,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8090/api/tickets/update/${ticket.TICKETID}`, formData);

      onUpdate(formData);
      onClose();
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  return (
    <div className="edit-form">
      <h2>Edit Ticket</h2>
      <form>
        <label>Ticket ID:</label>
        <input type="text" name="TICKETID" value={formData.TICKETID} onChange={handleChange} readOnly />
        <label>Purchase Date:</label>
        <input type="text" name="PURCHASEDATE" value={formData.PURCHASEDATE} onChange={handleChange} />
        <label>User ID:</label>
        <input type="text" name="USERID" value={formData.USERID} onChange={handleChange} />
        <label>Ticket Type ID:</label>
        <input type="text" name="TICKETTYPEID" value={formData.TICKETTYPEID} onChange={handleChange} />
        <label>Section ID:</label>
        <input type="text" name="SECTIONID" value={formData.SECTIONID} onChange={handleChange} />
        <label>Price:</label>
        <input type="text" name="PRICE" value={formData.PRICE} onChange={handleChange} />
        <label>Date of Issue:</label>
        <input type="text" name="DATEOFISSUE" value={formData.DATEOFISSUE} onChange={handleChange} />
        <label>Expiration Time:</label>
        <input type="text" name="EXPIRATIONTIME" value={formData.EXPIRATIONTIME} onChange={handleChange} />
        <label>Is Active:</label>
        <input type="text" name="ISACTIVE" value={formData.ISACTIVE} onChange={handleChange} />
        <label>Additional Service ID:</label>
        <input type="text" name="ADDITIONALSERVICEID" value={formData.ADDITIONALSERVICEID} onChange={handleChange} />

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

export default EditTicketForm;
