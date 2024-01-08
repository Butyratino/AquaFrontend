import React, { useState } from 'react';
import axios from 'axios';

const AddPaymentForm = ({ onAdd, onClose }) => {
  const [formData, setFormData] = useState({
    userId: 1, // Set the default user ID
    amount: 0,
    date: new Date().toISOString(), // Set the default date to the current date
    method: '',
    cardNumber: '',
    bank: '',
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

      const response = await axios.post('http://localhost:8090/api/payments/add', formData);

      onAdd(response.data);

      onClose();
    } catch (error) {
      console.error('Error adding payment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="add-form">
      <h2>Add Payment</h2>
      <form>
        <label>User ID:</label>
        <input type="number" name="userId" value={formData.userId} onChange={handleChange} />
        <label>Amount:</label>
        <input type="number" name="amount" value={formData.amount} onChange={handleChange} />
        <label>Date:</label>
        <input type="datetime-local" name="date" value={formData.date} onChange={handleChange} />
        <label>Method:</label>
        <input type="text" name="method" value={formData.method} onChange={handleChange} />
        <label>Card Number:</label>
        <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} />
        <label>Bank:</label>
        <input type="text" name="bank" value={formData.bank} onChange={handleChange} />

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

export default AddPaymentForm;
