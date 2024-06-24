import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageTitle from './PageTitle';
import EditAdminModal from './EditAdminModal'; // Import the EditAdminModal component
import './css/main.css';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);

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
    const admin = admins.find(admin => admin._id === id);
    setEditingAdmin(admin);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/admin/admins/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAdmins(admins.filter(admin => admin._id !== id));
    } catch (error) {
      console.error('Failed to delete admin:', error);
    }
  };

  const handleSave = async (updatedAdmin) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put(`/api/admin/admins/${updatedAdmin._id}`, updatedAdmin, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setAdmins(admins.map(admin => admin._id === updatedAdmin._id ? response.data : admin));
      setEditingAdmin(null);
    } catch (error) {
      console.error('Failed to update admin:', error);
    }
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
      {editingAdmin && (
        <EditAdminModal
          admin={editingAdmin}
          onSave={handleSave}
          onCancel={() => setEditingAdmin(null)}
        />
      )}
    </div>
  );
};

export default AdminManagement;
