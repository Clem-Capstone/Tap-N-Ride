import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from 'lucide-react';
import EditAdminModal from './EditAdminModal';

interface Admin {
  _id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  status: string;
}

const AdminManagement: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Authentication token not found, please log in.');
        return;
      }
      try {
        const response = await axios.get<Admin[]>('/api/admin/admins', {
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

  const handleEdit = (id: string) => {
    const admin = admins.find(admin => admin._id === id);
    if (admin) setEditingAdmin(admin);
  };

  const handleDelete = async (id: string) => {
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

  const handleSave = async (updatedAdmin: Admin) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.put<Admin>(`/api/admin/admins/${updatedAdmin._id}`, updatedAdmin, {
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

  const columns: GridColDef[] = [
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
            onClick={() => handleEdit(params.id as string)}
            className="text-blue-600 hover:text-blue-800"
          >
            <EditIcon className="h-5 w-5" />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(params.id as string)}
            className="text-red-600 hover:text-red-800"
          >
            <DeleteIcon className="h-5 w-5" />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
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