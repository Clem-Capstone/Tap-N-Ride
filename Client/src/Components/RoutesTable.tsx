import React, { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

interface Route {
  _id: string; // Use _id from MongoDB
  abbreviation: string;
  name: string;
  branchStation: string;
  dateTimeAdded: string;
  isOpen: boolean;
}

interface RoutesTableProps {
  routes: Route[];
  fetchRoutes: () => void;
}

const RoutesTable: React.FC<RoutesTableProps> = ({ routes, fetchRoutes }) => {
  const [formOpen, setFormOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<Partial<Route>>({
    abbreviation: '',
    name: '',
    branchStation: '',
  });

  const handleOpen = (route?: Route) => {
    setCurrentRoute(route || { abbreviation: '', name: '', branchStation: '' });
    setFormOpen(true);
  };

  const handleClose = () => {
    setFormOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRoute({ ...currentRoute, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (currentRoute._id) {
        // Update existing route using _id
        await axios.put(`/api/routes/${currentRoute._id}`, currentRoute);
      } else {
        // Add new route
        await axios.post('/api/routes', currentRoute);
      }
      fetchRoutes();
      handleClose();
    } catch (error) {
      console.error('Error saving route:', error);
    }
  };

  const handleDelete = async (_id: string) => {
    if (!window.confirm('Are you sure you want to delete this route?')) {
      return;
    }

    try {
      await axios.delete(`/api/routes/${_id}`); // Use _id for delete
      fetchRoutes();
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  const toggleRouteState = async (_id: string) => {
    try {
      await axios.patch(`/api/routes/${_id}/toggle`); // Use _id for toggle
      fetchRoutes();
    } catch (error) {
      console.error('Error toggling route state:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'index', headerName: 'ID', flex: 1 }, // Custom index for display
    { field: 'abbreviation', headerName: 'Abbreviation', flex: 1 },
    { field: 'name', headerName: 'Bus Route', flex: 2 },
    { field: 'branchStation', headerName: 'Branch Station', flex: 1 },
    { field: 'dateTimeAdded', headerName: 'Date Time Added', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-2">
          {/* Edit Button */}
          <IconButton color="primary" onClick={() => handleOpen(params.row as Route)}>
            <Edit />
          </IconButton>
          {/* Delete Button */}
          <IconButton color="error" onClick={() => handleDelete(params.row._id)}>
            <Delete />
          </IconButton>
          {/* Open/Close Button */}
          <Button
            variant="contained"
            color={params.row.isOpen ? 'success' : 'error'}
            size="small"
            onClick={() => toggleRouteState(params.row._id)}
          >
            {params.row.isOpen ? 'Open' : 'Close'}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
        >
          Add New Route
        </Button>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={routes.map((route, index) => ({ ...route, index: index + 1 }))}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          getRowId={(row) => row._id} // Use _id as the unique identifier for rows
        />
      </div>
      {/* Add/Edit Modal */}
      <Dialog open={formOpen} onClose={handleClose} fullWidth>
        <DialogTitle>
          {currentRoute._id ? 'Edit Route' : 'Add New Route'}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="abbreviation"
            label="Abbreviation"
            fullWidth
            margin="dense"
            value={currentRoute.abbreviation || ''}
            onChange={handleChange}
          />
          <TextField
            name="name"
            label="Bus Route"
            fullWidth
            margin="dense"
            value={currentRoute.name || ''}
            onChange={handleChange}
          />
          <TextField
            name="branchStation"
            label="Branch Station"
            fullWidth
            margin="dense"
            value={currentRoute.branchStation || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoutesTable;
