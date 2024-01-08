// AddTicketForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddTicketForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    TICKETID: '',
    PURCHASEDATE: '',
    USERID: '',
    TICKETTYPEID: '',
    SECTIONID: '',
    PRICE: '',
    DATEOFISSUE: '',
    EXPIRATIONTIME: '',
    ISACTIVE: '',
    ADDITIONALSERVICEID: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async () => {
    try {
      if (isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      await axios.post('http://localhost:8090/api/tickets/add', formData);

      onAdd(formData);

      onClose();
    } catch (error) {
      console.error('Error adding ticket:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-form">
      <h2>Add Ticket</h2>
      <form>
        {/* <label>Ticket ID:</label>
        <input type="text" name="TICKETID" value={formData.TICKETID} onChange={handleChange} /> */}
        <label>Purchase Date:</label>
        <input type="text" name="PURCHASEDATE" value={formData.PURCHASEDATE} onChange={handleChange} />
        {/* <label>User ID:</label>
        <input type="text" name="USERID" value={formData.USERID} onChange={handleChange} /> */}
        {/* <label>Ticket Type ID:</label>
        <input type="text" name="TICKETTYPEID" value={formData.TICKETTYPEID} onChange={handleChange} /> */}
        {/* <label>Section ID:</label>
        <input type="text" name="SECTIONID" value={formData.SECTIONID} onChange={handleChange} /> */}
        <label>Price:</label>
        <input type="text" name="PRICE" value={formData.PRICE} onChange={handleChange} />
        <label>Date of Issue:</label>
        <input type="text" name="DATEOFISSUE" value={formData.DATEOFISSUE} onChange={handleChange} />
        <label>Expiration Time:</label>
        <input type="text" name="EXPIRATIONTIME" value={formData.EXPIRATIONTIME} onChange={handleChange} />
        <label>Is Active:</label>
        <input type="text" name="ISACTIVE" value={formData.ISACTIVE} onChange={handleChange} />
        {/* <label>Additional Service ID:</label>
        <input type="text" name="ADDITIONALSERVICEID" value={formData.ADDITIONALSERVICEID} onChange={handleChange} /> */}

        <div className="form-buttons">
          <button type="button" onClick={handleAdd} disabled={isSubmitting}>
            {isSubmitting ? 'Adding...' : 'Add'}
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTicketForm;
