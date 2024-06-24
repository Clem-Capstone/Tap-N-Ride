import React from 'react';
import { format } from 'date-fns';
import './css/transactions.css';

const TransactionsTable = ({ transactions }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return 'Invalid Date';
    }
    return format(date, 'EEEE, MMMM d, yyyy h:mm a');
  };

  return (
    <div className="table-container">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Card ID</th>
            <th>Balance</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Date/Time</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction._id}>
              <td>{transaction._id}</td>
              <td>{transaction.userID}</td>
              <td>{transaction.cardID}</td>
              <td>{transaction.balance}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.status}</td>
              <td>{formatDate(transaction.createdAt)}</td>
              <td>{transaction.description}</td>
              <td>
                <button type="button" className="btn btn-success">Edit</button>
                <button type="button" className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
