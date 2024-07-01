import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './css/history.css';

const HistoryTable = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const sampleHistory = [
        { id: 1, date: '2024-06-22T12:34:56Z', action: 'Deleted', entity: 'User', details: 'User John Doe was deleted' },
        { id: 2, date: '2024-06-23T08:14:22Z', action: 'Edited', entity: 'Transaction', details: 'Transaction ID 1234 was edited' },
        { id: 3, date: '2024-06-24T09:45:00Z', action: 'Added', entity: 'Admin', details: 'Admin Jane Smith was added' },
      ];
      setHistory(sampleHistory);
    };

    fetchHistory();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.3 },
    { field: 'date', headerName: 'Date/Time', flex: 1 },
    { field: 'action', headerName: 'Action', flex: 0.5 },
    { field: 'entity', headerName: 'Entity', flex: 0.5 },
    { field: 'details', headerName: 'Details', flex: 2 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={history.map((entry, index) => ({ ...entry, id: index + 1 }))}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default HistoryTable;
