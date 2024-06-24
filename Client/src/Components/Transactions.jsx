import React from 'react';
import TransactionsTable from './TransactionTable';
import './css/transactions.css';

const Transactions = () => {
  const sampleTransactions = [
    { _id: 1, date: '2024-06-20T20:34:56Z', userID: 'John Doe', cardID: '1234', balance: 50, amount: 50, type: 'Credit', status: 'Completed', description: 'NFC Card Top-up' },
    { _id: 2, date: '2024-06-21T07:06:00Z', userID: 'Jane Smith', cardID: '5678', balance: 20, amount: 20, type: 'Debit', status: 'Completed', description: 'Purchase' },
  ];

  return (
    <div id="main" className="main">
      <h1>Transactions</h1>
      <TransactionsTable transactions={sampleTransactions} />
    </div>
  );
};

export default Transactions;
