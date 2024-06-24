// TransactionsTable.jsx
import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toolbar } from 'primereact/toolbar';
import { Calendar } from 'primereact/calendar';

const TransactionsTable = ({ transactions }) => {
  const [globalFilter, setGlobalFilter] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const openDetails = (transaction) => {
    setSelectedTransaction(transaction);
    setVisible(true);
  };

  const transactionDetailsDialog = (
    <Dialog header="Transaction Details" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
      {selectedTransaction && (
        <div>
          <p><strong>ID:</strong> {selectedTransaction.id}</p>
          <p><strong>Date:</strong> {selectedTransaction.date}</p>
          <p><strong>User:</strong> {selectedTransaction.user}</p>
          <p><strong>Amount:</strong> {selectedTransaction.amount}</p>
          <p><strong>Type:</strong> {selectedTransaction.type}</p>
          <p><strong>Status:</strong> {selectedTransaction.status}</p>
          <p><strong>Description:</strong> {selectedTransaction.description}</p>
        </div>
      )}
    </Dialog>
  );

  return (
    <div>
      <Toolbar className="mb-4" left={() => (
        <React.Fragment>
          <div className="p-inputgroup">
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
          </div>
        </React.Fragment>
      )} />
      <DataTable value={filteredTransactions} paginator rows={10} rowsPerPageOptions={[5, 10, 25]} globalFilter={globalFilter} header="Transactions">
        <Column field="id" header="ID" sortable></Column>
        <Column field="date" header="Date" sortable></Column>
        <Column field="user" header="User" sortable></Column>
        <Column field="amount" header="Amount" sortable></Column>
        <Column field="type" header="Type" sortable></Column>
        <Column field="status" header="Status" sortable></Column>
        <Column header="Actions" body={(rowData) => (
          <Button icon="pi pi-search" className="p-button-rounded p-button-info" onClick={() => openDetails(rowData)} />
        )}></Column>
      </DataTable>
      {transactionDetailsDialog}
    </div>
  );
};

export default TransactionsTable;
