import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Search } from 'lucide-react';
import ActionButtons from './ActionButtons';

interface Route {
  _id: string;
  area: string;
  km: number;
}

const RoutesTable: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentRoute, setCurrentRoute] = useState<Route>({ _id: '', area: '', km: 0 });

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get<Route[]>('/api/routes');
        setRoutes(response.data);
        setFilteredRoutes(response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRoutes(
      routes.filter((route) =>
        route.area.toLowerCase().includes(query)
      )
    );
  };

  const handleOpen = (route: Route = { _id: '', area: '', km: 0 }) => {
    setCurrentRoute(route);
    setIsEditing(!!route._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRoute({ _id: '', area: '', km: 0 });
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentRoute({ ...currentRoute, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        const response = await axios.put<Route>(`/api/routes/${currentRoute._id}`, currentRoute);
        setRoutes(routes.map(route => route._id === response.data._id ? response.data : route));
        setFilteredRoutes(routes.map(route => route._id === response.data._id ? response.data : route));
      } else {
        const response = await axios.post<Route>('/api/routes', currentRoute);
        setRoutes([...routes, response.data]);
        setFilteredRoutes([...routes, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving route:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/routes/${id}`);
      setRoutes(routes.filter(route => route._id !== id));
      setFilteredRoutes(routes.filter(route => route._id !== id));
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    { field: 'area', headerName: 'Area', flex: 1 },
    { field: 'km', headerName: 'Kilometers', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <ActionButtons
          onEdit={() => handleOpen(params.row as Route)}
          onDelete={() => handleDelete(params.row._id)}
        />
      )
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpen()}
          className="bg-blue-500 hover:bg-blue-600"
        >
          New Area
        </Button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search routes"
            value={searchQuery}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={filteredRoutes}
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          autoHeight
        />
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? 'Edit Route' : 'Add New Route'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="area"
            label="Area"
            fullWidth
            variant="outlined"
            value={currentRoute.area}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="km"
            label="Kilometers"
            type="number"
            fullWidth
            variant="outlined"
            value={currentRoute.km}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{isEditing ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoutesTable;