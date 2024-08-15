import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './css/routes.css';

const RoutesTable = () => {
  const [routes, setRoutes] = useState([]);
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentRoute, setCurrentRoute] = useState({ area: '', km: '' });

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const response = await axios.get('/api/routes');
        console.log(response.data); // Check if data is correctly structured
        setRoutes(response.data);
        setFilteredRoutes(response.data);
      } catch (error) {
        console.error('Error fetching routes:', error);
      }
    };

    fetchRoutes();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredRoutes(
      routes.filter((route) =>
        route.area.toLowerCase().includes(query)
      )
    );
  };

  const handleOpen = (route = { area: '', km: '' }) => {
    setCurrentRoute(route);
    setIsEditing(!!route._id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentRoute({ area: '', km: '' });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setCurrentRoute({ ...currentRoute, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isEditing) {
        const response = await axios.put(`/api/routes/${currentRoute._id}`, currentRoute);
        setRoutes(routes.map(route => route._id === response.data._id ? response.data : route));
        setFilteredRoutes(routes.map(route => route._id === response.data._id ? response.data : route));
      } else {
        const response = await axios.post('/api/routes', currentRoute);
        setRoutes([...routes, response.data]);
        setFilteredRoutes([...routes, response.data]);
      }
      handleClose();
    } catch (error) {
      console.error('Error saving route:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/routes/${id}`);
      setRoutes(routes.filter(route => route._id !== id));
      setFilteredRoutes(routes.filter(route => route._id !== id));
    } catch (error) {
      console.error('Error deleting route:', error);
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', flex: 0.5 },
    { field: 'area', headerName: 'Area', flex: 1 },
    { field: 'km', headerName: 'Kilometers', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div className="actions-cell">
          <Button variant="contained" color="success" size="small" onClick={() => handleOpen(params.row)} style={{ marginRight: 8 }}>Edit</Button>
          <Button variant="contained" color="error" size="small" onClick={() => handleDelete(params.row._id)}>Delete</Button>
        </div>
      )
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          New Area
        </Button>
        <TextField
          variant="outlined"
          placeholder="Search routes"
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="table-container">
        <DataGrid
          rows={filteredRoutes}
          getRowId={(row) => row._id} // This line ensures the DataGrid knows how to get the unique ID for each row
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
            variant="standard"
            value={currentRoute.area}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="km"
            label="Kilometers"
            type="number"
            fullWidth
            variant="standard"
            value={currentRoute.km}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">{isEditing ? 'Save' : 'Add'}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RoutesTable;
