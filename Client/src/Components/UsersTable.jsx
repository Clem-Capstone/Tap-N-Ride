import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import ReportTable from './ReportTable';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import './css/users.css';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({ lastName: '', firstName: '', middleName: '', cardID: '', balance: 0 });

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (open) {
      // Simulate NFC reader listening for card taps
      const intervalId = setInterval(async () => {
        const response = await axios.get('/api/detectCard'); // Endpoint that detects NFC card tap
        if (response.data.cardID) {
          setNewUser((prev) => ({ ...prev, cardID: response.data.cardID }));
          clearInterval(intervalId);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/users', newUser);
      setUsers([...users, response.data]);
      handleClose();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'middleName', headerName: 'Middle Name', flex: 1 },
    { field: 'cardID', headerName: 'Card ID', flex: 1 },
    { field: 'balance', headerName: 'Balance', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div className="actions-cell">
          <Button variant="contained" color="success" size="small" style={{ marginRight: 8 }}>Edit</Button>
          <Button variant="contained" color="error" size="small">Delete</Button>
        </div>
      )
    },
  ];

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        New Cardholder
      </Button>
      <div style={{ height: 400, width: '100%', marginTop: 20 }}>
        <DataGrid
          rows={users}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          autoHeight
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Cardholder</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="lastName"
            label="Last Name"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="firstName"
            label="First Name"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="middleName"
            label="Middle Name"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="cardID"
            label="Card ID"
            fullWidth
            variant="standard"
            value={newUser.cardID}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="balance"
            label="Balance"
            type="number"
            fullWidth
            variant="standard"
            value={newUser.balance}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UsersTable;
