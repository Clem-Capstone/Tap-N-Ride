import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { format } from 'date-fns';
import './css/transactions.css';

const TransactionTable = ({ transactions }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({ userID: '', cardID: '', balance: '', amount: '', type: '', status: '', description: '' });

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setEditedTransaction(transaction);
    setOpenEdit(true);
  };

  const handleDeleteClick = (transaction) => {
    setSelectedTransaction(transaction);
    setOpenDelete(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedTransaction(null);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedTransaction(null);
  };

  const handleSave = () => {
    // Here you would make a request to save the updated transaction to your server
    console.log('Saving transaction:', editedTransaction);
    handleCloseEdit();
  };

  const handleDelete = () => {
    // Here you would make a request to delete the transaction from your server
    console.log('Deleting transaction:', selectedTransaction);
    handleCloseDelete();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    { field: 'date', headerName: 'Date/Time', flex: 1 },
    { field: 'userID', headerName: 'User', flex: 1 },
    { field: 'cardID', headerName: 'Card ID', flex: 1 },
    { field: 'balance', headerName: 'Balance', flex: 1 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 0.5 },
    { field: 'status', headerName: 'Status', flex: 0.5 },
    { field: 'description', headerName: 'Description', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div className="actions-cell">
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleEditClick(params.row)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteClick(params.row)}
          >
            Delete
          </Button>
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
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Transaction</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="userID"
            label="User"
            type="text"
            fullWidth
            value={editedTransaction.userID}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="cardID"
            label="Card ID"
            type="text"
            fullWidth
            value={editedTransaction.cardID}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="balance"
            label="Balance"
            type="number"
            fullWidth
            value={editedTransaction.balance}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="amount"
            label="Amount"
            type="number"
            fullWidth
            value={editedTransaction.amount}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="type"
            label="Type"
            type="text"
            fullWidth
            value={editedTransaction.type}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="status"
            label="Status"
            type="text"
            fullWidth
            value={editedTransaction.status}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={editedTransaction.description}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Transaction</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this transaction? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransactionTable;
