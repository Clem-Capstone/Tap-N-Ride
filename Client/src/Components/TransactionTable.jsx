import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import './css/transactions.css';

const TransactionTable = ({ transactions, setTransactions }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState({ userID: '', cardID: '', balance: '', paymentAmount: '' });

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

  const handleSave = async () => {
    try {
      const response = await axios.put(`/api/transactions/${selectedTransaction._id}`, editedTransaction);
      setTransactions(transactions.map(txn => txn._id === response.data._id ? response.data : txn));
      handleCloseEdit();
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/transactions/${selectedTransaction._id}`);
      setTransactions(transactions.filter(txn => txn._id !== selectedTransaction._id));
      handleCloseDelete();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    { field: 'userID', headerName: 'User ID', flex: 1 },
    { field: 'cardID', headerName: 'Card ID', flex: 1 },
    { field: 'balance', headerName: 'Balance', flex: 1 },
    { field: 'paymentAmount', headerName: 'Payment Amount', flex: 1 },
    { 
      field: 'createdAt', 
      headerName: 'Date/Time', 
      flex: 1, 
      valueFormatter: (params) => {
        if (!params.value) return 'Invalid Date';
        try {
          return format(parseISO(params.value), 'MM/dd/yyyy, p');
        } catch (error) {
          return 'Invalid Date';
        }
      }
    },
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

  const rows = transactions.map((transaction) => ({
    id: transaction._id,
    ...transaction,
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
            label="User ID"
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
            name="paymentAmount"
            label="Payment Amount"
            type="number"
            fullWidth
            value={editedTransaction.paymentAmount}
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
