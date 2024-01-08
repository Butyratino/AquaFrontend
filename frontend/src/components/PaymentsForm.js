import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditForm from './EditPaymentForm';
import AddForm from './AddPaymentForm';
import './Shared.css'; // Import shared styles

const PaymentsForm = () => {
  const [payments, setPayments] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isAddingPayment, setIsAddingPayment] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8090/api/payments/all');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleUpdatePayment = async (id, updatedPayment) => {
    try {
      await axios.put(`http://localhost:8090/api/payments/update/${id}`, updatedPayment);
      fetchData();
      handleCloseEditForm();
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const handleEditClick = (payment) => {
    setSelectedPayment(payment);
    setShowEditForm(true);
  };

  const handleDeletePayment = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/payments/delete/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  const handleCloseEditForm = () => {
    setShowEditForm(false);
    setSelectedPayment(null);
  };

  const handleAddClick = () => {
    if (!showAddForm && !isAddingPayment) {
      setShowAddForm(true);
    }
  };

  const handleAddPayment = async (newPayment) => {
    try {
      setIsAddingPayment(true);

      const response = await axios.post('http://localhost:8090/api/payments/add', newPayment);

      setPayments((prevPayments) => [...prevPayments, response.data]);

      handleCloseAddForm();
    } catch (error) {
      console.error('Error adding payment:', error);
    } finally {
      setIsAddingPayment(false);
    }
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };

  return (
    <div>
      <h1>Payments</h1>
      <div className="payments-grid">
        {payments.map((payment) => (
          <div key={payment.PAYMENTID} className="payment-card">
            {/* Render payment details here */}
            <div className="actions">
              <button className="button-orange" onClick={() => handleEditClick(payment)}>
                Edit
              </button>
              <button className="button-red" onClick={() => handleDeletePayment(payment.PAYMENTID)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-button button-green" onClick={handleAddClick} disabled={isAddingPayment}>
        Add Payment
      </button>
      {showEditForm && (
        <EditForm payment={selectedPayment} onUpdate={(updatedPayment) => handleUpdatePayment(selectedPayment.PAYMENTID, updatedPayment)} onClose={handleCloseEditForm} />
      )}
      {showAddForm && <AddForm onAdd={handleAddPayment} onClose={handleCloseAddForm} />}
    </div>
  );
};

export default PaymentsForm;
