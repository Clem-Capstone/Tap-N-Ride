<<<<<<< HEAD
// Transactions.jsx
import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Toolbar } from 'primereact/toolbar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

const sampleTransactions = [
  { id: 1, date: '2024-06-20', user: 'John Doe', amount: 50, type: 'Credit', status: 'Completed', description: 'NFC Card Top-up' },
  { id: 2, date: '2024-06-21', user: 'Jane Smith', amount: 20, type: 'Debit', status: 'Completed', description: 'Purchase' },
  // Add more sample transactions here
];

const Transactions = () => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [transactions, setTransactions] = useState(sampleTransactions);

  return (
    <div className="transactions-container">
      <Toolbar className="mb-4" left={() => (
        <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      )} />
      <DataTable value={transactions} paginator rows={10} rowsPerPageOptions={[5, 10, 25]} globalFilter={globalFilter} header="Transactions">
        <Column field="id" header="ID" sortable />
        <Column field="date" header="Date" sortable />
        <Column field="user" header="User" sortable />
        <Column field="amount" header="Amount" sortable />
        <Column field="type" header="Type" sortable />
        <Column field="status" header="Status" sortable />
      </DataTable>
=======
// Dashboard.jsx
import React from 'react';
import TransactionsTable from './TransactionTable';

const Transactions = () => {
  return (
    <div>
      <h1>Transactions</h1>
      <TransactionsTable />
>>>>>>> main
    </div>
  );
};

export default Transactions;
