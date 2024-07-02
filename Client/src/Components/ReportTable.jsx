import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import './css/reports.css';

const ReportTable = ({ reports }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [editedReport, setEditedReport] = useState({ busNumber: '', driver: '', conductor: '', passengerFrom: '', from: '', to: '' });

  const handleEditClick = (report) => {
    setSelectedReport(report);
    setEditedReport(report);
    setOpenEdit(true);
  };

  const handleDeleteClick = (report) => {
    setSelectedReport(report);
    setOpenDelete(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedReport(null);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
    setSelectedReport(null);
  };

  const handleSave = () => {
    console.log('Saving report:', editedReport);
    handleCloseEdit();
  };

  const handleDelete = () => {
    console.log('Deleting report:', selectedReport);
    handleCloseDelete();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedReport((prev) => ({ ...prev, [name]: value }));
  };

  const columns = [
    { field: 'busNumber', headerName: 'Bus Number', flex: 1 },
    { field: 'driver', headerName: 'Driver', flex: 1 },
    { field: 'conductor', headerName: 'Conductor', flex: 1 },
    { field: 'passengerFrom', headerName: 'Passenger ', flex: 1 },
    { field: 'from', headerName: 'From', flex: 1 },
    { field: 'to', headerName: 'To', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div className="actions-cell">
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => handleEditClick(params.row)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => handleDeleteClick(params.row)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const rows = reports.map((report) => ({
    id: report._id,
    ...report,
  }));

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
      />
      <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle>Edit Report</DialogTitle>
        <DialogContent>
          <TextField margin="dense" name="busNumber" label="Bus Number" type="text" fullWidth value={editedReport.busNumber} onChange={handleChange} />
          <TextField margin="dense" name="driver" label="Driver" type="text" fullWidth value={editedReport.driver} onChange={handleChange} />
          <TextField margin="dense" name="conductor" label="Conductor" type="text" fullWidth value={editedReport.conductor} onChange={handleChange} />
          <TextField margin="dense" name="passenger" label="Passenger" type="text" fullWidth value={editedReport.passengerFrom} onChange={handleChange} />
          <TextField margin="dense" name="from" label="From" type="text" fullWidth value={editedReport.from} onChange={handleChange} />
          <TextField margin="dense" name="to" label="To" type="text" fullWidth value={editedReport.to} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDelete} onClose={handleCloseDelete}>
        <DialogTitle>Delete Report</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this report? This action cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReportTable;
