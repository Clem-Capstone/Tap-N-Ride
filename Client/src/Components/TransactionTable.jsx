import React from 'react';
import './css/transactions.css';

const TransactionsTable = ({ transactions }) => {
  return (
    <div className="table-container">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>ID</th>
            <th className='thspaces'></th>
            <th>Date</th>
            <th className='thspaces'></th>
            <th>User</th>
            <th className='thspaces'></th>
            <th>Amount</th>
            <th className='thspaces'></th>
            <th>Type</th>
            <th className='thspaces'></th>
            <th>Status</th>
            <th className='thspaces'></th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td className='spaces'></td>
              <td>{transaction.date}</td>
              <td className='spaces'></td>
              <td>{transaction.user}</td>
              <td className='spaces'></td>
              <td>{transaction.amount}</td>
              <td className='spaces'></td>
              <td>{transaction.type}</td>
              <td className='spaces'></td>
              <td>{transaction.status}</td>
              <td className='spaces' ></td>
              <td>
                <button className="details-button">Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsTable;
