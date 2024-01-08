import React, { useState } from 'react';
import axios from 'axios';

const EditPaymentForm = ({ payment, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    userId: payment.userId,
    amount: payment.amount,
    date: new Date(payment.date).toISOString(),
    method: payment.method,
    cardNumber: payment.cardNumber,
    bank: payment.bank,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8090/api/payments/update/${payment.paymentId}`, formData);

      onUpdate(formData);

      onClose();
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  return (
    <div className="edit-form">
      <h2>Edit Payment</h2>
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

export default EditPaymentForm;
