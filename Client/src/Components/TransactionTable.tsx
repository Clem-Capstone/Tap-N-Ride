import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

interface Transaction {
  _id: string;
  userID: string;
  cardID: string;
  balance: number;
  paymentAmount: number;
  createdAt: string;
}

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [editedTransaction, setEditedTransaction] = useState<Partial<Transaction>>({
    userID: '',
    cardID: '',
    balance: 0,
    paymentAmount: 0,
  });

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get<Transaction[]>('/api/transactions');
        const data = response.data;
        const transactionsArray = Array.isArray(data) ? data : data.data || [];
        setTransactions(transactionsArray);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, []);

  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setEditedTransaction({ ...transaction });
    setOpenEdit(true);
  };

  const handleDeleteClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenDelete(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedTransaction(null);
    setEditedTransaction({ userID: '', cardID: '', balance: 0, paymentAmount: 0 });
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedTransaction(null);
  };

  const handleSave = async () => {
    if (!selectedTransaction) return;
    try {
      const response = await axios.put<Transaction>(`/api/transactions/${selectedTransaction._id}`, editedTransaction);
      setTransactions(transactions.map(txn => txn._id === response.data._id ? response.data : txn));
      handleCloseEdit();
    } catch (error) {
      console.error('Failed to save transaction:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedTransaction) return;
    try {
      await axios.delete(`/api/transactions/${selectedTransaction._id}`);
      setTransactions(transactions.filter(txn => txn._id !== selectedTransaction._id));
      handleCloseDelete();
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    { field: 'userID', headerName: 'User ID', flex: 1 },
    { field: 'cardID', headerName: 'Card ID', flex: 1 },
    { field: 'balance', headerName: 'Balance', flex: 1 },
    { field: 'paymentAmount', headerName: 'Payment Amount', flex: 1 },
    {
      field: 'createdAt',
      headerName: 'Date/Time',
      flex: 1,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleString();
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <Button variant="contained" color="error" size="small" onClick={() => handleDeleteClick(params.row as Transaction)}>Delete</Button>
        </div>
      )
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <DataGrid
        rows={transactions}
        getRowId={(row) => row._id}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
        className="mt-4"
      />
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Transaction</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this transaction? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TransactionTable;