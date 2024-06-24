import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import AdminTable from './AdminTable';
import AdminDialog from './AdminDialog';
import AdminToolbar from './AdminToolbar';
import { Toast } from 'primereact/toast';
import Header from './Header';
import SideBar from './SideBar';

const AdminManagement = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editAdmin, setEditAdmin] = useState(null);
  const [adminForm, setAdminForm] = useState({ name: '', email: '', password: '' });
  const toast = useRef(null);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('/api/admins');
        if (Array.isArray(response.data)) {
          setAdmins(response.data);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        setError('Error fetching admins');
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleOpen = (admin = null) => {
    setEditAdmin(admin);
    setAdminForm(admin ? { name: admin.name, email: admin.email, password: '' } : { name: '', email: '', password: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setAdminForm({ ...adminForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (editAdmin) {
        await axios.put(`/api/admins/${editAdmin._id}`, adminForm);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Admin updated', life: 3000 });
      } else {
        await axios.post('/api/admins', adminForm);
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Admin added', life: 3000 });
      }
      setOpen(false);
      const response = await axios.get('/api/admins');
      setAdmins(response.data);
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error saving admin', life: 3000 });
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admins/${id}`);
      const response = await axios.get('/api/admins');
      setAdmins(response.data);
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Admin deleted', life: 3000 });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error deleting admin', life: 3000 });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header />
      <SideBar />  
      <Toast ref={toast} />
      <AdminToolbar onAdd={() => handleOpen()} />
      <AdminTable admins={admins} onEdit={handleOpen} onDelete={handleDelete} />
      <AdminDialog visible={open} adminForm={adminForm} onChange={handleChange} onClose={handleClose} onSubmit={handleSubmit} />
    </div>
  );
};

export default AdminManagement;
