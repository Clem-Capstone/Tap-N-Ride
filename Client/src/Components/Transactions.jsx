import React from 'react';
import TransactionsTable from './TransactionTable';
import './css/transactions.css';

const Transactions = () => {
  const sampleTransactions = [
    { _id: 1, userID: '1234', cardID: '5678', balance: 50, amount: 100, type: 'Credit', status: 'Completed', description: 'NFC Card Top-up', createdAt: '2024-06-20T20:34:56' },
    { _id: 2, userID: '5678', cardID: '1234', balance: 20, amount: 50, type: 'Debit', status: 'Completed', description: 'Purchase', createdAt: '2024-06-21T15:24:56' },
  ];

  return (
    <div className="main-content">
      <h1>Transactions</h1>
      <TransactionsTable transactions={sampleTransactions} />
    </div>
  );
};

export default Transactions;
