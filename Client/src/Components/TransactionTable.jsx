import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { format } from 'date-fns';
import './css/transactions.css';

const TransactionTable = ({ transactions }) => {
  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    { field: 'date', headerName: 'Date/Time', flex: 1 },
    { field: 'userID', headerName: 'User', flex: 1 },
    { field: 'cardID', headerName: 'Card ID', flex: 1 },
    { field: 'balance', headerName: 'Balance', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 0.5 },
    { field: 'type', headerName: 'Type', flex: 0.5 },
    { field: 'status', headerName: 'Status', flex: 0.5 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div className="actions-cell">
          <Button variant="contained" color="success" size="small" style={{ marginRight: 8 }}>Edit</Button>
          <Button variant="contained" color="error" size="small">Delete</Button>
        </div>
      ),
    },
  ];

  const rows = transactions.map((transaction, index) => ({
    id: index + 1,
    ...transaction,
    date: format(new Date(transaction.date), 'MM/dd/yyyy, p'),
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default TransactionTable;
