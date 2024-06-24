import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageTitle from './PageTitle';
import './css/main.css';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authentication token not found, please log in.');
        return;
      }
      try {
        const response = await axios.get('/api/admin/admins', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setAdmins(response.data);
      } catch (error) {
        console.error('Failed to fetch admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  const handleEdit = (id) => {
    console.log('Edit admin with id:', id);
    // Add edit functionality here
  };

  const handleDelete = (id) => {
    console.log('Delete admin with id:', id);
    // Add delete functionality here
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'role', headerName: 'Role', flex: 1 },
    { field: 'status', headerName: 'Status', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => handleEdit(params.id)}
            style={{ marginRight: '10px' }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="secondary"
            onClick={() => handleDelete(params.id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div id="main" className="main">
      <PageTitle page="Admins" />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={admins.map(admin => ({ ...admin, id: admin._id }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
    </div>
  );
};

export default AdminManagement;
