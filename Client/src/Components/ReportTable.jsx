import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Typography,
  Grid,
} from '@mui/material';
import './css/reports.css';
import pabamaLogo from '../img/pabama-logo.png';

const ReportTable = ({ reports }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleDetailsClick = (report) => {
    setSelectedReport(report);
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    setOpenDetails(false);
    setSelectedReport(null);
  };

  const handlePrint = () => {
    window.print();
  };

  const columns = [
    { field: 'busNumber', headerName: 'Bus Number', flex: 1 },
    { field: 'driver', headerName: 'Driver', flex: 1 },
    { field: 'conductor', headerName: 'Conductor', flex: 1 },
    { field: 'from', headerName: 'From', flex: 1 },
    { field: 'to', headerName: 'To', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'middleName', headerName: 'Middle Name', flex: 1 },
    { field: 'cardID', headerName: 'Card ID', flex: 1 },
    { field: 'balance', headerName: 'Balance', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleDetailsClick(params.row)}
        >
          Details
        </Button>
      ),
    },
  ];

  const rows = reports.map((report) => ({
    id: report._id,
    ...report,
  }));

  return (
    <div style={{ height: 500, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
      />

      {selectedReport && (
        <Dialog
          open={openDetails}
          onClose={handleCloseDetails}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Report Details</DialogTitle>
          <DialogContent>
            <div className="pdf-content">
              <div className="print-header">
                <img src={pabamaLogo} alt="Pabama Logo" className="logo" />
                <Typography variant="h5" align="center">
                  PABAMA Dashboard Report
                </Typography>
                <Typography variant="h6" align="center">
                  Detailed Travel Report
                </Typography>
              </div>

              <Grid container spacing={2} className="report-details">
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    <strong>Bus Number:</strong> {selectedReport.busNumber}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    <strong>Driver:</strong> {selectedReport.driver}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    <strong>Conductor:</strong> {selectedReport.conductor}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    <strong>From:</strong> {selectedReport.from}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    <strong>To:</strong> {selectedReport.to}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    <strong>First Name:</strong> {selectedReport.firstName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    <strong>Last Name:</strong> {selectedReport.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    <strong>Middle Name:</strong> {selectedReport.middleName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    <strong>Card ID:</strong> {selectedReport.cardID}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle1">
                    <strong>Balance:</strong> {selectedReport.balance}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handlePrint} color="primary">
              Print
            </Button>
            <Button onClick={handleCloseDetails} color="secondary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default ReportTable;
