import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import ActionButtons from './ActionButtons';

interface User {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  cardID: string;
  balance: number;
}

const UsersTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState<User>({ _id: '', lastName: '', firstName: '', middleName: '', cardID: '', balance: 0 });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>('/api/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (open) {
      const intervalId = setInterval(async () => {
        try {
          const response = await axios.get<{ cardID: string }>('/api/detectCard');
          if (response.data.cardID) {
            setNewUser((prev) => ({ ...prev, cardID: response.data.cardID }));
            clearInterval(intervalId);
          }
        } catch (error) {
          console.error('Error detecting card:', error);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post<User>('/api/users', newUser);
      setUsers([...users, response.data]);
      handleClose();
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleEdit = (user: User) => {
    // Implement edit functionality
    console.log('Edit user:', user);
  };

  const handleDelete = async (id: string) => {
    // Implement delete functionality
    console.log('Delete user:', id);
  };

  const columns: GridColDef[] = [
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
        <ActionButtons
          onEdit={() => handleEdit(params.row as User)}
          onDelete={ () => handleDelete(params.row._id)}
        />
      )
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        className="mb-4"
      >
        New Cardholder
      </Button>
      <div style={{ height: 400, width: '100%' }}>
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
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="firstName"
            label="First Name"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="middleName"
            label="Middle Name"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="cardID"
            label="Card ID"
            fullWidth
            variant="outlined"
            value={newUser.cardID}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="balance"
            label="Balance"
            type="number"
            fullWidth
            variant="outlined"
            value={newUser.balance}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersTable;