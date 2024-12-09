import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Search, X } from 'lucide-react';
import Header from './Header';
import SideBar from './SideBar';
import debounce from 'lodash/debounce';

interface Fare {
  id: string;
  from: string;
  to: string;
  fare: number;
}

const FareMatrix: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [fares, setFares] = useState<Fare[]>([]);
  const [search, setSearch] = useState<string>('');
  const [filteredFares, setFilteredFares] = useState<Fare[]>([]);
  const [open, setOpen] = useState(false); // Dialog state
  const [currentFare, setCurrentFare] = useState<Fare>({ id: '', from: '', to: '', fare: 0 }); // Form data

  useEffect(() => {
    fetchFares();
  }, []);

  const fetchFares = async () => {
    try {
      const response = await axios.get<Fare[]>('/api/fares');
      const formattedFares = response.data.map((fare) => ({
        ...fare,
        id: fare._id, // Map `_id` to `id`
      }));
      setFares(formattedFares);
      setFilteredFares(formattedFares);
    } catch (error) {
      console.error('Error fetching fares:', error);
    }
  };

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      const lowercasedSearch = searchTerm.toLowerCase();
      const filtered = fares.filter(
        (fare) =>
          fare.from.toLowerCase().includes(lowercasedSearch) ||
          fare.to.toLowerCase().includes(lowercasedSearch) ||
          fare.fare.toString().includes(lowercasedSearch)
      );
      setFilteredFares(filtered);
    }, 300),
    [fares]
  );

  useEffect(() => {
    debouncedSearch(search);
  }, [search, debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearch('');
    setFilteredFares(fares);
  };

  const handleOpen = () => {
    setCurrentFare({ id: '', from: '', to: '', fare: 0 }); // Reset form
    setOpen(true); // Open dialog
  };

  const handleClose = () => {
    setOpen(false); // Close dialog
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentFare({ ...currentFare, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (currentFare.from && currentFare.to && currentFare.fare > 0) {
        await axios.post('/api/fares', currentFare); // Add new fare
        fetchFares(); // Refresh data
        handleClose(); // Close dialog
      } else {
        alert('Please fill in all fields with valid values.');
      }
    } catch (error) {
      console.error('Error adding new fare:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'from', headerName: 'From', flex: 1, sortable: true },
    { field: 'to', headerName: 'To', flex: 1, sortable: true },
    {
      field: 'fare',
      headerName: 'Fare',
      flex: 1,
      sortable: true,
      renderCell: (params) => <span>₱{params.value}</span>,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar isOpen={sidebarOpen} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">Fare Matrix</h1>
            <div className="bg-white shadow-md rounded-lg p-6">
              {/* Search and Add New Fare */}
              <div className="flex justify-between items-center mb-4">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOpen}
                  className="bg-blue-500 hover:bg-blue-600 uppercase"
                >
                  New Fare
                </Button>
                <div className="relative flex items-center">
                  <Search className="absolute left-3 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search routes..."
                    value={search}
                    onChange={handleSearchChange}
                    className="w-[300px] pl-10 pr-10 py-2 rounded-lg bg-gray-50 border-none focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                  {search && (
                    <button
                      onClick={handleClearSearch}
                      className="absolute right-3 text-gray-400 hover:text-gray-600"
                    >
                      <X />
                    </button>
                  )}
                </div>
              </div>
              {/* Data Grid */}
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={filteredFares}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  autoHeight
                />
              </div>
              {/* Add Fare Dialog */}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Fare</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    name="from"
                    label="From"
                    fullWidth
                    variant="outlined"
                    value={currentFare.from}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="to"
                    label="To"
                    fullWidth
                    variant="outlined"
                    value={currentFare.to}
                    onChange={handleChange}
                  />
                  <TextField
                    margin="dense"
                    name="fare"
                    label="Fare"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={currentFare.fare}
                    onChange={handleChange}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} color="primary">
                    Add
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FareMatrix;
