import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { Edit, Trash } from 'lucide-react';
import Header from './Header';
import SideBar from './SideBar';
import FareMatrixForm from './FareMatrixForm';
import EditFareForm from './EditFareForm';

interface Fare {
  id: string;
  route: string;
  accommodation: string;
  fullMin: number;
  fullPerKM: number;
  spMin: number;
  spPerKM: number;
  promoPerKM: number;
}

const FareMatrix: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [fares, setFares] = useState<Fare[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editFormOpen, setEditFormOpen] = useState(false);
  const [currentFare, setCurrentFare] = useState<Fare | null>(null);

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
    } catch (error) {
      console.error('Error fetching fares:', error);
    }
  };

  const handleEdit = (fare: Fare) => {
    setCurrentFare(fare);
    setEditFormOpen(true);
  };

  const handleDelete = async (fareId: string) => {
    if (window.confirm('Are you sure you want to delete this fare?')) {
      try {
        await axios.delete(`/api/fares/${fareId}`);
        fetchFares();
      } catch (error) {
        console.error('Error deleting fare:', error);
      }
    }
  };

  const handleFormSubmit = async (fareData: Fare) => {
    try {
      await axios.post('/api/fares', fareData);
      fetchFares();
      setFormOpen(false);
    } catch (error) {
      console.error('Error saving fare:', error);
    }
  };

  const handleEditFormSubmit = async (fareData: Fare) => {
    try {
      await axios.put(`/api/fares/${fareData.id}`, fareData);
      fetchFares();
      setEditFormOpen(false);
    } catch (error) {
      console.error('Error updating fare:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'route', headerName: 'Route', flex: 1, sortable: true },
    { field: 'accommodation', headerName: 'Accommodation', flex: 1 },
    { field: 'fullMin', headerName: 'FULL Min', flex: 1 },
    { field: 'fullPerKM', headerName: 'FULL per KM', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <IconButton color="primary" onClick={() => handleEdit(params.row as Fare)}>
            <Edit />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleDelete(params.row.id)}>
            <Trash />
          </IconButton>
        </div>
      ),
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => setFormOpen(true)}
                className="mb-4"
              >
                Add New Fare
              </Button>
              <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                  rows={fares}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  autoHeight
                />
              </div>
              <FareMatrixForm
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={{}} // Blank for new fare
              />
              <EditFareForm
                open={editFormOpen}
                onClose={() => setEditFormOpen(false)}
                onSubmit={handleEditFormSubmit}
                initialData={currentFare || {}} // Pre-fill data for editing
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FareMatrix;
