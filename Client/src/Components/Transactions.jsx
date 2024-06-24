import React from 'react';
import TransactionsTable from './TransactionTable';
import './css/transactions.css';

const Transactions = () => {
  const sampleTransactions = [
    { id: 1, date: '2024-06-20', user: 'John Doe', amount: 50, type: 'Credit', status: 'Completed', description: 'NFC Card Top-up' },
    { id: 2, date: '2024-06-21', user: 'Jane Smith', amount: 20, type: 'Debit', status: 'Completed', description: 'Purchase' },
  ];

  return (
    <div className="main-content">
      <h1>Transactions</h1>
      <TransactionsTable transactions={sampleTransactions} />
    </div>
  );
};

export default Transactions;
