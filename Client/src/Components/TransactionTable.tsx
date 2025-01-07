import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Button, TextField } from "@mui/material";

interface Transaction {
  _id: string;
  cardID: string;
  balance: number;
  paymentAmount: number;
  createdAt: string;
}

const TransactionTable: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("/api/transactions");

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setTransactions([]);
      }
    };

    fetchTransactions();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await axios.delete(`/api/transactions/${id}`);
        setTransactions(transactions.filter((transaction) => transaction._id !== id));
      } catch (error) {
        console.error("Failed to delete transaction:", error);
      }
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredTransactions = transactions.filter((transaction) =>
    transaction.cardID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rowsWithIndex = filteredTransactions.map((transaction, index) => ({
    ...transaction,
    index: index + 1, // Add sequential index starting from 1
  }));

  const columns: GridColDef[] = [
    { field: "index", headerName: "ID", flex: 0.5, sortable: false },
    { field: "cardID", headerName: "Card ID", flex: 1 },
    { field: "balance", headerName: "Balance", flex: 1 },
    { field: "paymentAmount", headerName: "Payment Amount", flex: 1 },
    {
      field: "createdAt",
      headerName: "Date/Time",
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div className="p-6">
      {/* Search Input */}
      <div className="mb-4 flex justify-between items-center">
        <TextField
          label="Search by Card ID"
          variant="outlined"
          size="small"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      {/* Data Grid */}
      <DataGrid
        rows={rowsWithIndex} // Use rows with added index field
        getRowId={(row) => row._id} // Use `_id` as unique key
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

export default TransactionTable;
