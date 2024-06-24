import React, { useState } from 'react';
import './css/transactions.css';

const TransactionsTable = ({ transactions }) => {
  const [sortConfig, setSortConfig] = useState(null);

  const sortedTransactions = [...transactions].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="table-container">
      <table className="transactions-table">
        <thead>
          <tr>
            <th onClick={() => requestSort('id')}>ID</th>
            <th onClick={() => requestSort('date')}>Date</th>
            <th onClick={() => requestSort('user')}>User</th>
            <th onClick={() => requestSort('amount')}>Amount</th>
            <th onClick={() => requestSort('type')}>Type</th>
            <th onClick={() => requestSort('status')}>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.date}</td>
              <td>{transaction.user}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.type}</td>
              <td>{transaction.status}</td>
              <td>
              <button type="button" class="btn btn-success">Edit</button>
              <button type="button" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
