import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import './css/users.css';

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      // For demonstration purposes, here is some sample data.
      // Replace this with your actual API call.
      const sampleData = [
        { _id: 1, name: 'John Doe', cardID: '1234', balance: 50 },
        { _id: 2, name: 'Jane Smith', cardID: '5678', balance: 20 },
        { _id: 3, name: 'Alice Johnson', cardID: '9101', balance: 30 },
        { _id: 4, name: 'Bob Brown', cardID: '1121', balance: 40 },
      ];
      setUsers(sampleData);
    };

    fetchUsers();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'name', headerName: 'Name', flex: 1 },
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
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={users.map((user, index) => ({ ...user, id: index + 1 }))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default UsersTable;
